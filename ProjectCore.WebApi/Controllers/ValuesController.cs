using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Authorization;
using ProjectCore.Common;

namespace ProjectCore.WebApi.Controllers
{
      
    [EnableCors("any")]
    [Route("api/[controller]/[Action]")]
    public class ValuesController : ApiControllerBase
    {
        // GET api/values
        [HttpGet]
    
        public HeaderResult<IEnumerable<string>> Get()
        {
            var a = 0;
            var b = 0;
            var c = a / b;
            return new HeaderResult<IEnumerable<string>>();
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public ActionResult<string> Get(int id)
        {
            return "value";
        }

        // POST api/values/Post
        [Authorize]
        [HttpPost]
        public string Post(string value)
        {
            return "dddddd";
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
