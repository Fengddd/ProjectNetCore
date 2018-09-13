using System;
using System.ComponentModel.DataAnnotations;
using ProjectCore.Common;
using ProjectCore.Common.IocHelper;
using ProjectCore.Domain.Model.ValueObject;

namespace ProjectCore.Application.AppUser.Dto
{
    public class UserDto
    {
        #region 用户属性
        /// <summary>
        /// 用户标识
        /// </summary>
        public Guid Id { get; set; }
        /// <summary>
        /// 用户名
        /// </summary>
        public string UserName { get; set; }
        /// <summary>
        /// 用户密码
        /// </summary>
        public string UserPassword { get; set; }
        /// <summary>
        /// 用户手机号码
        /// </summary>
        public string UserPhone { get; set; }
        /// <summary>
        /// 用户地址
        /// </summary>
        public Address Address { get; set; } 
        /// <summary>
        /// 创建时间
        /// </summary>
        public DateTime CreatDateTime { get; set; }
        /// <summary>
        /// 是否删除
        /// </summary>
        public bool IsDelete { get; set; }
        /// <summary>
        /// 是否禁用
        /// </summary>
        public bool IsDisable { get; set; }
       

        #endregion
    }

    /// <summary>
    /// 请求查询
    /// </summary>
    public class SearchUserDto : Pagination
    {
        /// <summary>
        /// 搜索名称
        /// </summary>
        public string SearchName { get; set; }
        /// <summary>
        /// 搜索密码
        /// </summary>
        public string SearchPwd { get; set; }
    }

    /// <summary>
    /// 登录
    /// </summary>
    public class UserModelDto
    {
        /// <summary>
        /// 用户名
        /// </summary>
        [Required]
        public string Username { get; set; }
        /// <summary>
        /// 用户密码
        /// </summary>
        [Required]
        public string Password { get; set; }
    }

}
