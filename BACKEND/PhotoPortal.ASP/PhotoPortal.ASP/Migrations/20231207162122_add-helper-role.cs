using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PhotoPortal.ASP.Migrations
{
    public partial class addhelperrole : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetUserRoles",
                keyColumns: new[] { "RoleId", "UserId" },
                keyValues: new object[] { "1", "c153ea9f-63a4-4f63-8c18-878344141e39" });

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "c153ea9f-63a4-4f63-8c18-878344141e39");

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Discriminator", "DisplayName", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[] { "579494b8-3fa7-4bed-8234-f0a6b1899063", 0, "6cec5d54-9334-4128-ba8b-b2e5ca9b355f", "Photographer", "Az iskola fotósa", "torokt21@gmail.com", true, false, null, null, "TOROKT21", "AQAAAAEAACcQAAAAEM0wXvZHVnuVEdUJgwIslgnb30QljOejrv8dlZTR9waVRVfYBPEkxJ0F2xVNNwznJQ==", null, false, "d7ac51e2-4dd2-4b6c-8ee5-a285aaac355b", false, "torokt21" });

            migrationBuilder.InsertData(
                table: "AspNetUserRoles",
                columns: new[] { "RoleId", "UserId" },
                values: new object[] { "1", "579494b8-3fa7-4bed-8234-f0a6b1899063" });

            migrationBuilder.InsertData(
                table: "AspNetUserRoles",
                columns: new[] { "RoleId", "UserId" },
                values: new object[] { "2", "579494b8-3fa7-4bed-8234-f0a6b1899063" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetUserRoles",
                keyColumns: new[] { "RoleId", "UserId" },
                keyValues: new object[] { "1", "579494b8-3fa7-4bed-8234-f0a6b1899063" });

            migrationBuilder.DeleteData(
                table: "AspNetUserRoles",
                keyColumns: new[] { "RoleId", "UserId" },
                keyValues: new object[] { "2", "579494b8-3fa7-4bed-8234-f0a6b1899063" });

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "579494b8-3fa7-4bed-8234-f0a6b1899063");

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Discriminator", "DisplayName", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[] { "c153ea9f-63a4-4f63-8c18-878344141e39", 0, "6045b647-39f1-43f0-b73d-622a0843386f", "Photographer", "Az iskola fotósa", "torokt21@gmail.com", true, false, null, null, "TOROKT21", "AQAAAAEAACcQAAAAEBjZV0sD3fS1Y4n/74nLqtvjVxkW6MDFnYqbi+hj00oAtTsyIKTTaiWRUQvRXDju7A==", null, false, "bc6ad8c4-532f-4870-be47-06bcb939ca62", false, "torokt21" });

            migrationBuilder.InsertData(
                table: "AspNetUserRoles",
                columns: new[] { "RoleId", "UserId" },
                values: new object[] { "1", "c153ea9f-63a4-4f63-8c18-878344141e39" });
        }
    }
}
