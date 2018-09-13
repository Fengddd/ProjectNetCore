using System;
using System.Collections.Generic;
using System.Text;

namespace ProjectCore.Application.AppUser.Dto
{
   public class UserUnGroupDto
    {
        /// <summary>
        /// 用户组标识
        /// </summary>
        public Guid Id { get; set; }
        /// <summary>
        /// 用户Id
        /// </summary>
        public Guid UserId { get; set; }
        /// <summary>
        /// 用户组Id
        /// </summary>
        public Guid UserGroupId { get; set; }
    }
}
