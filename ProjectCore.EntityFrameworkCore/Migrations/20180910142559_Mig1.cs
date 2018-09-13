using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ProjectCore.EntityFrameworkCore.Migrations
{
    public partial class Mig1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
           

          
           
                   
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserGroupUnRoleInfo");

            migrationBuilder.DropTable(
                name: "UserUnGroupInfo");

            migrationBuilder.DropTable(
                name: "UserUnRoleInfo");

            migrationBuilder.DropTable(
                name: "UserGroupInfo");

            migrationBuilder.DropTable(
                name: "RoleInfo");

            migrationBuilder.DropTable(
                name: "UserInfo");
        }
    }
}
