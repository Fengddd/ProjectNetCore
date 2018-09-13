using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Rewrite.Internal.UrlActions;
using ProjectCore.Common;

namespace ProjectCore.WebApi.Filter
{
    public class ProjectExceptionFilter : IExceptionFilter
    {
        public void OnException(ExceptionContext context)
        {
            Exception exception = context.Exception;
            var exceptionType = exception.GetType().ToString();
            if (exceptionType == "ProjectCore.Common.DomainException")
            {
                //用来分类处理业务逻辑
            }

            //获取controller的名称
            var controller = context.RouteData.Values["controller"].ToString();
            //获取Action的名称
            var action = context.RouteData.Values["Action"].ToString();

            var errorPath = controller + "/" + action;

            LogHelper.LogError("web service error:" + errorPath, exception);

            //返回错误码
            var statusCode = context.HttpContext.Response.StatusCode;
          
            context.Result = new JsonResult(new HeaderResult<string>
            {
                Message = "错误路径:" + errorPath + ":错误信息" + exception.Message+"",
                IsSucceed = false
            });         
            //异常已处理了
            context.ExceptionHandled = true;          
        }
    }
}
