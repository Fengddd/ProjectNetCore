using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using ProjectCore.Common.DomainInterfaces;

namespace ProjectCore.Domain.Model.Entity
{
    /// <summary>
    /// 用户角色信息
    /// </summary>
    public class UserUnRole:IAggregationRoot
    {
        
        /// <summary>
        /// 角色标识
        /// </summary>
        public Guid Id { get; set; }
        /// <summary>
        /// 用户Id
        /// </summary>
        public Guid UserId { get;private set; }
        /// <summary>
        /// 角色Id
        /// </summary>
        public Guid RoleId { get;private set; }
        [ForeignKey("UserId")]
        public UserInfo UserInfo { get; set; }
        [ForeignKey("RoleId")]
        public RoleInfo RoleInfo { get; set; }

      
        /// <summary>
        /// 用户角色构造函数
        /// </summary>
        /// <param name="userId">用户Id</param>
        /// <param name="roleId">角色Id</param>
        public UserUnRole(Guid userId, Guid roleId)
        {
            UserId = userId;
            RoleId = roleId;
        }

        public UserUnRole()
        {

        }

        /// <summary>
        /// 分配角色
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="roleId"></param>
        /// <returns></returns>
        public UserUnRole CreateUserUnRole(Guid userId, Guid roleId)
        {
            return new UserUnRole(userId, roleId);
        }

    }
}
