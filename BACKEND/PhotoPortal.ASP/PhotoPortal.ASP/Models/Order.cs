namespace PhotoPortal.ASP.Models
{
    public class Order
    {
        /// <summary>
        /// The items in this order.
        /// </summary>
        public IEnumerable<OrderItem> Items { get; set; }

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
