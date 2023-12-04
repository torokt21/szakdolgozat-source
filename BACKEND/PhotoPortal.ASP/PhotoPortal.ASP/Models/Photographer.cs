using Microsoft.AspNetCore.Identity;

namespace PhotoPortal.ASP.Models
{
    /// <summary>
    /// A class representing a photographer.
    /// </summary>
    public class Photographer : IdentityUser
    {
        /// <summary>
        /// The institutions that belong the this photographer.
        /// </summary>
        public IEnumerable<Institution> Institutions { get; set; }

        public IEnumerable<Order> Orders { get; set; }
    }
}
