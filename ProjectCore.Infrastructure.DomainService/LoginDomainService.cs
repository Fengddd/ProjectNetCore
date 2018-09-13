
using Microsoft.IdentityModel.Tokens;
using ProjectCore.Common;
using ProjectCore.Domain.Model.Entity;
using ProjectCore.Domain.Repository.Interfaces;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using ProjectCore.Common.RedisHelper;
using ProjectCore.Domain.DomainService;

namespace ProjectCore.Infrastructure.DomainService
{
    /// <summary>
    /// 登录领域服务
    /// </summary>
    public class LoginDomainService : ILoginDomainService
    {
       
        private readonly IBaseRepository<UserInfo> _userRepository;
        private readonly JwtSettings _jwtSettings;
        public LoginDomainService(IBaseRepository<UserInfo> userRepository, IOptions<JwtSettings> jwtSettingsAccesser)
        {
            _userRepository = userRepository;
            _jwtSettings = jwtSettingsAccesser.Value;
        }

        /// <summary>
        /// 登录验证
        /// </summary>
        /// <param name="username"></param>
        /// <param name="password"></param>
        /// <returns></returns>
        public async Task<HeaderResult<string>> VerificationUserLogin(string username, string password)
        {         
            var user = await _userRepository.WhereLoadEntityAsNoTrackingAsync(e => e.UserName == username);
            if (user != null)
            {
                if (user.IsDisable == true)
                {
                    return new HeaderResult<string> { IsSucceed = false, Message = "用户处于禁用状态！" };
                }
                var userPwd = user.UserPassword;
                if (userPwd == password)
                {
                    JwtClaimConfiguration con = new JwtClaimConfiguration();
                    var claim = new Claim[]
                    {
                        new Claim("userId", user.Id.ToString()),
                        new Claim("userName", user.UserName)

                    };

                    //对称秘钥
                    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.SecretKey));
                    //签名证书(秘钥，加密算法)
                    var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                    //生成token  [注意]需要nuget添加Microsoft.AspNetCore.Authentication.JwtBearer包，并引用System.IdentityModel.Tokens.Jwt命名空间
                    var token = new JwtSecurityToken(_jwtSettings.Issuer, _jwtSettings.Audience, claim, DateTime.Now,
                        DateTime.Now.AddMinutes(30), creds);
                    var jwtToken = new JwtSecurityTokenHandler().WriteToken(token);
                    var jwtSecurityToken = new JwtSecurityTokenHandler().ReadJwtToken(jwtToken);
                    //用redis缓存每一个用户的Token

                    RedisHelper.SetStringKey(user.Id.ToString() + "Token", jwtToken);
               
                    //开启一个异步线程获取权限缓存到Redis中
                    Thread thread=new Thread(new ThreadStart(SetRedisPermission));
                
                    thread.Start();
                   
                    return new HeaderResult<string> { IsSucceed = true, Message = "登录成功！" , Result= jwtToken };
                }
                else
                {
                    return new HeaderResult<string> { IsSucceed = false, Message = "密码错误！" };
                }
            }
            else
            {
                return new HeaderResult<string> { IsSucceed = false, Message = "用户名错误！" };
            }

        }

        /// <summary>
        /// 获取权限放到Redis中
        /// </summary>
        public void SetRedisPermission()
        {
            //var userPermission = _userRepository.GetModeListlBySql(@"SELECT DISTINCT ro.Id FROM UserInfo u 
            //LEFT JOIN UserUnGroupInfo ug ON u.Id = ug.UserId
            //LEFT JOIN UserGroupInfo g ON ug.UserGroupId = g.Id
            //LEFT JOIN UserGroupUnRoleInfo ugr ON g.Id = ugr.UserGroupId
            //LEFT JOIN RoleInfo r ON ugr.RoleId = r.Id
            //LEFT JOIN UserUnRoleInfo ur ON u.Id = ur.UserId
            //LEFT JOIN RoleInfo ro ON ur.RoleId = ro.Id");
            var user= _userRepository.LoadEntityAll();           
            RedisHelper.HashSet("user88", user,e=>e.UserName);         
        }

    }
}
