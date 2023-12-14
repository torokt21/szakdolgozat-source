using PhotoPortal.ASP.Models;

namespace PhotoPortal.ASP.Data
{
    public class InstitutionRepository : GenericRepository<Institution>, IInstitutionRepository
    {
        public InstitutionRepository(ApplicationDbContext context) : base(context)
        {
        }
    }
}
