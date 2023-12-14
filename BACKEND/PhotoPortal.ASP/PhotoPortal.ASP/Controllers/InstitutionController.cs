using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PhotoPortal.ASP.Data;
using PhotoPortal.ASP.Models;

namespace PhotoPortal.ASP.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InstitutionController : ControllerBase
    {
        private IInstitutionRepository institutionRepository;
        private readonly UserManager<Photographer> userManager;

        public InstitutionController(IInstitutionRepository repo, UserManager<Photographer> userManager)
        {
            this.institutionRepository = repo;
            this.userManager = userManager; 
        }

        // GET: api/Institution
        [HttpGet]
        public ActionResult<IEnumerable<Institution>> GetInstitutions()
        {
            return institutionRepository.GetAll().ToList();
        }

        // GET: api/Institution/5
        [HttpGet("{id}")]
        public ActionResult<Institution> GetInstitution(int id)
        {
            var institution = institutionRepository.GetById(id);

            if (institution == null)
            {
                return NotFound();
            }

            return institution;
        }

        // PUT: api/Institution/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public ActionResult<Institution> PutInstitution(int id, Institution institution)
        {
            if (id != institution.Id)
            {
                return BadRequest();
            }

            this.institutionRepository.Update(institution);

            return institution;
        }

        // POST: api/Institution
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [Authorize]
        public ActionResult<Institution> PostInstitution(Institution institution)
        {
            institution.PhotographerId = userManager.GetUserId(User);
            this.institutionRepository.Insert(institution);

            return CreatedAtAction("GetInstitution", new { id = institution.Id }, institution);
        }

        // DELETE: api/Institution/5
        [HttpDelete("{id}")]
        public IActionResult DeleteInstitution(int id)
        {
            var institution = this.institutionRepository.GetById(id);
            if (institution == null)
            {
                return NotFound();
            }

            this.institutionRepository.Delete(institution);

            return NoContent();
        }
    }
}
