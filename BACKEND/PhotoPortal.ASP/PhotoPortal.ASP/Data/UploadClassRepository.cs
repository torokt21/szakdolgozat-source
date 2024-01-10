using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using PhotoPortal.ASP.Models;

namespace PhotoPortal.ASP.Data
{
    public class UploadClassRepository : GenericRepository<UploadClass>, IUploadClassRepository
    {
        public UploadClassRepository(ApplicationDbContext context) : base(context)
        {
        }
    }
}
