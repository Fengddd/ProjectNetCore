using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using ProjectCore.Application.AppUser;
using ProjectCore.Application.AppUser.Dto;
using ProjectCore.Common;
using ProjectCore.Domain.Model.Entity;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ProjectCore.WebApi.Controllers
{
    [Route("api/[controller]/[Action]")]
    [EnableCors("any")]
    public class UserController : Controller
    {
        private readonly IUserAppService _userAppService;

        public UserController(IUserAppService userAppService)
        {
            _userAppService = userAppService;
        }

        /// <summary>
        /// 获取用户信息
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public async Task<HeaderResult<List<UserDto>>> GetUserList([FromBody]SearchUserDto input)
        {            
            return  await _userAppService.GetUserList(input);
        }

        /// <summary>
        /// 获取用户组信息
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public async Task<HeaderResult<List<UserGroupDto>>> GetUserGroupList([FromBody]SearchUserDto input)
        {
            return await _userAppService.GetUserGroupList(input);
        }

        /// <summary>
        /// 根据条件查询用户组信息
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<HeaderResult<UserGroupDto>> GetUserGroup(Guid groupId)
        {           
            return await _userAppService.GetUserGroup(groupId);
        }

        /// <summary>
        /// 添加用户组
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public async Task<HeaderResult<string>> AddUserGroup([FromBody]UserGroupDto input)
        {
            return await _userAppService.AddUserGroup(input);
        }

        /// <summary>
        /// 修改用户组
        /// </summary>
        /// <returns></returns>
        [HttpPut]
        public async Task<HeaderResult<string>> EditUserGroup(string userGroupName, Guid groupId)
        {          
            return await _userAppService.EditUserGroup(userGroupName, groupId);
        }

        /// <summary>
        /// 删除用户组
        /// </summary>
        /// <returns></returns>
        [HttpDelete]
        public async Task<HeaderResult<string>> DelUserGroup(string groupId)
        {
            return await _userAppService.DelUserGroup(groupId);
        }

        /// <summary>
        /// 分配用户组
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public async Task<HeaderResult<string>> AssignUserGroup(Guid groupId, string userIdStr)
        {          
            return await _userAppService.AssignUserGroup(groupId, userIdStr);
        }

        /// <summary>
        /// 根据用户组Id查询用户的信息
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<HeaderResult<List<UserDto>>> GetUserUnGroupList(Guid groupId)
        {
            return await _userAppService.GetUserUnGroupList(groupId);
        }

        /// <summary>
        /// 获取角色信息
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public async Task<HeaderResult<List<RoleDto>>> GetRoleList([FromBody]SearchRoleDto input)
        {
            return await _userAppService.GetRoleList(input);
        }

        /// <summary>
        /// 根据角色Id查询角色信息
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<HeaderResult<RoleDto>> GetRole(Guid roleId)
        {
            return await _userAppService.GetRole(roleId);
        }

        /// <summary>
        /// 添加角色
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<HeaderResult<string>> AddRole([FromBody]AddRoleDto input)
        {
            return await _userAppService.AddRole(input);
        }

        /// <summary>
        /// 修改角色
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<HeaderResult<string>> EditRole([FromBody]AddRoleDto input)
        {
            return await _userAppService.EditRole(input);
        }

        /// <summary>
        /// 删除角色
        /// </summary>
        /// <param name="roleId"></param>
        /// <returns></returns>
        [HttpDelete]
        public async Task<HeaderResult<string>> DelRole(Guid roleId)
        {
            return await _userAppService.DelRole(roleId);
        }

        /// <summary>
        /// 分配角色
        /// </summary>
        /// <param name="roleId"></param>
        /// <param name="userIdStr"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<HeaderResult<string>> AssignRole(Guid roleId, string userIdStr)
        {
            return await _userAppService.AssignRole(roleId, userIdStr);
        }

        /// <summary>
        /// 根据角色查询出已经分配的用户
        /// </summary>
        /// <param name="roleId"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<HeaderResult<List<Guid>>> GetUserUnRoleList(Guid roleId)
        {
            return await _userAppService.GetUserUnRoleList(roleId);
        }

        /// <summary>
        /// 分配角色
        /// </summary>
        /// <param name="roleId"></param>
        /// <param name="userGroupIdStr"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<HeaderResult<string>> AssignGroupRole(Guid roleId, string userGroupIdStr)
        {
            return await _userAppService.AssignGroupRole(roleId, userGroupIdStr);
        }

        /// <summary>
        /// 根据角色查询出已经分配的用户
        /// </summary>
        /// <param name="roleId"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<HeaderResult<List<Guid>>> GetUserGroupUnRoleList(Guid roleId)
        {
            return await _userAppService.GetUserGroupUnRoleList(roleId);
        }

    }
}
