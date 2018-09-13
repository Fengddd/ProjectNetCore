using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace ProjectCore.Web.Filter
{
    public class ProjectExceptionFilter : IExceptionFilter
    {
        public void OnException(ExceptionContext context)
        {
            Exception exception = context.Exception;          
            
            //获取controller的名称
            var controller = context.RouteData.Values["controller"].ToString();
            //获取Action的名称
            var action = context.RouteData.Values["Action"].ToString();

            var errorPath = controller + "/" + action;

            LogHelper.LogError("web service error:" + errorPath, exception);

            //返回错误码
            var statusCode = context.HttpContext.Response.StatusCode;
            var statusCode1 = exception.HResult;
            if (statusCode == 401)
            {
            }
            else if (statusCode == 404)
            {
            }
            else if (statusCode == 502)
            {
            }
            else if (statusCode != 200)
            {
            }

            context.Result = new JsonResult(new {code= 0 ,msg= "错误路径:"+ errorPath + "错误编码"+ statusCode + "错误信息" + exception.Message+ "" });
            

        }
    }
}
