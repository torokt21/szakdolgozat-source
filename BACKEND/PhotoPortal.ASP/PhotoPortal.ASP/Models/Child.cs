using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace PhotoPortal.ASP.Models
{
    /// <summary>
    /// A class representing a child.
    /// </summary>
    public class Child
    {
        /// <summary>
        /// The id of the child.
        /// </summary>
        [Key]
        public int Id { get; set; }

        /// <summary>
        /// The id of the institution the child belongs to.
        /// </summary>
        [ForeignKey(nameof(UploadClass))]
        public int UploadClassId { get; set; }

        /// <summary>
        /// The passcode belinging to the child.
        /// </summary>
        [ValidateNever]
        public string Passcode { get; set; }

        public string DirectoryName { get; set; }

        /// <summary>
        /// The class folder the child belongs to.
        /// </summary>
        [ValidateNever]
        [JsonIgnore]
        public virtual UploadClass Class { get; }

        /// <summary>
        /// The pictures taken of the child.
        /// </summary>
        [ValidateNever]
        public virtual List<Picture> Pictures { get; } = new();
    }
}
