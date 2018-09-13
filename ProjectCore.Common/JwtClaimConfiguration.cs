using System;
using System.Collections.Generic;
using System.Text;

namespace ProjectCore.Common
{
    /// <summary>
    /// Jwt Clain储存的数据配置
    /// </summary>
    public class JwtClaimConfiguration
    {
        /// <summary>
        /// 用户的唯一标识（用于存或者缓存）
        /// </summary>
        public string UserId { get; set; }
        public string UserName{ get; set; }
    }
}
