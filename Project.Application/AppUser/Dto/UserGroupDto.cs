using System;
using System.Collections.Generic;
using System.Text;

namespace ProjectCore.Application.AppUser.Dto
{
    /// <summary>
    /// 用户组Dto
    /// </summary>
    public class UserGroupDto
    {
        /// <summary>
        /// 用户组标识
        /// </summary>
        public Guid Id { get; set; }
        /// <summary>
        /// 用户组名称
        /// </summary>
        public string UserGroupName { get; set; }
        /// <summary>
        /// 创建人id
        /// </summary>
        public Guid CreateUserId { get; set; }
        /// <summary>
        /// 创建人名称
        /// </summary>
        public string CreateUserName { get; set; }
        /// <summary>
        /// 创建时间
        /// </summary>
        public DateTime CreatDateTime { get; set; }
        /// <summary>
        /// 是否删除
        /// </summary>
        public bool IsDelete { get; set; }
    }
}
