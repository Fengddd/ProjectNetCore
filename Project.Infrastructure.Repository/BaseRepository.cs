using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Threading.Tasks;
using System.Linq;
using System.Linq.Expressions;
using System.Threading;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using ProjectCore.Common;
using ProjectCore.Common.DomainInterfaces;
using ProjectCore.EntityFrameworkCore;
using ProjectCore.Domain.Repository.Interfaces;
using Z.EntityFramework.Plus;

namespace ProjectCore.Infrastructure.Repository
{
    /// <summary>
    /// 仓储基类中定义的公共的方法
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public class BaseRepository<T> : EfRepository, IBaseRepository<T> where T : class , new()
    {
        private readonly MyContext _dbContext;
        public BaseRepository(MyContext myContext) : base(myContext)
        {
            _dbContext = myContext;
        }

        #region  新增
        
        /// <summary>
        /// 新增
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        public virtual void AddEntity(T entity)
        {
            _dbContext.Set<T>().Add(entity);
        }

        /// <summary>
        /// 异步新增
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        public virtual async Task AddEntityAsync(T entity)
        {
           await _dbContext.Set<T>().AddAsync(entity);
        }

        /// <summary>
        /// 新增实体列表
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        public virtual void AddRange(IEnumerable<T> entity)
        {
            _dbContext.Set<T>().AddRange(entity);
        }

        /// <summary>
        /// 异步新增实体列表
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        public virtual async Task AddRangeAsync(IEnumerable<T> entity)
        {
           await _dbContext.Set<T>().AddRangeAsync(entity);
        }

        #endregion

        #region 删除

        /// <summary>
        /// 删除实体
        /// </summary>
        /// <param name="where"></param>
        /// <returns></returns>
        public virtual int DelEntity(Expression<Func<T, bool>> where)
        {
            return _dbContext.Set<T>().Where(where).Delete();
        }

        /// <summary>
        /// 异步删除实体
        /// </summary>
        /// <param name="where">实体列表</param>
        /// <returns></returns>
        public virtual async Task<int> DelEntityAsync(Expression<Func<T, bool>> where)
        {
            return await _dbContext.Set<T>().Where(where).DeleteAsync();
        }

        #endregion

        #region 修改

        /// <summary>
        /// 修改实体
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        public virtual void UpdateEntity(T entity)
        {
            _dbContext.Entry<T>(entity).State = EntityState.Modified;
        }
        /// <summary>
        /// 批量修改实体
        /// </summary>
        /// <param name="where"></param>
        /// <param name="entity"></param>
        public virtual int UpdateEntityRange(Expression<Func<T, bool>> where, Expression<Func<T, T>> entity)
        {
            return _dbContext.Set<T>().Where(where).Update(entity);
        }

        /// <summary>
        /// 异步批量修改实体
        /// </summary>
        /// <param name="where"></param>
        /// <param name="entity"></param>
        public virtual async Task<int> UpdateEntityRangeAsync(Expression<Func<T, bool>> where, Expression<Func<T, T>> entity)
        {
            return await _dbContext.Set<T>().Where(where).UpdateAsync(entity);
        }

        #endregion

        #region 查询

        /// <summary>
        /// 查询所有
        /// </summary>
        /// <returns></returns>
        public List<T> LoadEntityAll()
        {
            return _dbContext.Set<T>().AsNoTracking().ToList();
        }

        /// <summary>
        /// 异步查询所有
        /// </summary>
        /// <returns></returns>
        public async Task<List<T>> LoadEntityAllAsync()
        {
            return await _dbContext.Set<T>().AsNoTracking().ToListAsync();
        }

        /// <summary>
        /// 根据条件查询实体列表
        /// </summary>
        /// <param name="where"></param>
        /// <returns></returns>
        public IEnumerable<T> WhereLoadEntityEnumerable(Expression<Func<T, bool>> where)
        {
            return _dbContext.Set<T>().Where(where);
        }

        /// <summary>
        /// 根据条件查询实体列表不跟踪
        /// </summary>
        /// <param name="where"></param>
        /// <returns></returns>
        public List<T> WhereLoadEntityListAsNoTracking(Expression<Func<T, bool>> where)
        {
            return _dbContext.Set<T>().AsNoTracking().Where(where).ToList();
        }

        /// <summary>
        /// 异步根据条件查询实体列表不跟踪
        /// </summary>
        /// <param name="where"></param>
        /// <returns></returns>
        public async Task<List<T>> WhereLoadEntityListAsNoTrackingAsync(Expression<Func<T, bool>> where)
        {
            return await _dbContext.Set<T>().AsNoTracking().Where(where).ToListAsync();
        }


        /// <summary>
        /// 根据条件查询实体
        /// </summary>
        /// <param name="where"></param>
        /// <returns></returns>
        public T WhereLoadEntity(Expression<Func<T, bool>> where)
        {
            return _dbContext.Set<T>().SingleOrDefault(where);
        }

        /// <summary>
        /// 根据条件异步查询实体
        /// </summary>
        /// <param name="where"></param>
        /// <returns></returns>
        public async Task<T> WhereLoadEntityAsync(Expression<Func<T, bool>> where)
        {
            return await _dbContext.Set<T>().SingleOrDefaultAsync(where);
        }


        /// <summary>
        /// 根据条件查询实体不跟踪
        /// </summary>
        /// <param name="where"></param>
        /// <returns></returns>
        public T WhereLoadEntityAsNoTracking(Expression<Func<T, bool>> where)
        {
            return _dbContext.Set<T>().AsNoTracking().SingleOrDefault(where);
        }

        /// <summary>
        /// 异步根据条件异步查询实体不跟踪
        /// </summary>
        /// <param name="where"></param>
        /// <returns></returns>
        public async Task<T> WhereLoadEntityAsNoTrackingAsync(Expression<Func<T, bool>> where)
        {
            return await _dbContext.Set<T>().AsNoTracking().SingleOrDefaultAsync(where);
        }

        /// <summary>
        /// 获取最大的一条数据
        /// </summary>
        /// <param name="order"></param>
        /// <returns></returns>
        public T LoadEntityMaxSort(Expression<Func<T, int>> order)
        {
            return  _dbContext.Set<T>().OrderByDescending(order).FirstOrDefault();
        }

        /// <summary>
        /// 异步获取最大的一条数据
        /// </summary>
        /// <param name="order"></param>
        /// <returns></returns>
        public async Task<T> LoadEntityMaxSortAsync(Expression<Func<T, int>> order)
        {
            return await _dbContext.Set<T>().OrderByDescending(order).FirstOrDefaultAsync();
        }

        /// <summary>
        /// Any 查找数据判断数据是否存在
        /// </summary>
        /// <param name="where"></param>
        /// <returns></returns>
        public bool AnyEntity(Expression<Func<T, bool>> where)
        {
            return _dbContext.Set<T>().Any(where);
        }

        /// <summary>
        /// Any 查找数据判断数据是否存在
        /// </summary>
        /// <param name="where"></param>
        /// <returns></returns>
        public async Task<bool> AnyEntityAsync(Expression<Func<T, bool>> where)
        {
            return await _dbContext.Set<T>().AnyAsync(where);
        }


        #region 分页排序查询
        /// <summary>
        /// 加载自己定义排序分页实体列表
        /// </summary>
        /// <param name="where"></param>
        /// <param name="orderby"></param>
        /// <param name="asc">asc/desc</param>
        /// <param name="pageIndex"></param>
        /// <param name="pageSize"></param>
        /// <returns></returns>
        public virtual IEnumerable<T> LoadEntityEnumerable(Expression<Func<T, bool>> where, Expression<Func<T, string>> orderby, string asc, int pageIndex, int pageSize)
        {
            --pageIndex;

            if (asc.Equals(nameof(asc)))
                return (IEnumerable<T>)_dbContext.Set<T>().Where<T>(where).OrderBy<T, string>(orderby).Skip<T>(pageIndex * pageSize).Take<T>(pageSize);
            return (IEnumerable<T>)_dbContext.Set<T>().Where<T>(where).OrderByDescending<T, string>(orderby).Skip<T>(pageIndex * pageSize).Take<T>(pageSize).AsNoTracking();
        }
        public virtual IEnumerable<T> LoadEntityEnumerable(Expression<Func<T, bool>> where, Expression<Func<T, int?>> orderby, string asc, int pageIndex, int pageSize)
        {
            --pageIndex;

            if (asc.Equals(nameof(asc)))
                return (IEnumerable<T>)_dbContext.Set<T>().Where<T>(where).OrderBy<T, int?>(orderby).Skip<T>(pageIndex * pageSize).Take<T>(pageSize);
            return (IEnumerable<T>)_dbContext.Set<T>().Where<T>(where).OrderByDescending<T, int?>(orderby).Skip<T>(pageIndex * pageSize).Take<T>(pageSize).AsNoTracking();

        }
        public virtual IEnumerable<T> LoadEntityEnumerable(Expression<Func<T, bool>> where, Expression<Func<T, DateTime?>> orderby, string asc, int pageIndex, int pageSize)
        {
            --pageIndex;

            if (asc.Equals(nameof(asc)))
                return (IEnumerable<T>)_dbContext.Set<T>().Where<T>(where).OrderBy<T, DateTime?>(orderby).Skip<T>(pageIndex * pageSize).Take<T>(pageSize);
            return (IEnumerable<T>)_dbContext.Set<T>().Where<T>(where).OrderByDescending<T, DateTime?>(orderby).Skip<T>(pageIndex * pageSize).Take<T>(pageSize).AsNoTracking();

        }
        public virtual IEnumerable<T> LoadEntityEnumerable(Expression<Func<T, bool>> where, Expression<Func<T, decimal?>> orderby, string asc, int pageIndex, int pageSize)
        {
            --pageIndex;

            if (asc.Equals(nameof(asc)))
                return (IEnumerable<T>)_dbContext.Set<T>().Where<T>(where).OrderBy<T, Decimal?>(orderby).Skip<T>(pageIndex * pageSize).Take<T>(pageSize);
            return (IEnumerable<T>)_dbContext.Set<T>().Where<T>(where).OrderByDescending<T, Decimal?>(orderby).Skip<T>(pageIndex * pageSize).Take<T>(pageSize).AsNoTracking();

        }
        public virtual IEnumerable<T> LoadEntityEnumerable(Expression<Func<T, bool>> where, Expression<Func<T, bool?>> orderby, string asc, int pageIndex, int pageSize)
        {
            --pageIndex;

            if (asc.Equals(nameof(asc)))
                return (IEnumerable<T>)_dbContext.Set<T>().Where<T>(where).OrderBy<T, bool?>(orderby).Skip<T>(pageIndex * pageSize).Take<T>(pageSize);
            return (IEnumerable<T>)_dbContext.Set<T>().Where<T>(where).OrderByDescending<T, bool?>(orderby).Skip<T>(pageIndex * pageSize).Take<T>(pageSize).AsNoTracking();

        }
        #endregion

        #region 异步分页排序查询
        /// <summary>
        /// 加载自己定义排序分页实体列表
        /// </summary>
        /// <param name="where"></param>
        /// <param name="orderby"></param>
        /// <param name="asc">asc/desc</param>
        /// <param name="pageIndex"></param>
        /// <param name="pageSize"></param>
        /// <returns></returns>
        public virtual async Task<List<T>> LoadEntityListAsync(Expression<Func<T, bool>> where, Expression<Func<T, string>> orderby, string asc, int pageIndex, int pageSize)
        {
            --pageIndex;

            if (asc.Equals(nameof(asc)))
                return await _dbContext.Set<T>().Where<T>(where).OrderBy<T, string>(orderby).Skip<T>(pageIndex * pageSize).Take<T>(pageSize).AsNoTracking().ToListAsync();
            return await _dbContext.Set<T>().Where<T>(where).OrderByDescending<T, string>(orderby).Skip<T>(pageIndex * pageSize).Take<T>(pageSize).AsNoTracking().ToListAsync();

        }
        public virtual async Task<List<T>> LoadEntityListAsync(Expression<Func<T, bool>> where, Expression<Func<T, int?>> orderby, string asc, int pageIndex, int pageSize)
        {
            --pageIndex;

            if (asc.Equals(nameof(asc)))
                return await _dbContext.Set<T>().Where<T>(where).OrderBy<T, int?>(orderby).Skip<T>(pageIndex * pageSize).Take<T>(pageSize).AsNoTracking().ToListAsync();
            return await _dbContext.Set<T>().Where<T>(where).OrderByDescending<T, int?>(orderby).Skip<T>(pageIndex * pageSize).Take<T>(pageSize).AsNoTracking().ToListAsync();

        }
        public virtual async Task<List<T>> LoadEntityListAsync(Expression<Func<T, bool>> where, Expression<Func<T, DateTime?>> orderby, string asc, int pageIndex, int pageSize)
        {
            --pageIndex;

            if (asc.Equals(nameof(asc)))
                return await _dbContext.Set<T>().Where<T>(where).OrderBy<T, DateTime?>(orderby).Skip<T>(pageIndex * pageSize).Take<T>(pageSize).AsNoTracking().ToListAsync();
            return await _dbContext.Set<T>().Where<T>(where).OrderByDescending<T, DateTime?>(orderby).Skip<T>(pageIndex * pageSize).Take<T>(pageSize).AsNoTracking().ToListAsync();

        }
        public virtual async Task<List<T>> LoadEntityListAsync(Expression<Func<T, bool>> where, Expression<Func<T, decimal?>> orderby, string asc, int pageIndex, int pageSize)
        {
            --pageIndex;

            if (asc.Equals(nameof(asc)))
                return await _dbContext.Set<T>().Where<T>(where).OrderBy<T, Decimal?>(orderby).Skip<T>(pageIndex * pageSize).Take<T>(pageSize).AsNoTracking().ToListAsync();
            return await _dbContext.Set<T>().Where<T>(where).OrderByDescending<T, Decimal?>(orderby).Skip<T>(pageIndex * pageSize).Take<T>(pageSize).AsNoTracking().ToListAsync();

        }

        #endregion

        #region 求平均，求总计
        public virtual int? GetSum(Expression<Func<T, bool>> where, Expression<Func<T, int?>> sum)
        {
            return _dbContext.Set<T>().Where<T>(where).Sum<T>(sum);
        }
        public virtual double? GetSum(Expression<Func<T, bool>> where, Expression<Func<T, double?>> sum)
        {
            return _dbContext.Set<T>().Where<T>(where).Sum<T>(sum);
        }
        public virtual float? GetSum(Expression<Func<T, bool>> where, Expression<Func<T, float?>> sum)
        {
            return _dbContext.Set<T>().Where<T>(where).Sum<T>(sum);
        }
        public virtual decimal? GetSum(Expression<Func<T, bool>> where, Expression<Func<T, decimal?>> sum)
        {
            return _dbContext.Set<T>().Where<T>(where).Sum<T>(sum);
        }
        public virtual double? GetAvg(Expression<Func<T, bool>> where, Expression<Func<T, int?>> avg)
        {
            return _dbContext.Set<T>().Where<T>(where).Average<T>(avg);
        }
        public virtual double? GetAvg(Expression<Func<T, bool>> where, Expression<Func<T, double?>> avg)
        {
            return _dbContext.Set<T>().Where<T>(where).Average<T>(avg);
        }
        public virtual float? GetAvg(Expression<Func<T, bool>> where, Expression<Func<T, float?>> avg)
        {
            return _dbContext.Set<T>().Where<T>(where).Average<T>(avg);
        }
        public virtual decimal? GetAvg(Expression<Func<T, bool>> where, Expression<Func<T, decimal?>> avg)
        {
            return _dbContext.Set<T>().Where<T>(where).Average<T>(avg);
        }


        #endregion

        #region 查最大
        /// <summary>
        /// 查最大
        /// </summary>
        /// <param name="max"></param>
        /// <returns></returns>
        public virtual int? GetMax(Expression<Func<T, int?>> max)
        {
            return _dbContext.Set<T>().Max<T, int?>(max);
        }
        /// <summary>
        /// 查最大
        /// </summary>
        /// <param name="max"></param>
        /// <returns></returns>
        public virtual double? GetMax(Expression<Func<T, double?>> max)
        {
            return _dbContext.Set<T>().Max<T, double?>(max);
        }
        /// <summary>
        /// 查最大
        /// </summary>
        /// <param name="max"></param>
        /// <returns></returns>
        public virtual decimal? GetMax(Expression<Func<T, decimal?>> max)
        {
            return _dbContext.Set<T>().Max<T, decimal?>(max);
        }
        /// <summary>
        /// 查最大
        /// </summary>
        /// <param name="max"></param>
        /// <returns></returns>
        public virtual DateTime? GetMax(Expression<Func<T, DateTime?>> max)
        {
            return _dbContext.Set<T>().Max<T, DateTime?>(max);
        }
        #endregion

        /// <summary>
        /// 查询实体数量
        /// </summary>
        /// <param name="where"></param>
        /// <returns></returns>
        public virtual int GetEntitiesCount(Expression<Func<T, bool>> where)
        {
            return _dbContext.Set<T>().Count<T>(where);
        }

        /// <summary>
        /// 异步查询实体数量
        /// </summary>
        /// <param name="where"></param>
        /// <returns></returns>
        public virtual async Task<int> GetEntitiesCountAsync(Expression<Func<T, bool>> where)
        {
            return await _dbContext.Set<T>().CountAsync<T>(where);
        }

        /// <summary>
        /// 使用sql脚本查询实体列表
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="sql"></param>
        /// <returns></returns>
        public virtual List<T> GetModeListlBySql(string sql)
        {
            return _dbContext.Set<T>().FromSql<T>(sql).ToList();

        }

        /// <summary>
        /// 使用sql脚本异步查询实体列表
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="sql"></param>
        /// <returns></returns>
        public virtual async Task<List<T>> GetModeListlBySqlAsync(string sql)
        {           
            return await _dbContext.Set<T>().FromSql<T>(sql).ToListAsync();
        }

        /// <summary>
        /// 执行sql语句
        /// </summary>
        public virtual void ExecFromSql(string sql)
        {          
            _dbContext.Set<T>().FromSql<T>(sql);          
        }

        #endregion

      
        public void SqlMasterSlaveConn()
        {
            var connection = JsonConfigurationHelper.GetAppSettings<ConnectionService>("appsettings.json", "ConnectionService");

            _dbContext.Database.GetDbConnection().ConnectionString = connection.ConnectionSqlServiceTwo;
        }


    }
}
