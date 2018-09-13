using ProjectCore.Common;
using ProjectCore.Domain.Model.Entity;
using ProjectCore.Domain.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using ProjectCore.Application.AppUser.Dto;
using ProjectCore.Domain.DomainService;
using ProjectCore.Domain.Model.ValueObject;
using System.Threading;
using Microsoft.EntityFrameworkCore;
using ProjectCore.Common.RedisHelper;
using ProjectCore.EntityFrameworkCore;

namespace ProjectCore.Application.AppUser
{
    /// <summary>
    /// 用户
    /// </summary>
    public class UserAppService : IUserAppService
    {
        private readonly IBaseRepository<UserInfo> _userRepository;
        private readonly IBaseRepository<UserGroupInfo> _userGroupRepository;
        private readonly IBaseRepository<UserUnGroup> _userUnGroupRepository;
        private readonly IBaseRepository<RoleInfo> _roleRepository;
        private readonly IBaseRepository<UserUnRole> _userUnRoleRepository;
        private readonly IBaseRepository<UserGroupUnRole> _userGroupUnRoleRepository;

        public UserAppService(IBaseRepository<UserInfo> userRepository, IBaseRepository<UserGroupInfo> userGroupRepository, IBaseRepository<UserUnGroup> userUnGroupRepository, IBaseRepository<RoleInfo> roleRepository, IBaseRepository<UserUnRole> userUnRoleRepository, IBaseRepository<UserGroupUnRole> userGroupUnRoleRepository)
        {
            _userRepository = userRepository;
            _userGroupRepository = userGroupRepository;
            _userUnGroupRepository = userUnGroupRepository;
            _roleRepository = roleRepository;
            _userUnRoleRepository = userUnRoleRepository;
            _userGroupUnRoleRepository = userGroupUnRoleRepository;
        }

        /// <summary>
        /// 获取用户的信息
        /// </summary>
        /// <returns></returns>
        public async Task<HeaderResult<List<UserDto>>> GetUserList(SearchUserDto input)
        {
            Expression<Func<UserInfo, bool>> where = e => e.IsDisable == false;
            if (!string.IsNullOrEmpty(input.SearchName))
            {
                where = where.And(e => e.UserName.Contains(input.SearchName));
            }
            if (!string.IsNullOrEmpty(input.SearchPwd))
            {
                where = where.And(e => e.UserPhone.Contains(input.SearchPwd));
            }
         
            var userList = await _userRepository.LoadEntityListAsync(where, e => e.UserName, "asc", input.PageIndex, input.Pagesize);
            var total = await _userRepository.GetEntitiesCountAsync(where);
            var userDtoList = userList.MapToList<UserInfo, UserDto>();

            HeaderResult<List<UserDto>> result = new HeaderResult<List<UserDto>>
            {
                IsSucceed = true,
                Result = userDtoList,
                Total = total
            };
            return result;
        }

        /// <summary>
        /// 获取用户组的信息
        /// </summary>
        /// <returns></returns>
        public async Task<HeaderResult<List<UserGroupDto>>> GetUserGroupList(SearchUserDto input)
        {

            Expression<Func<UserGroupInfo, bool>> where = e =>true;
            if (!string.IsNullOrEmpty(input.SearchName))
            {
                where = where.And(e => e.UserGroupName.Contains(input.SearchName));
            }
           
            var userGroupList = await _userGroupRepository.LoadEntityListAsync(where, e => e.UserGroupName, "asc", input.PageIndex, input.Pagesize);
            var total = await _userGroupRepository.GetEntitiesCountAsync(where);
            var userGroupDtoList = userGroupList.MapToList<UserGroupInfo, UserGroupDto>();

            HeaderResult<List<UserGroupDto>> result = new HeaderResult<List<UserGroupDto>>
            {
                IsSucceed = true,
                Result = userGroupDtoList,
                Total = total
            };
            return result;
        }

        /// <summary>
        /// 根据条件查询用户组信息
        /// </summary>
        /// <param name="groupId"></param>
        /// <returns></returns>
        public async Task<HeaderResult<UserGroupDto>> GetUserGroup(Guid groupId)
        {
         
            var userGroup =
                await _userGroupRepository.WhereLoadEntityAsNoTrackingAsync(e => e.Id == groupId);
            var userGroupDto = userGroup.MapTo<UserGroupInfo, UserGroupDto>();

            HeaderResult<UserGroupDto> result = new HeaderResult<UserGroupDto>
            {
                IsSucceed = true,
                Result = userGroupDto
            };
            return result;
        }

      
        /// <summary>
        /// 添加用户组
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task<HeaderResult<string>> AddUserGroup(UserGroupDto input)
        {
            var userGroupEntity = new UserGroupInfo().CreateUserGroup(input.UserGroupName, input.CreateUserId, input.CreateUserName);         
            await _userGroupRepository.AddEntityAsync(userGroupEntity);
            await _userGroupRepository.CommitAsync();
           
            HeaderResult<string> result = new HeaderResult<string>
            {
                IsSucceed = true,
                Message = "添加成功!"
            };
            return result;
        }

       

