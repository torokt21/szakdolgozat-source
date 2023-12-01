using Microsoft.AspNetCore.Mvc;
using PhotoPortal.ASP.Models;
using System.Diagnostics;

namespace PhotoPortal.ASP.Controllers
{
    [Route("api/test")]
    [ApiController]
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IActionResult Index()
        {
            return new EmptyResult();
        }
    }
}