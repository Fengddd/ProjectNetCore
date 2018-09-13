using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using ProjectCore.Common;

namespace ProjectCore.EntityFrameworkCore
{
    public class DbContextFactory : IDesignTimeDbContextFactory<MyContext>
    {      
        public MyContext CreateDbContext(string[] args)
        {         
            var builder = new DbContextOptionsBuilder<MyContext>();
            //读取appsettings.json的数据库连接字符串
            var connection = JsonConfigurationHelper.GetAppSettings<ConnectionService>("appsettings.json", "ConnectionService");

            builder.UseSqlServer(connection.ConnectionSqlService);
          
            return new MyContext(builder.Options);
        }

    }
}
