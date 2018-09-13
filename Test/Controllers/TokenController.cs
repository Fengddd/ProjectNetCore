using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using ProjectCore.Common;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Test.Controllers
{
    [Route("api/[controller]/[Action]")]
    [EnableCors("any")]
    [ApiController]
    public class TokenController : ControllerBase
    {
        private readonly JwtSettings _jwtSettings;

        public TokenController(IOptions<JwtSettings> jwtSettingsAccesser)
        {
            _jwtSettings = jwtSettingsAccesser.Value;
        }

        [HttpPost]
        public AccessResult<string> GetSignatureToken()
        {
            if (ModelState.IsValid) //判断是否合法
            {
                var claim = new Claim[]
                {
                    new Claim(ClaimTypes.Name, "lbb"),
                    new Claim(ClaimTypes.Role, "admin")
                };

                //对称秘钥
                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.SecretKey));
                //签名证书(秘钥，加密算法)
                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                //生成token  [注意]需要nuget添加Microsoft.AspNetCore.Authentication.JwtBearer包，并引用System.IdentityModel.Tokens.Jwt命名空间
                var token = new JwtSecurityToken(_jwtSettings.Issuer, _jwtSettings.Audience, claim, DateTime.Now,
                    DateTime.Now.AddMinutes(30), creds);
                var jwtToken = new JwtSecurityTokenHandler().WriteToken(token);
                var cd= new JwtSecurityTokenHandler().ReadJwtToken(jwtToken);
             
                return new AccessResult<string>
                {
                    Result = jwtToken,
                    IsSucceed = true
                };
              

            }
            return new AccessResult<string>
            {
                Message = "错误",
                IsSucceed = false
            };

        }
    }
}
