using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using ProjectCore.Common.DomainInterfaces;

namespace ProjectCore.Domain.Model.Entity
{
    /// <summary>
    /// 用户组和角色信息
    /// </summary>
    public class UserGroupUnRole:IAggregationRoot
    {
        /// <summary>
        /// 用户组和角色标识
        /// </summary>
        public Guid Id { get; set; }
        /// <summary>
        /// 用户组Id
        /// </summary>
        public Guid UserGroupId { get;private set; }
        /// <summary>
        /// 角色Id
        /// </summary>
        public Guid RoleId { get; private set; }
        [ForeignKey("UserGroupId")]
        public UserGroupInfo UserGroupInfo { get; set; }
        [ForeignKey("RoleId")]
        public RoleInfo RoleInfo { get; set; }

        public UserGroupUnRole()
        {

        }
        /// <summary>
        /// 用户组和角色构造函数
        /// </summary>
        /// <param name="userGroupId">用户组Id</param>
        /// <param name="roleId">角色Id</param>
        public UserGroupUnRole(Guid userGroupId, Guid roleId)
        {
            UserGroupId = userGroupId;
            RoleId = roleId;
        }

        /// <summary>
        /// 分配用户组角色
        /// </summary>
        /// <param name="userGroupId"></param>
        /// <param name="roleId"></param>
        /// <returns></returns>
        public UserGroupUnRole CreateUserGroupUnRole(Guid userGroupId, Guid roleId)
        {
            return new UserGroupUnRole(userGroupId, roleId);
        }

    }
}
