using System.IO;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Configuration.Json;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;


namespace ProjectCore.Common
{
    public static class JsonConfigurationHelper
    {
        /// <summary>
        /// 读取配置文件的信息
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="fileName">要读取json的名称</param>
        /// <param name="key">要读取的json节点名称</param>
        /// <returns></returns>
        public static T GetAppSettings<T>(string fileName,string key) where T : class, new()
        {
            //获取根目录的路径
            var url = Directory.GetCurrentDirectory();
            IConfiguration config = new ConfigurationBuilder()
                .SetBasePath(url)
                .Add(new JsonConfigurationSource { Path =fileName, Optional = false, ReloadOnChange = true })
                .Build();
       
            var appconfig = new ServiceCollection()
                .AddOptions()
                .Configure<T>(config.GetSection(key))
                .BuildServiceProvider()
                .GetService<IOptions<T>>()
                .Value;
          
            return appconfig;
        }


        public static string GetJson(string jsonPath,string key)
        {
            IConfiguration config = new ConfigurationBuilder().AddJsonFile(jsonPath).Build(); //json文件地址
            string s = config.GetSection(key).Value; //json某个对象
            return s;
        }
    }
}
