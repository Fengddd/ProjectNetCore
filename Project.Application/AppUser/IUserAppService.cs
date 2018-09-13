using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using ProjectCore.Application.AppUser.Dto;
using ProjectCore.Common;
using ProjectCore.Domain.Model.Entity;

namespace ProjectCore.Application.AppUser
{
    /// <summary>
    /// 用户
    /// </summary>
    public interface IUserAppService
    {
        /// <summary>
        /// 获取用户信息
        /// </summary>
        /// <returns></returns>
        Task<HeaderResult<List<UserDto>>> GetUserList(SearchUserDto input);

        /// <summary>
        /// 获取用户组的信息
        /// </summary>
        /// <returns></returns>
        Task<HeaderResult<List<UserGroupDto>>> GetUserGroupList(SearchUserDto input);

        /// <summary>
        /// 根据条件查询用户组信息
        /// </summary>
        /// <param name="groupId"></param>
        /// <returns></returns>
        Task<HeaderResult<UserGroupDto>> GetUserGroup(Guid groupId);

        /// <summary>
        /// 添加用户组
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task<HeaderResult<string>> AddUserGroup(UserGroupDto input);

        /// <summary>
        /// 修改用户组
        /// </summary>
        /// <param name="userGroupName"></param>
        /// <param name="groupId"></param>
        /// <returns></returns>
        Task<HeaderResult<string>> EditUserGroup(string userGroupName, Guid groupId);

        /// <summary>
        /// 删除用户信息
        /// </summary>
        /// <param name="userGroupId"></param>
        /// <returns></returns>
        Task<HeaderResult<string>> DelUserGroup(string userGroupId);

        /// <summary>
        /// 分配用户组
        /// </summary>
        /// <param name="groupId"></param>
        /// <param name="userIdStr"></param>
        /// <returns></returns>
        Task<HeaderResult<string>> AssignUserGroup(Guid groupId, string userIdStr);

        /// <summary>
        /// 根据用户组Id查询用户的信息
        /// </summary>
        /// <returns></returns>      
        Task<HeaderResult<List<UserDto>>> GetUserUnGroupList(Guid groupId);

        /// <summary>
        /// 获取角色的信息
        /// </summary>
        /// <returns></returns>
        Task<HeaderResult<List<RoleDto>>> GetRoleList(SearchRoleDto input);

        /// <summary>
        /// 根据角色Id查询角色信息
        /// </summary>
        /// <param name="roleId"></param>
        /// <returns></returns>
        Task<HeaderResult<RoleDto>> GetRole(Guid roleId);

        /// <summary>
        /// 添加角色
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task<HeaderResult<string>> AddRole(AddRoleDto input);

        /// <summary>
        /// 修改角色
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task<HeaderResult<string>> EditRole(AddRoleDto input);

        /// <summary>
        /// 删除用户组
        /// </summary>
        /// <param name="roleId"></param>
        /// <returns></returns>
        Task<HeaderResult<string>> DelRole(Guid roleId);

        /// <summary>
        /// 分配角色
        /// </summary>
        /// <param name="roleId"></param>
        /// <param name="userIdStr"></param>
        /// <returns></returns>
        Task<HeaderResult<string>> AssignRole(Guid roleId, string userIdStr);

        /// <summary>
        /// 根据角色查询出已经分配的用户
        /// </summary>
        /// <param name="roleId"></param>
        /// <returns></returns>
        Task<HeaderResult<List<Guid>>> GetUserUnRoleList(Guid roleId);

        /// <summary>
        /// 分配用户组角色
        /// </summary>
        /// <param name="roleId"></param>
        /// <param name="userGroupIdStr"></param>
        /// <returns></returns>
        Task<HeaderResult<string>> AssignGroupRole(Guid roleId, string userGroupIdStr);

        /// <summary>
        /// 根据角色Id查询出已经分配的用户组
        /// </summary>
        /// <param name="roleId"></param>
        /// <returns></returns>
        Task<HeaderResult<List<Guid>>> GetUserGroupUnRoleList(Guid roleId);

    }
}