        /// <summary>
        /// 修改用户组
        /// </summary>
        /// <param name="userGroupName"></param>
        /// <param name="groupId"></param>
        /// <returns></returns>
        public async Task<HeaderResult<string>> EditUserGroup(string userGroupName, Guid groupId)
        {
            var userGroup = await _userGroupRepository.WhereLoadEntityAsync(e => e.Id == groupId);
            userGroup?.EditUserGroup(userGroupName);
            _userGroupRepository.UpdateEntity(userGroup);
            await _userGroupRepository.CommitAsync();
            HeaderResult<string> result = new HeaderResult<string>
            {
                IsSucceed = true,
                Message = "修改成功!"
            };
            return result;
        }

        /// <summary>
        /// 删除用户组
        /// </summary>
        /// <param name="userGroupId"></param>
        /// <returns></returns>
        public async Task<HeaderResult<string>> DelUserGroup(string userGroupId)
        {
            var userGroup = await _userGroupRepository.WhereLoadEntityAsync(e => e.Id == Guid.Parse(userGroupId));
            userGroup?.DelUserGroup();
            _userGroupRepository.UpdateEntity(userGroup);
            _userGroupRepository.Commit();
            HeaderResult<string> result = new HeaderResult<string>
            {
                IsSucceed = true,
                Message = "删除成功!"
            };
            return result;
        }

        /// <summary>
        /// 分配用户组
        /// </summary>
        /// <param name="groupId"></param>
        /// <param name="userIdStr"></param>
        /// <returns></returns>
        public async Task<HeaderResult<string>> AssignUserGroup(Guid groupId, string userIdStr)
        {
            await _userUnGroupRepository.DelEntityAsync(e => e.UserGroupId == groupId);
            List<UserUnGroup> userUnGroupList = new List<UserUnGroup>();
            var userArry = userIdStr.Split(",");
            foreach (var item in userArry)
            {
                var userUnGroup = new UserUnGroup().CreateUserUnGroup(groupId, Guid.Parse(item));
                userUnGroupList.Add(userUnGroup);
            }
            await _userUnGroupRepository.AddRangeAsync(userUnGroupList);
            await _userUnGroupRepository.CommitAsync();
            HeaderResult<string> result = new HeaderResult<string>
            {
                IsSucceed = true,
                Message = "分配成功!"
            };
            return result;
        }

        /// <summary>
        /// 根据用户组Id查询用户的信息
        /// </summary>
        /// <returns></returns>      
        public async Task<HeaderResult<List<UserDto>>> GetUserUnGroupList(Guid groupId)
        {
           
            var userUnGroupList =
                await _userUnGroupRepository.WhereLoadEntityListAsNoTrackingAsync(e => e.UserGroupId == groupId);
            var userList = await _userRepository.LoadEntityAllAsync();
            var query = from userUnGroup in userUnGroupList
                        join user in userList on userUnGroup.UserId equals user.Id
                        select new UserDto
                        {
                            Id = user.Id,
                            UserName = user.UserName,
                            UserPhone = user.UserPhone,
                            UserPassword = user.UserPassword,
                            CreatDateTime = user.CreatDateTime,
                            IsDelete = user.IsDeleted,
                            IsDisable = user.IsDisable,
                            Address = user.Address
                        };

            HeaderResult<List<UserDto>> result = new HeaderResult<List<UserDto>>
            {
                IsSucceed = true,
                Result = query.ToList()
            };
            return result;
        }

        /// <summary>
        /// 获取角色的信息
        /// </summary>
        /// <returns></returns>
        public async Task<HeaderResult<List<RoleDto>>> GetRoleList(SearchRoleDto input)
        {
            Expression<Func<RoleInfo, bool>> where = e => true;
            if (!string.IsNullOrEmpty(input.SearchRoleName))
            {
                where = where.And(e => e.RoleName.Contains(input.SearchRoleName));
            }
          
            var roleList = await _roleRepository.LoadEntityListAsync(where, e => e.RoleName, "asc", input.PageIndex, input.Pagesize);
            var total = await _roleRepository.GetEntitiesCountAsync(where);
            var roleDtoList = roleList.MapToList<RoleInfo, RoleDto>();

            HeaderResult<List<RoleDto>> result = new HeaderResult<List<RoleDto>>
            {
                IsSucceed = true,
                Result = roleDtoList,
                Total = total
            };
            return result;
        }

        /// <summary>
        /// 根据角色Id查询角色信息
        /// </summary>
        /// <returns></returns>
        public async Task<HeaderResult<RoleDto>> GetRole(Guid roleId)
        {
           
            var roleInfo = await _roleRepository.WhereLoadEntityAsNoTrackingAsync(e => e.Id == roleId);
            var roleDto = roleInfo.MapTo<RoleInfo, RoleDto>();
            HeaderResult<RoleDto> result = new HeaderResult<RoleDto>
            {
                IsSucceed = true,
                Result = roleDto
            };
            return result;
        }

