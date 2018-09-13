using System;
using System.IO;
using log4net;
using log4net.Config;
using log4net.Repository;

namespace ProjectCore.WebApi.Filter
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

        public static void LogError(string msg, Exception ex)
        {
            string errorMsg = string.Format("【抛出信息】：{0} <br/>【异常类型】：{1} <br/>【异常信息】：{2} <br/>【堆栈调用】：{3}", new object[] { msg,
                ex.GetType().Name, ex.Message, ex.StackTrace });
            errorMsg = errorMsg.Replace("\r\n", "<br>");
            errorMsg = errorMsg.Replace("位置", "<strong style=\"color:red\">位置</strong>");         
            LogHelper._logger.Error(errorMsg);
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
