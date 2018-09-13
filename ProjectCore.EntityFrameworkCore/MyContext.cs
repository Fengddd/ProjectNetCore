using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using ProjectCore.Common.DomainInterfaces;
using ProjectCore.Domain.Model.Entity;

namespace ProjectCore.EntityFrameworkCore
{
    /// <summary>
    /// EF Core 上下文
    /// </summary>
    public class MyContext:DbContext,IMyContext
    {
        public MyContext(DbContextOptions<MyContext> options)
        : base(options)
        {          
            // Database.EnsureCreated();
         
        }
  
        /// <summary>
        /// 用户
        /// </summary>
        public DbSet<UserInfo> UserInfo { get; set; }   
        /// <summary>
        /// 用户组
        /// </summary>
        public DbSet<UserGroupInfo> UserGroupInfo { get; set; }   
        /// <summary>
        /// 角色
        /// </summary>
        public DbSet<RoleInfo> RoleInfo { get; set; }
        /// <summary>
        /// 用户和用户组关联
        /// </summary>
        public DbSet<UserUnGroup> UserUnGroupInfo { get; set; }
        /// <summary>
        /// 用户和角色关联
        /// </summary>
        public DbSet<UserUnRole> UserUnRoleInfo { get; set; }
        /// <summary>
        /// 用户组和角色关联
        /// </summary>
        public DbSet<UserGroupUnRole> UserGroupUnRoleInfo { get; set; }
       
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //modelBuilder.Entity<UserInfo>().OwnsOne(e => e.Address);

            //modelBuilder.Entity<UserRoleInfo>().HasOne(e => e.UserInfo).WithMany(e => e.UserRoleList)
            //    .HasForeignKey(p => p.UserId);
            //modelBuilder.Entity<UserRoleInfo>().HasOne(e => e.RoleInfo).WithMany(e => e.UserRoleList)
            //    .HasForeignKey(p => p.RoleId);

            //modelBuilder.Entity<RoleMenuInfo>().HasOne(e => e.RoleInfo).WithMany(e => e.RoleMenuList)
            //    .HasForeignKey(p => p.RoleId);
            //modelBuilder.Entity<RoleMenuInfo>().HasOne(e => e.MenuInfo).WithMany(e => e.RoleMenuList)
            //    .HasForeignKey(p => p.MenuId);

            foreach (var entityType in modelBuilder.Model.GetEntityTypes())
            {
                // 1. Add the IsDeleted property
                entityType.GetOrAddProperty("IsDeleted", typeof(bool));

                // 2. Create the query filter
                var parameter = Expression.Parameter(entityType.ClrType);

                // 3. EF.Property<bool>(post, "IsDeleted")
                var propertyMethodInfo = typeof(EF).GetMethod("Property").MakeGenericMethod(typeof(bool));
                var isDeletedProperty =
                    Expression.Call(propertyMethodInfo, parameter, Expression.Constant("IsDeleted"));

                // 4. EF.Property<bool>(post, "IsDeleted") == false
                BinaryExpression compareExpression = Expression.MakeBinary(ExpressionType.Equal, isDeletedProperty,
                    Expression.Constant(false));

                // 5. post => EF.Property<bool>(post, "IsDeleted") == false
                var lambda = Expression.Lambda(compareExpression, parameter);

                modelBuilder.Entity(entityType.ClrType).HasQueryFilter(lambda);

            }

        }
        
    }
    
    

}
