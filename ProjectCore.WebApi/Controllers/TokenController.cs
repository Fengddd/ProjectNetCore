using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using DotNetCore.CAP;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using ProjectCore.Application.AppUser;
using ProjectCore.Application.AppUser.Dto;
using ProjectCore.Common;
using ProjectCore.WebApi.Filter;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ProjectCore.WebApi.Controllers
{
    [Route("api/[controller]/[Action]")]
    [EnableCors("any")]
    public class TokenController : ApiControllerBase
    {
        private readonly JwtSettings _jwtSettings;
        private readonly ILoginService _loginService;
        private readonly ICapPublisher _capBus;
        public TokenController(IOptions<JwtSettings> jwtSettingsAccesser,ILoginService loginService, ICapPublisher capBus)
        {
            _jwtSettings = jwtSettingsAccesser.Value;
            _loginService = loginService;
            _capBus = capBus;
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<HeaderResult<string>> GetSignatureToken([FromBody]UserModelDto input)
        {
            if (ModelState.IsValid)
            {
               return await _loginService.VerificationUserLogin(input);
            }

            //if (ModelState.IsValid) //判断是否合法
            //{
            //    JwtClaimConfiguration configuration = new JwtClaimConfiguration();
            //    var claim = new Claim[]
            //    {
            //        new Claim(ClaimTypes.Name, "lbb"),
            //        new Claim(ClaimTypes.Role, "admin"),
            //        new Claim(configuration.UserId, Guid.NewGuid().ToString()),
            //        new Claim(configuration.UserName, "李锋")
                                 
            //    };

            //    //对称秘钥
            //    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.SecretKey));
            //    //签名证书(秘钥，加密算法)
            //    var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            //    //生成token  [注意]需要nuget添加Microsoft.AspNetCore.Authentication.JwtBearer包，并引用System.IdentityModel.Tokens.Jwt命名空间
            //    var token = new JwtSecurityToken(_jwtSettings.Issuer, _jwtSettings.Audience, claim, DateTime.Now,
            //        DateTime.Now.AddMinutes(30), creds);
            //    var jwtToken = new JwtSecurityTokenHandler().WriteToken(token);
            //    var jwtSecurityToken = new JwtSecurityTokenHandler().ReadJwtToken(jwtToken);


            //    List<UserDto> u=new List<UserDto>();
            //    var cacheRedis = RedisHelper.RedisDatabase();
                
            //    cacheRedis.StringSet("li", 11);
            //    var c = cacheRedis.StringGet("li");
            //    return new HeaderResult<string>
            //    {
            //        Result = jwtToken,
            //        IsSucceed = true
            //    };
              

            //}
            return new HeaderResult<string>
            {
                Message = "错误",
                IsSucceed = false
            };

        }

        [HttpPost]
        //[RequestAuthorize]
      
        public void GetTest()
        {
            _capBus.Publish("ceshiCap", "我爱你");
        }

        /// <summary>
        /// 测试
        /// </summary>
        /// <param name="msg"></param>
        [HttpPost]
        [CapSubscribe("ceshiCap",Group = "88")]
        public void CheckReceivedMessage(string msg)
        {
            Console.WriteLine(msg);
        }


    }

   

}
