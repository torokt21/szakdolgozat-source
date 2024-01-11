using PhotoPortal.ASP.Models;

namespace PhotoPortal.ASP.Data
{
    public class PictureRepository : GenericRepository<Picture>, IPictureRepository
    {
        public PictureRepository(ApplicationDbContext context) : base(context)
        {
        }
    }
}
