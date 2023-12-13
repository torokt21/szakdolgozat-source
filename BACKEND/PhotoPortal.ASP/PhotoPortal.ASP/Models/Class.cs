using System.ComponentModel.DataAnnotations;

namespace PhotoPortal.ASP.Models
{
    public class Class
    {
        [Key]
        public int Id { get; set; }
        
        [Required]
        public string Name { get; set; }

        public int InstitutionId { get; set; }

        public Institution Institution { get; set; }
    }
}
