using System.ComponentModel.DataAnnotations;

namespace PhotoPortal.ASP.Models
{
    /// <summary>
    /// A submitted order.
    /// </summary>
    public class Order
    {
        /// <summary>
        /// The id of the order.
        /// </summary>
        [Key]
        public int Id { get; set; }

        /// <summary>
        /// The items in this order.
        /// </summary>
        public List<OrderItem> Items { get; }

        /// <summary>
        /// The id of the photographer this order belongs to.
        /// </summary>
        public string PhotographerId { get; set; }

        /// <summary>
        /// The photographer this order belongs to.
        /// </summary>
        public Photographer Photographer { get; set; }
    }
}
