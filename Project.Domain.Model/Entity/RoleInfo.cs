using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using ProjectCore.Common;
using ProjectCore.Common.DomainInterfaces;

namespace ProjectCore.Domain.Model.Entity
{
    /// <summary>
    /// 角色信息
    /// </summary>
    public class RoleInfo:IAggregationRoot, ISoftDelete
    {       
        /// <summary>
        /// 角色标识
        /// </summary>
        public Guid Id { get; set; }
        /// <summary>
        /// 角色名称
        /// </summary>
        [Required]
        [StringLength(50)]
        public string RoleName { get;private set; }
        /// <summary>
        /// 角色类型
        /// </summary>
        [StringLength(50)]
        public string RoleType { get;private set; }
        /// <summary>
        /// 角色描述
        /// </summary>
        [StringLength(1000)]
        public string RoleDescription { get;private set; }
        /// <summary>
        /// 角色排序
        /// </summary>
        public int RoleShot { get;private set; }
        /// <summary>
        /// 创建人id
        /// </summary>
        public Guid CreateUserId { get; private set; }
        /// <summary>
        /// 创建人名称
        /// </summary>
        [StringLength(50)]
        public string CreateUserName { get; private set; }
        /// <summary>
        /// 创建时间
        /// </summary>
        public DateTime CreatDateTime { get; private set; }
        /// <summary>
        /// 是否删除
        /// </summary>
        public bool IsDeleted { get; set; }

        /// <summary>
        /// 用户和角色（多对多）
        /// </summary>
        public List<UserUnRole> UserUnRoleList { get; set; }
        
        /// <summary>
        /// 用户组和角色（多对多）
        /// </summary>
        public List<UserGroupUnRole> UserGroupUnRoleList { get; set; }
    
        /// <summary>
        /// 角色构造函数
        /// </summary>
        /// <param name="roleName">角色名称</param>
        /// <param name="roleType">角色类型</param>
        /// <param name="roleDescription">角色描述</param>
        /// <param name="roleShot">角色排序</param>
        ///// <param name="createUserId">创建人</param>
        ///// <param name="createUserName">创建人名称</param>
        public RoleInfo(string roleName, string roleType, string roleDescription, int roleShot)
        {
            if (string.IsNullOrEmpty(roleName))
            {
                throw new ArgumentException("角色名称不能为空！");
            }
            if (string.IsNullOrEmpty(roleType))
            {
                throw new ArgumentException("角色类型不能为空！");
            }
            if (string.IsNullOrEmpty(roleDescription))
            {
                throw new ArgumentException("角色描述不能为空！");
            }
            RoleName = roleName;
            RoleType = roleType;
            RoleDescription = roleDescription;
            RoleShot = roleShot;
            CreateUserId = Guid.NewGuid();
            CreateUserName = "李锋";
            CreatDateTime = DateTime.Now;
            IsDeleted = false;
        }

        public RoleInfo()
        {

        }

        /// <summary>
        /// 创建角色
        /// </summary>
        /// <param name="roleName">名称</param>
        /// <param name="roleType">类型</param>
        /// <param name="roleDescription">描述</param>
        /// <param name="roleShot">排序</param>
        /// <returns></returns>
        public RoleInfo CreateRole(string roleName, string roleType, string roleDescription, int roleShot)
        {
            return new RoleInfo(roleName, roleType, roleDescription, roleShot);
        }

        /// <summary>
        /// 修改角色
        /// </summary>
        /// <param name="roleName">名称</param>
        /// <param name="roleType">类型</param>
        /// <param name="roleDescription">描述</param>
        public void EditRole(string roleName, string roleType, string roleDescription)
        {
            if (string.IsNullOrEmpty(roleName))
            {
                throw new ArgumentException("角色名称不能为空！");
            }
            if (string.IsNullOrEmpty(roleType))
            {
                throw new ArgumentException("角色类型不能为空！");
            }
            if (string.IsNullOrEmpty(roleDescription))
            {
                throw new ArgumentException("角色描述不能为空！");
            }
            this.RoleName = roleName;
            this.RoleType = roleType;
            this.RoleDescription = roleDescription;          
        }

        /// <summary>
        /// 删除角色
        /// </summary>
        public void DelRole()
        {
            this.IsDeleted = true;
        }



    }
}
