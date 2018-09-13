using Microsoft.EntityFrameworkCore.Storage;
using StackExchange.Redis;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ProjectCore.Common.RedisHelper
{
    /// <summary>
    ///  单例模式获取redis连接实例
    /// </summary>
    public class RedisManager
    {
        private RedisManager()
        {

        }

        private static ConnectionMultiplexer _instance;
        private static readonly object Locker = new object();
        /// <summary>
        /// 单例模式获取redis连接实例
        /// </summary>      
        public static ConnectionMultiplexer Instance()
        {
            //读取appsettings.json的数据库连接字符串
            var connection = JsonConfigurationHelper.GetAppSettings<ConnectionService>("appsettings.json", "ConnectionService");
            
            lock (Locker)
            {             
                if (_instance == null)
                {
                    if (_instance == null)
                        _instance =ConnectionMultiplexer.Connect(connection.ConnectionRedis);
                }
            }
            return _instance;
        }

    }
}
