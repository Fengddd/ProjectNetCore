using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using ProjectCore.Common;
using ProjectCore.Common.IocHelper;

namespace ProjectCore.Application.AppUser.Dto
{
    /// <summary>
    /// 角色
    /// </summary>
    public class RoleDto
    {
        /// <summary>
        /// 角色标识
        /// </summary>
        public Guid Id { get; set; }
        /// <summary>
        /// 角色名称
        /// </summary>
        [Required]
        public string RoleName { get; set; }
        /// <summary>
        /// 角色类型
        /// </summary>
        public string RoleType { get; set; }
        /// <summary>
        /// 角色描述
        /// </summary>
        public string RoleDescription { get; set; }
        /// <summary>
        /// 角色排序
        /// </summary>
        public int RoleShot { get; set; }
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

    /// <summary>
    /// 查询分页角色Dto
    /// </summary>
    public class SearchRoleDto : Pagination
    {
        /// <summary>
        /// 搜索角色名称
        /// </summary>
        public string SearchRoleName { get; set; }

    }
    /// <summary>
    /// 添加角色Dto
    /// </summary>
    public class AddRoleDto
    {
        /// <summary>
        /// 角色名称
        /// </summary>
        //[Required]
        public string RoleName { get; set; }
        /// <summary>
        /// 角色类型
        /// </summary>
        [Required]
        public string RoleType { get; set; }
        /// <summary>
        /// 角色描述
        /// </summary>
        [Required]
        public string RoleDescription { get; set; }
        /// <summary>
        /// 角色Id
        /// </summary>
        public Guid? RoleId { get; set; }
    }

}
