using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using PhotoPortal.ASP.Models;
using System.Reflection.Emit;

namespace PhotoPortal.ASP.Data
{
    /// <inheritdoc/>
    public class ApplicationDbContext : IdentityDbContext
    {

        public DbSet<Child> Children { get; set; }
        public DbSet<Institution> Institutions { get; set; }
        /// <summary>
        /// The set of users.
        /// </summary>
        public DbSet<Photographer> Users { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<Picture> Pictures { get; set; }
        public DbSet<Product> Products { get; set; }

        /// <inheritdoc/>
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }


        /// <inheritdoc/>
        protected override void OnModelCreating(ModelBuilder builder)
        {
            // Relationships

            // institution - photographer
            builder.Entity<Institution>()
                .HasOne(a => a.Photographer)
                .WithMany(b => b.Institutions)
                .HasForeignKey(a => a.PhotographerId);

            // institution - child
            builder.Entity<Child>()
                .HasOne(a => a.Institution)
                .WithMany(b => b.Children)
                .HasForeignKey(a => a.InstitutionId);

            // picture - child
            builder.Entity<Picture>()
                .HasOne(a => a.Child)
                .WithMany(b => b.Pictures)
                .HasForeignKey(a => a.ChildId);

            // order - photographer
            builder.Entity<Order>()
                .HasOne(a => a.Photographer)
                .WithMany(b => b.Orders)
                .HasForeignKey(a => a.PhotographerId);

            // order - order item
            builder.Entity<OrderItem>()
                .HasOne(a => a.Order)
                .WithMany(b => b.Items)
                .HasForeignKey(a => a.OrderId);

            // product - order item
            builder.Entity<OrderItem>()
                .HasOne(a => a.Product)
                .WithMany()
                .HasForeignKey(a => a.ProductId);

            // picture - order item
            builder.Entity<OrderItem>()
                .HasOne(a => a.Picture)
                .WithMany()
                .HasForeignKey(a => a.PictureId);

            builder.Entity<IdentityRole>().HasData(new { Id = "1", Name = "Admin", NormalizedName = "ADMIN" });

            base.OnModelCreating(builder);
        }
    }
}