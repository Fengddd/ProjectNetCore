using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using ProjectCore.Common;

namespace ProjectCore.WebApi.Filter
{
    /// <summary>
    /// 模型验证
    /// </summary>
    public class ModelVerificationFilter : IActionFilter
    {
        public void OnActionExecuted(ActionExecutedContext context)
        {
            throw new NotImplementedException();
        }
        /// <summary>
        /// Action执行前,验证Dto的错误信息
        /// </summary>
        /// <param name="context"></param>
        public void OnActionExecuting(ActionExecutingContext context)
        {
            var message ="";
            if (!context.ModelState.IsValid)
            {
                foreach (var item in context.ModelState.Values)
                {
                    foreach (var error in item.Errors)
                    {
                       message += error.ErrorMessage;
                    }
                }
            }

            context.Result = new JsonResult(new HeaderResult<string>
            {
                IsSucceed = false,
                Message = message
            });
        }
    }
}
