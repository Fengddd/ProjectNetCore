using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using ProjectCore.Application.AppUser.Dto;
using ProjectCore.Common;

namespace ProjectCore.Application.AppUser
{
   public interface ILoginService
   {
       Task<HeaderResult<string>> VerificationUserLogin(UserModelDto input);
   }
}
