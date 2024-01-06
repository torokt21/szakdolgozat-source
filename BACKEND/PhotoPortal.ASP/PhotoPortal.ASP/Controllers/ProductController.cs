using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using PhotoPortal.ASP.Data;
using PhotoPortal.ASP.Models;

namespace PhotoPortal.ASP.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private IProductRepository productRepository;
        private readonly UserManager<Photographer> userManager;

        public ProductController(IProductRepository repo, UserManager<Photographer> userManager)
        {
            this.productRepository = repo;
            this.userManager = userManager;
        }

        [HttpGet]
        [Authorize]
        public ActionResult<IEnumerable<Product>> GetProducts()
        {
            Photographer? user = userManager.Users.FirstOrDefault(u => u.Id == userManager.GetUserId(User));
            return user.Products;
        }

        [HttpGet("{id}")]
        public ActionResult<Product> GetProduct(int id)
        {
            var product = productRepository.GetById(id);

            if (product == null)
            {
                return NotFound();
            }

            return product;
        }

        [HttpPut("{id}")]
        public ActionResult<Product> PutProduct(int id, Product product)
        {
            if (id != product.Id)
            {
                return BadRequest();
            }

            this.productRepository.Update(product);

            return product;
        }

        [HttpPost]
        [Authorize]
        public ActionResult<Product> PostProduct(Product product)
        {
            Photographer? user = userManager.Users.FirstOrDefault(u => u.Id == userManager.GetUserId(User));

            if (user == null)
                return Unauthorized();

            if (this.productRepository.GetAll().Any(i => i.Name == product.Name && i.PhotographerId == user.Id))
                return BadRequest("A megadott szolgáltatás már létezik.");

            product.PhotographerId = user.Id;
            this.productRepository.Insert(product);

            return CreatedAtAction("GetInstitution", new { id = product.Id }, product);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteProduct(int id)
        {
            var product = this.productRepository.GetById(id);
            if (product == null)
            {
                return NotFound();
            }

            this.productRepository.Delete(product.Id);

            return NoContent();
        }
    }
}
