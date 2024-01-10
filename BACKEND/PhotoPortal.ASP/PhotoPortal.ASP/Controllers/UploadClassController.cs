using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using PhotoPortal.ASP.Data;
using PhotoPortal.ASP.Models;
using System.Text.Json;

namespace PhotoPortal.ASP.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UploadClassController : Controller
    {
        private IUploadClassRepository repository;
        private readonly UserManager<Photographer> userManager;

        public UploadClassController(IUploadClassRepository repo, UserManager<Photographer> userManager)
        {
            this.repository = repo;
            this.userManager = userManager;
        }

        [HttpPost]
        [Authorize]
        public ActionResult<UploadClass> PostUploadClass(UploadClass @class)
        {
            Photographer? user = userManager.Users.FirstOrDefault(u => u.Id == userManager.GetUserId(User));

            if (user == null)
                return Unauthorized();

            this.repository.Insert(@class);
            return Content(JsonSerializer.Serialize(@class), "application/json");
        }
    }
}
