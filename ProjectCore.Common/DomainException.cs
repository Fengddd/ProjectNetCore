using System;
using System.Collections.Generic;
using System.Text;

namespace ProjectCore.Common
{
    /// <summary>
    /// 领域层业务异常
    /// </summary>
    public class DomainException:Exception
   {
       public DomainException(string msg) : base(msg)
       {

       }
   }
}
