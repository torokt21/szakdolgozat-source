using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using PhotoPortal.ASP.Models;
using System.Diagnostics;
using System.Net;
using System.Web;
using System.Net.Http;
using PhotoPortal.ASP.Data.Dtos;
using PhotoPortal.ASP.Data;
using System.Net.Mime;

namespace PhotoPortal.ASP.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    
    public class PictureController : Controller
    {
        private readonly IPictureRepository pictureRepository;
        private readonly IChildRepository childRepository;
        private readonly IConfiguration _config;

        [ActivatorUtilitiesConstructor]
        public PictureController(IPictureRepository repo, IChildRepository childRepository, IConfiguration _config, UserManager<Photographer> userManager)
        {
            this.pictureRepository = repo;
            this.childRepository = childRepository;
            this._config = _config;
        }

        [HttpPost]
        [Authorize]
        [Consumes("multipart/form-data")]
        public ActionResult PostPicture([FromForm]FileUploadDto formData)
        {
            FtpWebRequest ftpRequest;
            FtpWebResponse ftpResponse;

            Child child = this.childRepository.GetById(formData.ChildId);

            if (child == null)
                return BadRequest("A gyermek nem létezik.");
            string directoryPath = String.Join("/", new string[] { child.Class.Institution.Photographer.Id, child.Class.Institution.Shortcode.ToString(), child.Class.DirectoryName, child.Passcode });
            MakeFTPDir("ftp://nandyred.synology.me:21/PhotoPortal", directoryPath, this._config["FTP:Username"], this._config["FTP:Password"]);

            try
            {
                foreach (var picture in formData.Pictures)
                {
                    Picture pic = new()
                    {
                        ChildId = formData.ChildId,
                        Filename = picture.FileName,
                    };
                    this.pictureRepository.Insert(pic);

                    string fullFileName = "ftp://nandyred.synology.me:21/PhotoPortal/" +
                        directoryPath.TrimEnd('/') + "/" +
                        pic.Id + MimeTypes.MimeTypeMap.GetExtension(picture.ContentType);
#pragma warning disable SYSLIB0014
                    ftpRequest = (FtpWebRequest)FtpWebRequest.Create(fullFileName);
#pragma warning restore SYSLIB0014

                    ftpRequest.Method = WebRequestMethods.Ftp.UploadFile;
                    ftpRequest.Proxy = null;
                    ftpRequest.KeepAlive = true;
                    ftpRequest.UseBinary = true;
                    ftpRequest.Credentials = new NetworkCredential(this._config["FTP:Username"], this._config["FTP:Password"]);

                    using (var stream = picture.OpenReadStream())
                    {
                        byte[] fileContents = new byte[picture.Length];
                        stream.Read(fileContents, 0, Convert.ToInt32(picture.Length));
                        using (Stream writer = ftpRequest.GetRequestStream())
                        {
                            writer.Write(fileContents, 0, fileContents.Length);
                        }
                        ftpResponse = (FtpWebResponse)ftpRequest.GetResponse();
                    }

                    pic.Filename = fullFileName;
                    this.pictureRepository.Update(pic);
                }
            }
            catch (WebException webex)
            {
                // TODO handle
                //this.Message = webex.ToString();
            }
            return new EmptyResult();
        }
        // Source: https://stackoverflow.com/a/23519737/2154120
        public static void MakeFTPDir(string ftpAddress, string pathToCreate, string login, string password)
        {
            FtpWebRequest reqFTP = null;
            Stream ftpStream = null;

            string[] subDirs = pathToCreate.Split('/');

            string currentDir = string.Format(ftpAddress, ftpAddress);

            foreach (string subDir in subDirs)
            {
                try
                {
                    currentDir = currentDir + "/" + subDir;
                    reqFTP = (FtpWebRequest)FtpWebRequest.Create(currentDir);
                    reqFTP.Method = WebRequestMethods.Ftp.MakeDirectory;
                    reqFTP.UseBinary = true;
                    reqFTP.Credentials = new NetworkCredential(login, password);
                    FtpWebResponse response = (FtpWebResponse)reqFTP.GetResponse();
                    ftpStream = response.GetResponseStream();
                    ftpStream.Close();
                    response.Close();
                }
                catch (Exception ex)
                {
                    //directory already exist I know that is weak but there is no way to check if a folder exist on ftp...
                }
            }
        }
    }
}
