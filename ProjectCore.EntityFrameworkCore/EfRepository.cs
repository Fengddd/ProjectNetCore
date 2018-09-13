using System;
using System.Threading;
using System.Threading.Tasks;
using ProjectCore.Common.DomainInterfaces;

namespace ProjectCore.EntityFrameworkCore
{
    public class EfRepository : IRepository
    {
        private readonly MyContext _dbContext;
        public EfRepository(MyContext dbContext)
        {
            _dbContext = dbContext;
        }
        /// <summary>
        /// 提交
        /// </summary>
        public void Commit()
        {
           
           _dbContext.SaveChanges();
           
        }
        /// <summary>
        /// 异步提交
        /// </summary>
        /// <returns></returns>
        public async Task CommitAsync()
        {          
             await _dbContext.SaveChangesAsync(CancellationToken.None);           
        }
        /// <summary>
        /// 内存回收
        /// </summary>
        public void Dispose()
        {
            _dbContext.Dispose();
            GC.Collect();
        }
    }
}
