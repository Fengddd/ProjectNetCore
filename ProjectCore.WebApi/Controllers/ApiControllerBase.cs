using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ProjectCore.Common;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ProjectCore.WebApi.Controllers
{
    /// <summary>
    /// ApiControllerBase
    /// </summary>
    public class ApiControllerBase : ControllerBase
    {
        // ReSharper disable once InconsistentNaming
        public HeaderResult<object> Result;
        public ApiControllerBase()
        {
            Result = new HeaderResult<object>();
        }
    }
}
