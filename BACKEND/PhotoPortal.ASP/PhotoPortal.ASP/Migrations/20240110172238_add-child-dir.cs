using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PhotoPortal.ASP.Migrations
{
    public partial class addchilddir : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.AddColumn<string>(
                name: "DirectoryName",
                table: "Children",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Discriminator", "DisplayName", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[] { "78d60174-0fdd-4edf-9c96-ba4ea9206af9", 0, "4ed03eac-2191-4295-8085-7a04c695e2d1", "Photographer", "Az iskola fotósa", "torokt21@gmail.com", true, false, null, null, "TOROKT21", "AQAAAAEAACcQAAAAEO3MFUIrbmQPxrFfacEPMDSNgdjiMXUVJ1Ty6IDdvgQDCyyHKBt33IYk9vEudmD7EQ==", null, false, "df65f17d-3ea8-462c-b611-fd566d2cf867", false, "torokt21" });

            migrationBuilder.InsertData(
                table: "AspNetUserRoles",
                columns: new[] { "RoleId", "UserId" },
                values: new object[] { "4cc0e13d-7c2e-4946-b2a9-f1b80af36743", "78d60174-0fdd-4edf-9c96-ba4ea9206af9" });

            migrationBuilder.InsertData(
                table: "AspNetUserRoles",
                columns: new[] { "RoleId", "UserId" },
                values: new object[] { "9407ad10-0964-4010-ae9c-ee2f4b36bb35", "78d60174-0fdd-4edf-9c96-ba4ea9206af9" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetUserRoles",
                keyColumns: new[] { "RoleId", "UserId" },
                keyValues: new object[] { "4cc0e13d-7c2e-4946-b2a9-f1b80af36743", "78d60174-0fdd-4edf-9c96-ba4ea9206af9" });

            migrationBuilder.DeleteData(
                table: "AspNetUserRoles",
                keyColumns: new[] { "RoleId", "UserId" },
                keyValues: new object[] { "9407ad10-0964-4010-ae9c-ee2f4b36bb35", "78d60174-0fdd-4edf-9c96-ba4ea9206af9" });

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "78d60174-0fdd-4edf-9c96-ba4ea9206af9");

            migrationBuilder.DropColumn(
                name: "DirectoryName",
                table: "Children");

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
    }
}
