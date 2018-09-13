using System;
using System.Reflection;
using System.Threading.Tasks;
using Autofac;
using Autofac.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Moq;
using ProjectCore.Common.DomainInterfaces;
using ProjectCore.Common.IocHelper;
using ProjectCore.Domain.Repository.Interfaces;
using ProjectCore.EntityFrameworkCore;
using ProjectCore.Infrastructure.Repository;
using Unity;
using Xunit;

namespace XUnitTestDemo
{
    public class UnitTest1
    {
    
        private static IContainer Container { get; set; }
        public UnitTest1()
        {
            IServiceCollection services=new ServiceCollection();

            services.RegisterAssembly("ProjectCore.Domain.Repository.Interfaces", "ProjectCore.Infrastructure.Repository");
            services.RegisterAssembly("ProjectCore.Application");
            services.RegisterAssembly("ProjectCore.Domain.DomainService");
            services.AddTransient(typeof(IBaseRepository<>), typeof(BaseRepository<>));
            services.AddTransient<IMyContext, MyContext>();
        
            services.AddDbContext<MyContext>(options => options.UseSqlServer("Data Source=DESKTOP-0022CQ5\\LI;Initial Catalog=MyNetCoreProject;User ID=sa;Password=123456;MultipleActiveResultSets=true"));
            //Autofac依赖注入 Class的后面名字必须一致才能注入
            var builder = new ContainerBuilder();
            builder.Populate(services);           
            Container = builder.Build();
            var c= new AutofacServiceProvider(Container); 
            
            //_shoppingCartAppService = Container.Resolve<IShoppingCartAppService>();
        }

     

      
    }
}
