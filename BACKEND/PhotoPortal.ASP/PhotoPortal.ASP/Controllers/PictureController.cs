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
        private readonly IFileStorage fileStorage;

        [ActivatorUtilitiesConstructor]
        public PictureController(IPictureRepository repo, IChildRepository childRepository, IFileStorage fileStorage, UserManager<Photographer> userManager)
        {
            this.pictureRepository = repo;
            this.childRepository = childRepository;
            this.fileStorage = fileStorage;
        }

        [HttpPost]
        [Authorize]
        [Consumes("multipart/form-data")]
        public ActionResult PostPicture([FromForm]FileUploadDto formData)
        {
            // TODO validate file types
            FtpWebRequest ftpRequest;
            FtpWebResponse ftpResponse;

            Child child = this.childRepository.GetById(formData.ChildId);

            if (child == null)
                return BadRequest("A gyermek nem létezik.");
            string directoryPath = String.Join("/", new string[] { child.Class.Institution.Photographer.Id, child.Class.Institution.Shortcode.ToString(), "highres", child.Class.DirectoryName, child.Passcode });
            this.fileStorage.CreateDirectory(directoryPath);

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

                    string fullFileName =
                        directoryPath.TrimEnd('/') + "/" +
                        pic.Id + MimeTypes.MimeTypeMap.GetExtension(picture.ContentType);

                    this.fileStorage.SaveFile(fullFileName, picture);
;
                    /*
                    using (var stream = picture.OpenReadStream())
                    {
                        byte[] fileContents = new byte[stream.Length];
                        stream.Read(fileContents, 0, Convert.ToInt32(picture.Length));
                        using (Stream writer = ftpRequest.GetRequestStream())
                        {
                            writer.Write(fileContents, 0, fileContents.Length);
                        }
                        ftpResponse = (FtpWebResponse)ftpRequest.GetResponse();
                    }
                    */
                    pic.Filename = fullFileName;
                    this.pictureRepository.Update(pic);
                }
            }
            catch (WebException webex)
            {
                // TODO handle
                return StatusCode(500);
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
