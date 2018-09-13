using Microsoft.EntityFrameworkCore.Migrations;

namespace ProjectCore.EntityFrameworkCore.Migrations
{
    public partial class Mig2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Address_IsDeleted",
                table: "UserInfo",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Address_IsDeleted",
                table: "UserInfo");
        }
    }
}
