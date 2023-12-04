﻿using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using PhotoPortal.ASP.Models;
using System.Reflection.Emit;

namespace PhotoPortal.ASP.Data
{
    /// <inheritdoc/>
    public class ApplicationDbContext : IdentityDbContext
    {
#pragma warning disable CS1591 // Missing XML comment for publicly visible type or member
        public DbSet<Child> Children { get; set; }
        public DbSet<Institution> Institutions { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<PackageInformation> PackageInformations { get; set; }
        public DbSet<PackageOrder> PackageOrders { get; set; }
        public DbSet<PackageRequirement> PackageRequirements { get; set; }
        public DbSet<PaymentMethod> PaymentMethods { get; set; }
        public DbSet<Photographer> Users { get; set; }
        public DbSet<Picture> Pictures { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<ShippingMethod> ShippingMethods { get; set; }

#pragma warning restore CS1591 // Missing XML comment for publicly visible type or member

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

            // product - photographer
            builder.Entity<Product>()
                .HasOne(a => a.Photographer)
                .WithMany(b => b.Products)
                .HasForeignKey(a => a.PhotographerId);

            // package information - photographer
            builder.Entity<PackageInformation>()
                .HasOne(a => a.Photographer)
                .WithMany(b => b.PackageInformations)
                .HasForeignKey(a => a.PhotographerId);

            // picture - order item
            builder.Entity<OrderItem>()
                .HasOne(a => a.Picture)
                .WithMany()
                .HasForeignKey(a => a.PictureId);

            // package requirement - package information
            builder.Entity<PackageRequirement>()
                .HasOne(a => a.PackageInformation)
                .WithMany(b => b.Requirements)
                .HasForeignKey(a => a.PackageInformationId);

            // package order - package information
            builder.Entity<PackageOrder>()
                .HasOne(a => a.PackageInformation)
                .WithMany()
                .HasForeignKey(a => a.PackageInformationId);

            // institution - products
            builder.Entity<Institution>()
                .HasMany(a => a.OrderableProducts)
                .WithMany(b => b.AvailableIn);

            // institution - package infos
            builder.Entity<Institution>()
                .HasMany(a => a.OrderablePackages)
                .WithMany(b => b.AvaliableIn);


            builder.Entity<IdentityRole>().HasData(new { Id = "1", Name = "Admin", NormalizedName = "ADMIN" });

            base.OnModelCreating(builder);
        }
    }
}