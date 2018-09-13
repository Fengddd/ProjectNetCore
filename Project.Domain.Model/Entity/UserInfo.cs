using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using ProjectCore.Common.DomainInterfaces;
using ProjectCore.Domain.Model.ValueObject;

namespace ProjectCore.Domain.Model.Entity
{
    /// <summary>
    /// 用户信息
    /// </summary>
    public class UserInfo : IAggregationRoot, ISoftDelete
    {      
        #region 用户属性

        /// <summary>
        /// 用户标识
        /// </summary>
        public Guid Id { get; set; }
        /// <summary>
        /// 用户名
        /// </summary>
        [Required]
        [StringLength(50)]
        public string UserName { get;private set; }
        /// <summary>
        /// 用户密码
        /// </summary>
        [Required]
        [StringLength(50)]
        public string UserPassword { get;private set; }
        /// <summary>
        /// 用户手机号码
        /// </summary>
        [StringLength(50)]
        public string UserPhone { get;private set; }
        /// <summary>
        /// 用户地址
        /// </summary>
        public Address Address { get; private set; }
        /// <summary>
        /// 创建人id
        /// </summary>
        public Guid CreateUserId { get; private set; }
        /// <summary>
        /// 创建人名称
        /// </summary>
        [StringLength(50)]
        public string CreateUserName{ get; private set; }
        /// <summary>
        /// 创建时间
        /// </summary>
        public DateTime CreatDateTime { get; private set; }
        /// <summary>
        /// 是否删除
        /// </summary>
        public bool IsDeleted { get; set; }
        /// <summary>
        /// 是否禁用
        /// </summary>
        public bool IsDisable { get; private set; }
        /// <summary>
        /// 用户和用户组（多对多）
        /// </summary>
        public List<UserUnGroup> UserUnGroupList { get; set; }
        /// <summary>
        /// 用户和角色（多对多）
        /// </summary>
        public List<UserUnRole> UserUnRoleList { get; set; }
      
        #endregion
        /// <summary>
        /// 用户构造
        /// </summary>
        /// <param name="userName">用户名</param>
        /// <param name="userPassword">密码</param>
        /// <param name="userPhone">电话</param>
        /// <param name="address">地址</param>
        /// <param name="createUserId">创建人</param>
        /// <param name="createUserName">创建人名称</param>
        public UserInfo(string userName, string userPassword, string userPhone, Address address, Guid createUserId, string createUserName)
        {
            Id = Guid.NewGuid();
            UserName = userName;
            UserPassword = userPassword;
            UserPhone = userPhone;
            Address = address;
            CreateUserId = createUserId;
            CreateUserName = createUserName;
            CreatDateTime = DateTime.Now;
            IsDeleted = false;
            IsDisable = false;
        }

        public UserInfo()
        {

        }

        /// <summary>
        /// 用户分配用户组
        /// </summary>
        public void AssignUserGroups()
        {

        }

    }
}
