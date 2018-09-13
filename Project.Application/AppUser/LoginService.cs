using ProjectCore.Common;
using ProjectCore.Domain.DomainService;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using ProjectCore.Application.AppUser.Dto;
using ProjectCore.Domain.Model.Entity;
using ProjectCore.Domain.Repository.Interfaces;

namespace ProjectCore.Application.AppUser
{
    /// <summary>
    /// 登录
    /// </summary>
    public class LoginService: ILoginService
    {
        private readonly IBaseRepository<UserInfo> _userRepository;
        private readonly ILoginDomainService _loginDomainService;

        public LoginService(IBaseRepository<UserInfo> userRepository, ILoginDomainService loginDomainService)
        {
            _userRepository = userRepository;
            _loginDomainService = loginDomainService;
        }



        /// <summary>
        /// 用户登录
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task<HeaderResult<string>> VerificationUserLogin(UserModelDto input)
        {
            var result = await _loginDomainService.VerificationUserLogin(input.Username, input.Password);
           
            return result;
        }
    }
}
