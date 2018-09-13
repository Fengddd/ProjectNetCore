using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.EntityFrameworkCore;
using Autofac;
using Autofac.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Autofac.Extensions.DependencyInjection;
using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.DataAnnotations.Internal;
using ProjectCore.Web.Filter;
using ProjectCore.Web.Middleware;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using Microsoft.Extensions.DependencyInjection.Extensions;

using Microsoft.AspNetCore.Mvc;

namespace ProjectCore.Web
{
    public class Startup
    {
        public Startup(IConfiguration configuration, IHostingEnvironment env)
        {
            //Configuration = configuration;
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                //.AddJsonFile("autofac.json")//读取autofac.json文件
                .AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        //public IConfiguration Configuration { get; }
        public IConfigurationRoot Configuration { get; }
        //依赖注入的属性
        public IContainer Container { get; private set; }
        // This method gets called by the runtime. Use this method to add services to the container.
        public IServiceProvider ConfigureServices(IServiceCollection services)
        {
            services.Configure<CookiePolicyOptions>(options =>
            {
                // This lambda determines whether user consent for non-essential cookies is needed for a given request.
                options.CheckConsentNeeded = context => true;
                options.MinimumSameSitePolicy = SameSiteMode.None;
            });
            services.AddMvc()
                .SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

            //添加session
            services.AddDistributedMemoryCache();
            services.AddSession();
            services.TryAddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddOptions();
            //这里就是填写数据库的链接字符串          
            var connection = Configuration.GetSection("ConnectionService")["ConnectionSqlService"];          
            return services.Configure(connection, this.Configuration);

            #region MyRegion

            //services.AddDbContext<MyContext>(options => options.UseSqlServer(connection));
            ////FluentValidation后台验证
            //services.AddTransient<IValidator<UserInfo>, UserInfoValidator>();
            ////MyContext的依赖注入
            //services.AddTransient<IMyContext, MyContext>();
            //services.AddTransient<IUnitOfWork,UnitOfWork>();          
            //services.AddTransient<IJsApplyInformationService, JsApplyInformationService>();
            //services.AddTransient(typeof(IBaseRepository<>), typeof(BaseRepository<>));
            //services.AddMvc(options =>
            //{                
            //    options.Filters.Add(typeof(ProjectExceptionFilter)); // 异常过滤器 
            //    options.Filters.Add(typeof(ProjectActionFilter)); // 异常过滤器
            ////}).AddFluentValidation(fv =>
            ////{
            ////    //关闭或开启自带的验证  AddFluentValidation使用FluentValidation验证
            ////    fv.ConfigureClientsideValidation(enabled: true);
                
            //});
            ////通过反射进行依赖注入
          
            //services.RegisterAssembly("ProjectCore.Domain.Repository.Interfaces", "ProjectCore.Infrastructure.Repository");
            //services.RegisterAssembly("ProjectCore.Application");
            ////Autofac依赖注入 Class的后面名字必须一致才能注入
            //var builder = new ContainerBuilder();
            //builder.Populate(services);
            //var module = new ConfigurationModule(Configuration);
            //builder.RegisterModule(module);
            //this.Container = builder.Build();
            //return new AutofacServiceProvider(this.Container);

            #endregion
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, IApplicationLifetime appLifetime)
        {
            
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
           
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                app.UseHsts();
            }
            app.UseSession();
            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseCookiePolicy();

            app.UseMvc(routes =>
                {
                    routes.MapRoute(
                        name: "default",
                        template: "{controller=ShoppingCart}/{action=Index}/{id?}");

                    routes.MapRoute(
                        name: "areas",
                        template: "{area:exists}/{controller=Home}/{action=Index}/{id?}");
                });
         
            appLifetime.ApplicationStopped.Register(() => this.Container.Dispose());
         
        }



    }
}
