using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace PhotoPortal.ASP.Data.Dtos
{
    public class FileUploadDto
    {
        [Required]
        public int ChildId { get; set; }
        //        [FromForm(Name = "Pictures")]
        [Required]
        public List<IFormFile> Pictures { get; set; }
    }
}
