using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using ProjectCore.Common;

namespace ProjectCore.Domain.DomainService
{
   public interface ILoginDomainService
   {
       Task<HeaderResult<string>> VerificationUserLogin(string username, string password);
   }
}
