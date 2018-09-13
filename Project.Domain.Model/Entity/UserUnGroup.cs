using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using ProjectCore.Common.DomainInterfaces;

namespace ProjectCore.Domain.Model.Entity
{
    /// <summary>
    /// 用户和用户组信息
    /// </summary>
    public class UserUnGroup:IAggregationRoot
    {
        
        /// <summary>
        /// 用户组标识
        /// </summary>
        public Guid Id { get; set; }
        /// <summary>
        /// 用户Id
        /// </summary>
        public Guid UserId { get;private set; }
        /// <summary>
        /// 用户组Id
        /// </summary>
        public Guid UserGroupId { get;private set; }

        [ForeignKey("UserId")]
        public UserInfo UserInfo { get; set; }
        [ForeignKey("UserGroupId")]
        public UserGroupInfo UserGroupInfo { get; set; }

        /// <summary>
        /// 用户和用户组信息构造函数
        /// </summary>
        /// <param name="userId">用户Id</param>
        /// <param name="userGroupId">用户组Id</param>
        public UserUnGroup(Guid userId, Guid userGroupId)
        {
            UserId = userId;
            UserGroupId = userGroupId;
        }
        public UserUnGroup()
        {

        }
        /// <summary>
        /// 分配用户组
        /// </summary>
        /// <returns></returns>
        public UserUnGroup CreateUserUnGroup(Guid userGroupId, Guid userId)
        {
            return new UserUnGroup(userId, userGroupId);
        }

    }
}
