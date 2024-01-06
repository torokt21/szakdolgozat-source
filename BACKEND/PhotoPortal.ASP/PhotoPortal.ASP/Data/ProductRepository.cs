using PhotoPortal.ASP.Models;

namespace PhotoPortal.ASP.Data
{
    public class ProductRepository : GenericRepository<Product>, IProductRepository
    {
        public ProductRepository(ApplicationDbContext context) : base(context)
        {
        }
    }
}
