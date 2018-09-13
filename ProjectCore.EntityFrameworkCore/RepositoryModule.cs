using Autofac;
using Module = Autofac.Module;

namespace ProjectCore.EntityFrameworkCore
{
    /// <summary>
    /// Autofac 程序集注入
    /// </summary>
    public class RepositoryModule: Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            //builder.RegisterType<RepositorySpeck>().As<IRepositorySpeck>();
            //builder.RegisterType<DailyRepository>().As<IDailyRepository>();
            //builder.RegisterType<MonthlyRepository>().As<IMontylyRepository>();
            //builder.RegisterType<YearlyRepository>().As<IYearlyRepository>();

            //builder.RegisterAssemblyTypes(this.ThisAssembly)
            //    .Where(t => t.Name.EndsWith("Repository<T>"))
            //    .AsImplementedInterfaces()
            //    .InstancePerLifetimeScope();
            

        }
    }
}