        /// <summary>
        /// 添加角色
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task<HeaderResult<string>> AddRole(AddRoleDto input)
        {
            var roleInfo = await _roleRepository.LoadEntityMaxSortAsync(e => e.RoleShot);
            var shotIndex = 1;
            if (roleInfo != null)
            {
                shotIndex = roleInfo.RoleShot + 1;
            }
            var userRoleEntity = new RoleInfo().CreateRole(input.RoleName, input.RoleType, input.RoleDescription, shotIndex);
            await _roleRepository.AddEntityAsync(userRoleEntity);
            await _roleRepository.CommitAsync();
            HeaderResult<string> result = new HeaderResult<string>
            {
                IsSucceed = true,
                Message = "添加成功!"
            };
            return result;
        }

        /// <summary>
        /// 修改角色
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task<HeaderResult<string>> EditRole(AddRoleDto input)
        {
            var role = await _roleRepository.WhereLoadEntityAsync(e => e.Id == input.RoleId);
            role?.EditRole(input.RoleName, input.RoleType, input.RoleDescription);
            _roleRepository.UpdateEntity(role);
            await _roleRepository.CommitAsync();
            HeaderResult<string> result = new HeaderResult<string>
            {
                IsSucceed = true,
                Message = "修改成功!"
            };
            return result;
        }

        /// <summary>
        /// 删除用户组
        /// </summary>
        /// <param name="roleId"></param>
        /// <returns></returns>
        public async Task<HeaderResult<string>> DelRole(Guid roleId)
        {
            var role = await _roleRepository.WhereLoadEntityAsync(e => e.Id == roleId);
            role?.DelRole();
            _roleRepository.UpdateEntity(role);
            _roleRepository.Commit();
            HeaderResult<string> result = new HeaderResult<string>
            {
                IsSucceed = true,
                Message = "删除成功!"
            };
            return result;
        }

        /// <summary>
        /// 分配角色
        /// </summary>
        /// <param name="roleId"></param>
        /// <param name="userIdStr"></param>
        /// <returns></returns>
        public async Task<HeaderResult<string>> AssignRole(Guid roleId, string userIdStr)
        {
            await _userUnRoleRepository.DelEntityAsync(e => e.RoleId == roleId);
            List<UserUnRole> userRoleList = new List<UserUnRole>();
            var userArry = userIdStr.Split(",");
            foreach (var item in userArry)
            {
                var userRole = new UserUnRole().CreateUserUnRole(Guid.Parse(item), roleId);
                userRoleList.Add(userRole);
            }
            await _userUnRoleRepository.AddRangeAsync(userRoleList);
            await _userUnRoleRepository.CommitAsync();
            HeaderResult<string> result = new HeaderResult<string>
            {
                IsSucceed = true,
                Message = "分配成功!"
            };
            return result;
        }

        /// <summary>
        /// 根据角色查询出已经分配的用户
        /// </summary>
        /// <param name="roleId"></param>
        /// <returns></returns>
        public async Task<HeaderResult<List<Guid>>> GetUserUnRoleList(Guid roleId)
        {
         
            var roleList = await _userUnRoleRepository.WhereLoadEntityListAsNoTrackingAsync(e => e.RoleId == roleId);

            HeaderResult<List<Guid>> result = new HeaderResult<List<Guid>>
            {
                IsSucceed = true,
                Result = roleList.Select(e => e.UserId).ToList()
            };
            return result;
        }

        /// <summary>
        /// 分配用户组角色
        /// </summary>
        /// <param name="roleId"></param>
        /// <param name="userGroupIdStr"></param>
        /// <returns></returns>
        public async Task<HeaderResult<string>> AssignGroupRole(Guid roleId, string userGroupIdStr)
        {
            await _userGroupUnRoleRepository.DelEntityAsync(e => e.RoleId == roleId);
            List<UserGroupUnRole> userGroupRoleList = new List<UserGroupUnRole>();
            var userGroupArry = userGroupIdStr.Split(",");
            foreach (var item in userGroupArry)
            {
                var userGroupRole = new UserGroupUnRole().CreateUserGroupUnRole(Guid.Parse(item), roleId);
                userGroupRoleList.Add(userGroupRole);
            }
            await _userGroupUnRoleRepository.AddRangeAsync(userGroupRoleList);
            await _userGroupUnRoleRepository.CommitAsync();
            HeaderResult<string> result = new HeaderResult<string>
            {
                IsSucceed = true,
                Message = "分配成功!"
            };
            return result;
        }

        /// <summary>
        /// 根据角色Id查询出已经分配的用户组
        /// </summary>
        /// <param name="roleId"></param>
        /// <returns></returns>
        public async Task<HeaderResult<List<Guid>>> GetUserGroupUnRoleList(Guid roleId)
        {
          
            var roleList = await _userGroupUnRoleRepository.WhereLoadEntityListAsNoTrackingAsync(e => e.RoleId == roleId);

            HeaderResult<List<Guid>> result = new HeaderResult<List<Guid>>
            {
                IsSucceed = true,
                Result = roleList.Select(e => e.UserGroupId).ToList()
            };
            return result;
        }




    }
}
