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
    public class ChildController : Controller
    {
        private IChildRepository repository;
        private IUploadClassRepository classRepository;
        private readonly UserManager<Photographer> userManager;

        [ActivatorUtilitiesConstructor]
        public ChildController(IChildRepository repo, IUploadClassRepository classRepository, UserManager<Photographer> userManager)
        {
            this.repository = repo;
            this.classRepository = classRepository;
            this.userManager = userManager;
        }

        [HttpPost]
        [Authorize]
        public ActionResult<Child> PostUploadClass(Child child)
        {
            Photographer? user = userManager.Users.FirstOrDefault(u => u.Id == userManager.GetUserId(User));

            if (user == null)
                return Unauthorized();

            UploadClass @class = this.classRepository.GetAll().Where(c => c.Id == child.UploadClassId).FirstOrDefault();

            if (@class == null)
                return BadRequest("Az osztály nem található");
            Institution institution = @class.Institution;

            // TODO make sure the code is unique
            child.Passcode = GeneratePasscode(institution);

            this.repository.Insert(child);
            return Content(JsonSerializer.Serialize(child), "application/json");
        }

        private static Random random = new Random();

        public static string GeneratePasscode(Institution institution)
        {
            const string chars = "ABCDEFGHIJKLMNPQRSTUVWXYZ123456789";
            var randomChars = new string(Enumerable.Repeat(chars, 8)
                .Select(s => s[random.Next(s.Length)]).ToArray());

            return institution.Shortcode + "-" + randomChars;
        }
    }
}
