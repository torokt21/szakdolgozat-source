using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PhotoPortal.ASP.Models
{
    public class Class
    {
        [Key]
        public int Id { get; set; }
        
        [Required]
        public string Name { get; set; }

        [ForeignKey(nameof(Models.Institution))]
        public int InstitutionId { get; set; }

        [NotMapped]
        public Institution Institution { get; set; }
    }
}
