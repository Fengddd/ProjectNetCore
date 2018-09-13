using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using ProjectCore.Common.DomainInterfaces;

namespace ProjectCore.Domain.Model.Entity
{
    /// <summary>
    /// 用户组
    /// </summary>
    public class UserGroupInfo:IAggregationRoot, ISoftDelete
    {
        
        /// <summary>
        /// 用户组标识
        /// </summary>
        public Guid Id { get; set; }
        /// <summary>
        /// 用户组名称
        /// </summary>
        [Required]
        [StringLength(50)]
        public string UserGroupName { get;private set; }
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
        ///  用户和用户组（多对多）
        /// </summary>
        public List<UserUnGroup> UserUnGroupList { get; set; }

        /// <summary>
        /// 用户组和角色（多对多）
        /// </summary>
        public List<UserGroupUnRole> UserGroupUnRoleList { get; set; }

        /// <summary>
        /// 用户组构造函数
        /// </summary>
        /// <param name="userGroupName"></param>
        /// <param name="createUserId"></param>
        /// <param name="createUserName"></param>
        public UserGroupInfo(string userGroupName, Guid createUserId, string createUserName)
        {
            if (string.IsNullOrEmpty(userGroupName))
            {
                throw new ArgumentException("用户组名称不能为空！");
            }
            UserGroupName = userGroupName;
            CreateUserId = Guid.NewGuid();
            CreateUserName = "小李";
            CreatDateTime = DateTime.Now;
            IsDeleted = false;
        }

        public UserGroupInfo()
        {

        }
       
        /// <summary>
        /// 创建用户组
        /// </summary>
        /// <param name="userGroupName">用户组名称</param>
        /// <param name="createUserId">创建人Id</param>
        /// <param name="createUserName">创建人名称</param>
        /// <returns></returns>
        public UserGroupInfo CreateUserGroup(string userGroupName, Guid createUserId, string createUserName)
        {
            return new UserGroupInfo(userGroupName, createUserId, createUserName);
        }

        /// <summary>
        /// 修改用户组
        /// </summary>
        /// <param name="userGroupName"></param>
        /// <returns></returns>
        public void EditUserGroup(string userGroupName)
        {
            if (string.IsNullOrEmpty(userGroupName))
            {
                throw new ArgumentException("用户组名称不能为空！");
            }
            this.UserGroupName = userGroupName;
        }

        /// <summary>
        /// 删除用户组
        /// </summary>     
        /// <returns></returns>
        public void DelUserGroup()
        {          
            this.IsDeleted = true;
        }

    }
}
