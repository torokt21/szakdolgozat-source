using System.ComponentModel.DataAnnotations;

namespace PhotoPortal.ASP.Models
{
    /// <summary>
    /// A class represetning a product that can be ordered.
    /// </summary>
    public class Product
    {
        /// <summary>
        /// The primary id of the product.
        /// </summary>
        [Key]
        public int Id { get; set; }
        /// <summary>
        /// The name of the product.
        /// </summary>
        [Required]
        [StringLength(50)]
        public string Name { get; set; }

        /// <summary>
        /// The name of the product.
        /// </summary>
        [StringLength(200)]
        public string? Description { get; set; }

        /// <summary>
        /// The id of the photographer offering this product.
        /// </summary>
        [Required]
        public string PhotographerId { get; set; }

        /// <summary>
        /// The photographer offering this product.
        /// </summary>
        public Photographer Photographer { get; set; }
    }
}
