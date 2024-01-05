using Microsoft.AspNetCore.Identity;

namespace PhotoPortal.ASP.Models
{
    /// <summary>
    /// A class representing a photographer.
    /// </summary>
    public class Photographer : IdentityUser
    {
        /// <summary>
        /// The name displayed.
        /// </summary>
        public string DisplayName { get; set; }

        /// <summary>
        /// The institutions that belong the this photographer.
        /// </summary>
        public List<Institution> Institutions { get; } = new();

        /// <summary>
        /// The orders submitted to the photographer.
        /// </summary>
        public List<Order> Orders { get; } = new(); 

        /// <summary>
        /// The products offered by the photographer.
        /// </summary>
        public List<Product> Products { get; } = new();

        /// <summary>
        /// The packages offered by the photographer.
        /// </summary>
        public List<PackageInformation> PackageInformations { get; } = new();
    }
}
