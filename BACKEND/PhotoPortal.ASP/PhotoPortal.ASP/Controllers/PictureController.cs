using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using PhotoPortal.ASP.Models;
using System.Diagnostics;
using System.Net;
using System.Web;
using System.Net.Http;
using PhotoPortal.ASP.Data.Dtos;

namespace PhotoPortal.ASP.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    
    public class PictureController : Controller
    {
        [HttpPost]
        [Authorize]
        [Consumes("multipart/form-data")]
        public ActionResult PostPicture([FromForm]FileUploadDto formData)
        {

            return new EmptyResult();
        }
    }
}
