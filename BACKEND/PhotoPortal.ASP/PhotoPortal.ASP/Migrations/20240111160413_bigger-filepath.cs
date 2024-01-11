using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PhotoPortal.ASP.Migrations
{
    public partial class biggerfilepath : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.AlterColumn<string>(
                name: "Filename",
                table: "Pictures",
                type: "nvarchar(1024)",
                maxLength: 1024,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(50)",
                oldMaxLength: 50);

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Discriminator", "DisplayName", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[] { "19f109e1-1b1f-4c9e-b8ae-d1d1273b79ff", 0, "d84a3899-9ad0-407c-baf0-1b91c43d5c9e", "Photographer", "Az iskola fotósa", "torokt21@gmail.com", true, false, null, null, "TOROKT21", "AQAAAAEAACcQAAAAEGGON+MLdBLUfi1GbAWWrpgSQTvfFQjuZtfJQPyboGBrBCosELQ798sZWU7jSuu/jQ==", null, false, "e643b761-664a-492b-8012-59b8a36e19b5", false, "torokt21" });

            migrationBuilder.InsertData(
                table: "AspNetUserRoles",
                columns: new[] { "RoleId", "UserId" },
                values: new object[] { "4cc0e13d-7c2e-4946-b2a9-f1b80af36743", "19f109e1-1b1f-4c9e-b8ae-d1d1273b79ff" });

            migrationBuilder.InsertData(
                table: "AspNetUserRoles",
                columns: new[] { "RoleId", "UserId" },
                values: new object[] { "9407ad10-0964-4010-ae9c-ee2f4b36bb35", "19f109e1-1b1f-4c9e-b8ae-d1d1273b79ff" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetUserRoles",
                keyColumns: new[] { "RoleId", "UserId" },
                keyValues: new object[] { "4cc0e13d-7c2e-4946-b2a9-f1b80af36743", "19f109e1-1b1f-4c9e-b8ae-d1d1273b79ff" });

            migrationBuilder.DeleteData(
                table: "AspNetUserRoles",
                keyColumns: new[] { "RoleId", "UserId" },
                keyValues: new object[] { "9407ad10-0964-4010-ae9c-ee2f4b36bb35", "19f109e1-1b1f-4c9e-b8ae-d1d1273b79ff" });

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "19f109e1-1b1f-4c9e-b8ae-d1d1273b79ff");

            migrationBuilder.AlterColumn<string>(
                name: "Filename",
                table: "Pictures",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(1024)",
                oldMaxLength: 1024);

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
    }
}
