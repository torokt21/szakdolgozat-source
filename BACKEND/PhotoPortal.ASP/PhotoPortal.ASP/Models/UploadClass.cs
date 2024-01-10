using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace PhotoPortal.ASP.Models
{
    public class UploadClass
    {
        [Key]
        public int Id { get; set; }

        public int InstitutionId { get; set; }

        public string DirectoryName { get; set; }

        [ValidateNever]
        [JsonIgnore]
        public virtual Institution Institution { get; set; }

        [ValidateNever]
        public virtual List<Child> Children { get; set; } = new();
    }
}
