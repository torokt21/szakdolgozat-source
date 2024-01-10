using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PhotoPortal.ASP.Migrations
{
    public partial class adddir : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetUserRoles",
                keyColumns: new[] { "RoleId", "UserId" },
                keyValues: new object[] { "4cc0e13d-7c2e-4946-b2a9-f1b80af36743", "eafc531b-60e2-4b2c-a114-971adddee5fb" });

            migrationBuilder.DeleteData(
                table: "AspNetUserRoles",
                keyColumns: new[] { "RoleId", "UserId" },
                keyValues: new object[] { "9407ad10-0964-4010-ae9c-ee2f4b36bb35", "eafc531b-60e2-4b2c-a114-971adddee5fb" });

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "eafc531b-60e2-4b2c-a114-971adddee5fb");

            migrationBuilder.AddColumn<string>(
                name: "DirectoryName",
                table: "UploadClasses",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Discriminator", "DisplayName", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[] { "839991d4-04a0-4587-8b1f-94273caca81b", 0, "1f190155-5231-4579-b6ee-99d6e93e1118", "Photographer", "Az iskola fotósa", "torokt21@gmail.com", true, false, null, null, "TOROKT21", "AQAAAAEAACcQAAAAEKkzNcocqtL6edqblz2vdef9EIAZnqln2zISrG0VTWBxLvqwb8hr1iqEA0jsocptaQ==", null, false, "aa6e81e5-4088-4ab7-8b1d-21d979366c79", false, "torokt21" });

            migrationBuilder.InsertData(
                table: "AspNetUserRoles",
                columns: new[] { "RoleId", "UserId" },
                values: new object[] { "4cc0e13d-7c2e-4946-b2a9-f1b80af36743", "839991d4-04a0-4587-8b1f-94273caca81b" });

            migrationBuilder.InsertData(
                table: "AspNetUserRoles",
                columns: new[] { "RoleId", "UserId" },
                values: new object[] { "9407ad10-0964-4010-ae9c-ee2f4b36bb35", "839991d4-04a0-4587-8b1f-94273caca81b" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetUserRoles",
                keyColumns: new[] { "RoleId", "UserId" },
                keyValues: new object[] { "4cc0e13d-7c2e-4946-b2a9-f1b80af36743", "839991d4-04a0-4587-8b1f-94273caca81b" });

            migrationBuilder.DeleteData(
                table: "AspNetUserRoles",
                keyColumns: new[] { "RoleId", "UserId" },
                keyValues: new object[] { "9407ad10-0964-4010-ae9c-ee2f4b36bb35", "839991d4-04a0-4587-8b1f-94273caca81b" });

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "839991d4-04a0-4587-8b1f-94273caca81b");

            migrationBuilder.DropColumn(
                name: "DirectoryName",
                table: "UploadClasses");

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Discriminator", "DisplayName", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[] { "eafc531b-60e2-4b2c-a114-971adddee5fb", 0, "3439e52b-d6ff-4131-9181-a6bc81135160", "Photographer", "Az iskola fotósa", "torokt21@gmail.com", true, false, null, null, "TOROKT21", "AQAAAAEAACcQAAAAEMhmV3nvjptYrylr60Vl1Pm6iq7Zh4ctz/DwJxpqWiU2n3jPXA3pOCgSuDmv20uH3w==", null, false, "41eace87-01a0-4ecd-b322-04014e2982e2", false, "torokt21" });

            migrationBuilder.InsertData(
                table: "AspNetUserRoles",
                columns: new[] { "RoleId", "UserId" },
                values: new object[] { "4cc0e13d-7c2e-4946-b2a9-f1b80af36743", "eafc531b-60e2-4b2c-a114-971adddee5fb" });

            migrationBuilder.InsertData(
                table: "AspNetUserRoles",
                columns: new[] { "RoleId", "UserId" },
                values: new object[] { "9407ad10-0964-4010-ae9c-ee2f4b36bb35", "eafc531b-60e2-4b2c-a114-971adddee5fb" });
        }
    }
}
