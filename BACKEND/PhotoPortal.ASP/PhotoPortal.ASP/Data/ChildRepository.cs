using PhotoPortal.ASP.Models;

namespace PhotoPortal.ASP.Data
{
    public class ChildRepository : GenericRepository<Child>, IChildRepository
    {
        public ChildRepository(ApplicationDbContext context) : base(context)
        {
        }
    }
}
