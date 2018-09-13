using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using log4net;
using log4net.Config;
using log4net.Repository;

namespace ProjectCore.Web.Filter
{
    public static class LogHelper
    {
        private static ILog _logger;

        static LogHelper()
        {
            ILoggerRepository repository = LogManager.CreateRepository("NETCoreRepository");
            XmlConfigurator.Configure(repository, new FileInfo("log4net.config"));          
            LogHelper._logger = LogManager.GetLogger(repository.Name, "NETCorelog4net");
        }

        public static void LogError(string msg, Exception e)
        {
            LogHelper._logger.Error((object)msg, e);
        }

        public static void LogInfo(string msg)
        {
            LogHelper._logger.Info((object)msg);
        }

        public static void LogDebug(string msg)
        {
            LogHelper._logger.Debug((object)msg);
        }
    }
}
