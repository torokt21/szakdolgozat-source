using System.ComponentModel.DataAnnotations;

namespace PhotoPortal.ASP.Models
{
    public class UploadClass
    {
        [Key]
        public int Id { get; set; }

        public int InstitutionId { get; set; }

        public virtual Institution Institution { get; set; }

        public virtual List<Child> Children { get; set; } = new();
    }
}
