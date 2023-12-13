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
        /// The 3 letter shortcode of the institution.
        /// </summary>
        [Required]
        [StringLength(3, MinimumLength = 3)]
        public string Shortcode { get; set; }

        /// <summary>
        /// The contact info of the insitution.
        /// </summary>
        public string ContactInfo { get; set; }

        /// <summary>
        /// The id of the fotographer who this institution belongs to.
        /// </summary>
        public string? PhotographerId { get; set; }

        /// <summary>
        /// The photographer that this institution belongs to.
        /// </summary>
        public Photographer? Photographer { get; }

        /// <summary>
        /// The children in this institution.
        /// </summary>
        public List<Child> Children { get; }

        /// <summary>
        /// The soft deadline of the institution. This is displayed on the main page, 
        /// but users can still purchase items.
        /// </summary>
        public DateTime SoftDeadline { get; set; }

        /// <summary>
        /// No purchases can be made for phisical items over this deadline.
        /// </summary>
        public DateTime HardDeadline { get; set; }

        /// <summary>
        /// The starting date of the expected shipping.
        /// </summary>
        public DateTime ExpectedShippingStart { get; set; }

        /// <summary>
        /// The final date of the expected shipping.
        /// </summary>
        public DateTime ExpectedShippingEnd { get; set; }

        /// <summary>
        /// The display message shown when listing all pictures.
        /// </summary>
        public string DisplayMessage { get; set; }

        /// <summary>
        /// Products that can be ordered by this institution.
        /// </summary>
        public List<Product> OrderableProducts { get; }

        /// <summary>
        /// Packages that can be ordered by this institution.
        /// </summary>
        public List<PackageInformation> OrderablePackages { get; }
        
    }
}
