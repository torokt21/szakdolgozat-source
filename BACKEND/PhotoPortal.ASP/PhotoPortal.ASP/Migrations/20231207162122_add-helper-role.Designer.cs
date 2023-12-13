﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using PhotoPortal.ASP.Data;

#nullable disable

namespace PhotoPortal.ASP.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20231207162122_add-helper-role")]
    partial class addhelperrole
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.14")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("InstitutionPackageInformation", b =>
                {
                    b.Property<int>("AvaliableInId")
                        .HasColumnType("int");

                    b.Property<int>("OrderablePackagesId")
                        .HasColumnType("int");

                    b.HasKey("AvaliableInId", "OrderablePackagesId");

                    b.HasIndex("OrderablePackagesId");

                    b.ToTable("InstitutionPackageInformation");
                });

            modelBuilder.Entity("InstitutionProduct", b =>
                {
                    b.Property<int>("AvailableInId")
                        .HasColumnType("int");

                    b.Property<int>("OrderableProductsId")
                        .HasColumnType("int");

                    b.HasKey("AvailableInId", "OrderableProductsId");

                    b.HasIndex("OrderableProductsId");

                    b.ToTable("InstitutionProduct");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasDatabaseName("RoleNameIndex")
                        .HasFilter("[NormalizedName] IS NOT NULL");

                    b.ToTable("AspNetRoles", (string)null);

                    b.HasData(
                        new
                        {
                            Id = "1",
                            Name = "Admin",
                            NormalizedName = "ADMIN"
                        },
                        new
                        {
                            Id = "2",
                            Name = "Helper",
                            NormalizedName = "HELPER"
                        });
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("ClaimType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("RoleId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUser", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("int");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Discriminator")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("bit");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("bit");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("datetimeoffset");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("bit");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("bit");

                    b.Property<string>("UserName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasDatabaseName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasDatabaseName("UserNameIndex")
                        .HasFilter("[NormalizedUserName] IS NOT NULL");

                    b.ToTable("AspNetUsers", (string)null);

                    b.HasDiscriminator<string>("Discriminator").HasValue("IdentityUser");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("ClaimType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider")
                        .HasMaxLength(128)
                        .HasColumnType("nvarchar(128)");

                    b.Property<string>("ProviderKey")
                        .HasMaxLength(128)
                        .HasColumnType("nvarchar(128)");

                    b.Property<string>("ProviderDisplayName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("RoleId")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles", (string)null);

                    b.HasData(
                        new
                        {
                            UserId = "579494b8-3fa7-4bed-8234-f0a6b1899063",
                            RoleId = "1"
                        },
                        new
                        {
                            UserId = "579494b8-3fa7-4bed-8234-f0a6b1899063",
                            RoleId = "2"
                        });
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("LoginProvider")
                        .HasMaxLength(128)
                        .HasColumnType("nvarchar(128)");

                    b.Property<string>("Name")
                        .HasMaxLength(128)
                        .HasColumnType("nvarchar(128)");

                    b.Property<string>("Value")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens", (string)null);
                });

            modelBuilder.Entity("PhotoPortal.ASP.Models.Child", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<int>("InstitutionId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("InstitutionId");

                    b.ToTable("Children");
                });

            modelBuilder.Entity("PhotoPortal.ASP.Models.Institution", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<bool>("CanOrderDigital")
                        .HasColumnType("bit");

                    b.Property<string>("ContactInfo")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("DisplayMessage")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("ExpectedShippingEnd")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("ExpectedShippingStart")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("HardDeadline")
                        .HasColumnType("datetime2");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("PhotographerId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<DateTime>("ShippingToInstitutionDeadline")
                        .HasColumnType("datetime2");

                    b.Property<string>("Shortcode")
                        .IsRequired()
                        .HasMaxLength(3)
                        .HasColumnType("nvarchar(3)");

                    b.Property<DateTime>("SoftDeadline")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.HasIndex("PhotographerId");

                    b.ToTable("Institutions");
                });

            modelBuilder.Entity("PhotoPortal.ASP.Models.Order", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<int?>("PaymentMethodId")
                        .HasColumnType("int");

                    b.Property<string>("PhotographerId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int?>("ShippingMethodId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("PaymentMethodId");

                    b.HasIndex("PhotographerId");

                    b.HasIndex("ShippingMethodId");

                    b.ToTable("Orders");
                });

            modelBuilder.Entity("PhotoPortal.ASP.Models.OrderItem", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<int>("OrderId")
                        .HasColumnType("int");

                    b.Property<int?>("OrderedPackageId")
                        .HasColumnType("int");

                    b.Property<int?>("PackageId")
                        .HasColumnType("int");

                    b.Property<int?>("PictureId")
                        .HasColumnType("int");

                    b.Property<int>("ProductId")
                        .HasColumnType("int");

                    b.Property<int>("Quantity")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("OrderId");

                    b.HasIndex("OrderedPackageId");

                    b.HasIndex("PictureId");

                    b.HasIndex("ProductId");

                    b.ToTable("OrderItems");
                });

            modelBuilder.Entity("PhotoPortal.ASP.Models.PackageInformation", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhotographerId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("Price")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("PhotographerId");

                    b.ToTable("PackageInformations");
                });

            modelBuilder.Entity("PhotoPortal.ASP.Models.PackageOrder", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<int?>("PackageInformationId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("PackageInformationId");

                    b.ToTable("PackageOrders");
                });

            modelBuilder.Entity("PhotoPortal.ASP.Models.PackageRequirement", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<int>("PackageInformationId")
                        .HasColumnType("int");

                    b.Property<int>("ProductId")
                        .HasColumnType("int");

                    b.Property<int>("Quantity")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("PackageInformationId");

                    b.HasIndex("ProductId");

                    b.ToTable("PackageRequirements");
                });

            modelBuilder.Entity("PhotoPortal.ASP.Models.PaymentMethod", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<bool>("Avaliable")
                        .HasColumnType("bit");

                    b.Property<int>("Fee")
                        .HasColumnType("int");

                    b.Property<string>("Icon")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Longname")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Shortname")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("PaymentMethods");
                });

            modelBuilder.Entity("PhotoPortal.ASP.Models.Picture", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<int>("ChildId")
                        .HasColumnType("int");

                    b.Property<string>("Filename")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<int>("InstitutionId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("ChildId");

                    b.ToTable("Pictures");
                });

            modelBuilder.Entity("PhotoPortal.ASP.Models.Product", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("Description")
                        .HasMaxLength(200)
                        .HasColumnType("nvarchar(200)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("PhotographerId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("Price")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("PhotographerId");

                    b.ToTable("Products");
                });

            modelBuilder.Entity("PhotoPortal.ASP.Models.ShippingMethod", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<bool>("Avaliable")
                        .HasColumnType("bit");

                    b.Property<int>("Fee")
                        .HasColumnType("int");

                    b.Property<string>("Icon")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Longname")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Shortname")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("ShippingMethods");
                });

            modelBuilder.Entity("PhotoPortal.ASP.Models.Photographer", b =>
                {
                    b.HasBaseType("Microsoft.AspNetCore.Identity.IdentityUser");

                    b.Property<string>("DisplayName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasDiscriminator().HasValue("Photographer");

                    b.HasData(
                        new
                        {
                            Id = "579494b8-3fa7-4bed-8234-f0a6b1899063",
                            AccessFailedCount = 0,
                            ConcurrencyStamp = "6cec5d54-9334-4128-ba8b-b2e5ca9b355f",
                            Email = "torokt21@gmail.com",
                            EmailConfirmed = true,
                            LockoutEnabled = false,
                            NormalizedUserName = "TOROKT21",
                            PasswordHash = "AQAAAAEAACcQAAAAEM0wXvZHVnuVEdUJgwIslgnb30QljOejrv8dlZTR9waVRVfYBPEkxJ0F2xVNNwznJQ==",
                            PhoneNumberConfirmed = false,
                            SecurityStamp = "d7ac51e2-4dd2-4b6c-8ee5-a285aaac355b",
                            TwoFactorEnabled = false,
                            UserName = "torokt21",
                            DisplayName = "Az iskola fotósa"
                        });
                });

            modelBuilder.Entity("InstitutionPackageInformation", b =>
                {
                    b.HasOne("PhotoPortal.ASP.Models.Institution", null)
                        .WithMany()
                        .HasForeignKey("AvaliableInId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("PhotoPortal.ASP.Models.PackageInformation", null)
                        .WithMany()
                        .HasForeignKey("OrderablePackagesId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("InstitutionProduct", b =>
                {
                    b.HasOne("PhotoPortal.ASP.Models.Institution", null)
                        .WithMany()
                        .HasForeignKey("AvailableInId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("PhotoPortal.ASP.Models.Product", null)
                        .WithMany()
                        .HasForeignKey("OrderableProductsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("PhotoPortal.ASP.Models.Child", b =>
                {
                    b.HasOne("PhotoPortal.ASP.Models.Institution", "Institution")
                        .WithMany("Children")
                        .HasForeignKey("InstitutionId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Institution");
                });

            modelBuilder.Entity("PhotoPortal.ASP.Models.Institution", b =>
                {
                    b.HasOne("PhotoPortal.ASP.Models.Photographer", "Photographer")
                        .WithMany("Institutions")
                        .HasForeignKey("PhotographerId")
                        .OnDelete(DeleteBehavior.SetNull);

                    b.Navigation("Photographer");
                });

            modelBuilder.Entity("PhotoPortal.ASP.Models.Order", b =>
                {
                    b.HasOne("PhotoPortal.ASP.Models.PaymentMethod", "PaymentMethod")
                        .WithMany()
                        .HasForeignKey("PaymentMethodId")
                        .OnDelete(DeleteBehavior.SetNull);

                    b.HasOne("PhotoPortal.ASP.Models.Photographer", "Photographer")
                        .WithMany("Orders")
                        .HasForeignKey("PhotographerId")
                        .OnDelete(DeleteBehavior.SetNull);

                    b.HasOne("PhotoPortal.ASP.Models.ShippingMethod", "ShippingMethod")
                        .WithMany()
                        .HasForeignKey("ShippingMethodId")
                        .OnDelete(DeleteBehavior.SetNull);

                    b.Navigation("PaymentMethod");

                    b.Navigation("Photographer");

                    b.Navigation("ShippingMethod");
                });

            modelBuilder.Entity("PhotoPortal.ASP.Models.OrderItem", b =>
                {
                    b.HasOne("PhotoPortal.ASP.Models.Order", "Order")
                        .WithMany("Items")
                        .HasForeignKey("OrderId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("PhotoPortal.ASP.Models.PackageOrder", "OrderedPackage")
                        .WithMany("Items")
                        .HasForeignKey("OrderedPackageId");

                    b.HasOne("PhotoPortal.ASP.Models.Picture", "Picture")
                        .WithMany()
                        .HasForeignKey("PictureId")
                        .OnDelete(DeleteBehavior.SetNull);

                    b.HasOne("PhotoPortal.ASP.Models.Product", "Product")
                        .WithMany()
                        .HasForeignKey("ProductId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Order");

                    b.Navigation("OrderedPackage");

                    b.Navigation("Picture");

                    b.Navigation("Product");
                });

            modelBuilder.Entity("PhotoPortal.ASP.Models.PackageInformation", b =>
                {
                    b.HasOne("PhotoPortal.ASP.Models.Photographer", "Photographer")
                        .WithMany("PackageInformations")
                        .HasForeignKey("PhotographerId")
                        .OnDelete(DeleteBehavior.SetNull);

                    b.Navigation("Photographer");
                });

            modelBuilder.Entity("PhotoPortal.ASP.Models.PackageOrder", b =>
                {
                    b.HasOne("PhotoPortal.ASP.Models.PackageInformation", "PackageInformation")
                        .WithMany()
                        .HasForeignKey("PackageInformationId")
                        .OnDelete(DeleteBehavior.SetNull);

                    b.Navigation("PackageInformation");
                });

            modelBuilder.Entity("PhotoPortal.ASP.Models.PackageRequirement", b =>
                {
                    b.HasOne("PhotoPortal.ASP.Models.PackageInformation", "PackageInformation")
                        .WithMany("Requirements")
                        .HasForeignKey("PackageInformationId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("PhotoPortal.ASP.Models.Product", "Product")
                        .WithMany()
                        .HasForeignKey("ProductId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("PackageInformation");

                    b.Navigation("Product");
                });

            modelBuilder.Entity("PhotoPortal.ASP.Models.Picture", b =>
                {
                    b.HasOne("PhotoPortal.ASP.Models.Child", "Child")
                        .WithMany("Pictures")
                        .HasForeignKey("ChildId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Child");
                });

            modelBuilder.Entity("PhotoPortal.ASP.Models.Product", b =>
                {
                    b.HasOne("PhotoPortal.ASP.Models.Photographer", "Photographer")
                        .WithMany("Products")
                        .HasForeignKey("PhotographerId")
                        .OnDelete(DeleteBehavior.SetNull);

                    b.Navigation("Photographer");
                });

            modelBuilder.Entity("PhotoPortal.ASP.Models.Child", b =>
                {
                    b.Navigation("Pictures");
                });

            modelBuilder.Entity("PhotoPortal.ASP.Models.Institution", b =>
                {
                    b.Navigation("Children");
                });

            modelBuilder.Entity("PhotoPortal.ASP.Models.Order", b =>
                {
                    b.Navigation("Items");
                });

            modelBuilder.Entity("PhotoPortal.ASP.Models.PackageInformation", b =>
                {
                    b.Navigation("Requirements");
                });

            modelBuilder.Entity("PhotoPortal.ASP.Models.PackageOrder", b =>
                {
                    b.Navigation("Items");
                });

            modelBuilder.Entity("PhotoPortal.ASP.Models.Photographer", b =>
                {
                    b.Navigation("Institutions");

                    b.Navigation("Orders");

                    b.Navigation("PackageInformations");

                    b.Navigation("Products");
                });
#pragma warning restore 612, 618
        }
    }
}