using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PhotoPortal.ASP.Models
{
    /// <summary>
    /// Describes a product that can be in a package.
    /// </summary>
    public class PackageRequirement
    {
        /// <summary>
        /// The id of the package requirement.
        /// </summary>
        [Key]
        public int Id { get; set; }

        /// <summary>
        /// The id of the package that contains this requirement.
        /// </summary>
        public int PackageInformationId { get; set; }

        /// <summary>
        /// The package that contains this requirement.
        /// </summary>
        public PackageInformation PackageInformation { get; set; }

        /// <summary>
        /// The id of the product described by this requirement.
        /// </summary>
        public int ProductId { get; set; }

        /// <summary>
        /// The product described by this requirement.
        /// </summary>
        public Product Product { get; set; }

        /// <summary>
        /// The quantity of the specified product.
        /// </summary>
        public int Quantity { get; set; }
    }
}
