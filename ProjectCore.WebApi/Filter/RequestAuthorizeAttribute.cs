using System;
using System.Collections;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using ProjectCore.Application.AppUser.Dto;
using ProjectCore.Common;
using StackExchange.Redis.Extensions.Core.Extensions;

namespace ProjectCore.WebApi.Filter
{
    /// <summary>
    /// 验证Jwt的信息
    /// </summary>
    public class RequestAuthorizeAttribute : AuthorizeAttribute, IAuthorizationFilter
    {    
        public void OnAuthorization(AuthorizationFilterContext context)
        {
         
            //从http请求的头里面获取身份验证信息，验证Jwt
            var jwtKey = context.HttpContext.Request.Headers["Authorization"].ToString();
            //var a = jwtKey.Substring(7);
            //var jwtSecurityToken = new JwtSecurityTokenHandler().ReadJwtToken(a);
            //var c = jwtSecurityToken.Claims;
            //context.HttpContext.Items.Add("ceshi", c);
         
          
            //if (!string.IsNullOrEmpty(jwtKey))
            //{

            //    context.HttpContext.Request.Headers.Add("ddd","ddd");
            //}
            ////如果取不到身份验证信息，并且不允许匿名访问，则返回未验证401
            //else
            //{
            //    context.Result = new JsonResult(new HeaderResult<string>
            //    {
            //        IsSucceed = false,
            //        Message = "请求未授权",
            //        StatusCode = HttpStatusCode.Unauthorized.GetHashCode().ToString()
            //    });
            //}
        }
    }
}
