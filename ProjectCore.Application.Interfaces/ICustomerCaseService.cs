using ProjectCore.Domain.Model;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ProjectCore.Application.Interfaces
{
   public interface ICustomerCaseService
    {
        #region 后台

        /// <summary>
        /// 客户案例的分页显示
        /// </summary>
        /// <param name="rows"></param>
        /// <param name="page"></param>
        /// <param name="sort"></param>
        /// <param name="order"></param>
        /// <param name="typeName"></param>
        /// <returns></returns>
        Task<(int, List<CustomerCaseInfo>)> CustomerCaseList(int rows, int page, string sort = "", string order = "", string CaseName = "");
        /// <summary>
        /// 添加客户案例
        /// </summary>
        /// <param name="type"></param>
        /// <returns></returns>
        Task<int> AddCustomerCase(CustomerCaseInfo type);
        /// <summary>
        /// 删除选择的客户案例
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<bool> DelCustomerCase(string strIds);
        /// <summary>
        /// 修改客户案例
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<int> UpdateCustomerCase(CustomerCaseInfo type);
        /// <summary>
        /// 根据id查询
        /// </summary>
        /// <param name="type"></param>
        /// <returns></returns>
        Task<CustomerCaseInfo> WhereCaseId(int id);

        #endregion

        #region 前台
        /// <summary>
        /// 获取前台总条数
        /// </summary>
        /// <returns></returns>
        Task<int> GetCaseCount();
        /// <summary>
        /// 分页显示
        /// </summary>
        /// <returns></returns>
        Task<List<CustomerCaseInfo>> GetCaseLsit(int pageCount, int pageIndex);
        #endregion
    }
}
