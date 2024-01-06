using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PhotoPortal.ASP.Migrations
{
    public partial class addorderable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetUserRoles",
                keyColumns: new[] { "RoleId", "UserId" },
                keyValues: new object[] { "4cc0e13d-7c2e-4946-b2a9-f1b80af36743", "815268db-8493-4167-8266-0b01665e1c72" });

            migrationBuilder.DeleteData(
                table: "AspNetUserRoles",
                keyColumns: new[] { "RoleId", "UserId" },
                keyValues: new object[] { "9407ad10-0964-4010-ae9c-ee2f4b36bb35", "815268db-8493-4167-8266-0b01665e1c72" });

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "815268db-8493-4167-8266-0b01665e1c72");

            migrationBuilder.AddColumn<bool>(
                name: "Orderable",
                table: "Products",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Discriminator", "DisplayName", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[] { "9b9cbc6d-d5c6-4c44-8a60-50c11ae60d12", 0, "48dbc972-af2d-4780-b72a-3cd462ec2e1e", "Photographer", "Az iskola fotósa", "torokt21@gmail.com", true, false, null, null, "TOROKT21", "AQAAAAEAACcQAAAAEF9V3jBuFc/iBqy4Ftt8xnJsIz7GvKfC3pbc9wn+afNR8UVLmV+Ft+C9EupDplWEXg==", null, false, "babaa20a-1f91-491a-aa70-ebee6d481ddc", false, "torokt21" });

            migrationBuilder.InsertData(
                table: "AspNetUserRoles",
                columns: new[] { "RoleId", "UserId" },
                values: new object[] { "4cc0e13d-7c2e-4946-b2a9-f1b80af36743", "9b9cbc6d-d5c6-4c44-8a60-50c11ae60d12" });

            migrationBuilder.InsertData(
                table: "AspNetUserRoles",
                columns: new[] { "RoleId", "UserId" },
                values: new object[] { "9407ad10-0964-4010-ae9c-ee2f4b36bb35", "9b9cbc6d-d5c6-4c44-8a60-50c11ae60d12" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetUserRoles",
                keyColumns: new[] { "RoleId", "UserId" },
                keyValues: new object[] { "4cc0e13d-7c2e-4946-b2a9-f1b80af36743", "9b9cbc6d-d5c6-4c44-8a60-50c11ae60d12" });

            migrationBuilder.DeleteData(
                table: "AspNetUserRoles",
                keyColumns: new[] { "RoleId", "UserId" },
                keyValues: new object[] { "9407ad10-0964-4010-ae9c-ee2f4b36bb35", "9b9cbc6d-d5c6-4c44-8a60-50c11ae60d12" });

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "9b9cbc6d-d5c6-4c44-8a60-50c11ae60d12");

            migrationBuilder.DropColumn(
                name: "Orderable",
                table: "Products");

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Discriminator", "DisplayName", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[] { "815268db-8493-4167-8266-0b01665e1c72", 0, "297b07de-1544-45f8-8f25-6f9356e84567", "Photographer", "Az iskola fotósa", "torokt21@gmail.com", true, false, null, null, "TOROKT21", "AQAAAAEAACcQAAAAEFMHVTZU9a+pR4KsiSBTLZv+elV0TZtts87C71xj6uWlYNlKLaJMfT2yp7iKcCmWqg==", null, false, "4f8f61d9-6d3b-4c32-a945-f30ed8d07e0c", false, "torokt21" });

            migrationBuilder.InsertData(
                table: "AspNetUserRoles",
                columns: new[] { "RoleId", "UserId" },
                values: new object[] { "4cc0e13d-7c2e-4946-b2a9-f1b80af36743", "815268db-8493-4167-8266-0b01665e1c72" });

            migrationBuilder.InsertData(
                table: "AspNetUserRoles",
                columns: new[] { "RoleId", "UserId" },
                values: new object[] { "9407ad10-0964-4010-ae9c-ee2f4b36bb35", "815268db-8493-4167-8266-0b01665e1c72" });
        }
    }
}
