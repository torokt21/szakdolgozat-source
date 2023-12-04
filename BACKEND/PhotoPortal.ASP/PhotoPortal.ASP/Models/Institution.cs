using System.ComponentModel.DataAnnotations;

namespace PhotoPortal.ASP.Models
{
    /// <summary>
    /// A class representing an institution.
    /// </summary>
    public class Institution
    {
        /// <summary>
        /// The id of the institution.
        /// </summary>
        [Key]
        public int Id { get; set; }

        /// <summary>
        /// The name of the institution.
        /// </summary>
        [Required]
        [StringLength(50, MinimumLength = 3)]
        public string Name { get; set; }

        /// <summary>
        /// The contact info of the insitution.
        /// </summary>
        public string ContactInfo { get; set; }

        /// <summary>
        /// The id of the fotographer who this institution belongs to.
        /// </summary>
        public string PhotographerId { get; set; }

        /// <summary>
        /// The photographer that this institution belongs to.
        /// </summary>
        public Photographer Photographer { get; set; }

        /// <summary>
        /// The children in this institution.
        /// </summary>
        public IEnumerable<Child> Children { get; set; }
    }
}
