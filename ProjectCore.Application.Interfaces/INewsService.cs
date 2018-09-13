using ProjectCore.Domain.Model;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ProjectCore.Application.Interfaces
{
   public  interface INewsService
    {
        /// <summary>
        /// 新闻的分页显示
        /// </summary>
        /// <param name="rows"></param>
        /// <param name="page"></param>
        /// <param name="sort"></param>
        /// <param name="order"></param>
        /// <param name="newsName"></param>
        /// <returns></returns>
        Task<(int, List<NewsInfo>)> NewsList(int rows, int page, string sort = "", string order = "", string newsName = "");

        /// <summary>
        /// 添加新闻案例
        /// </summary>
        /// <returns></returns>
        Task<int> AddNews(NewsInfo newsInfo);
        /// <summary>
        /// 删除选择的新闻
        /// </summary>
        /// <param name="strIds"></param>
        /// <returns></returns>
        Task<bool> DelNews(string strIds);
        /// <summary>
        /// 修改新闻
        /// </summary>
        /// <param name="newsInfo"></param>
        /// <returns></returns>
        Task<int> UpdateNews(NewsInfo newsInfo);
        /// <summary>
        /// 根据id查询新闻
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<NewsInfo> WhereNewId(int id);

        #region 前台
        /// <summary>
        /// 获取前台总条数
        /// </summary>
        /// <returns></returns>
        Task<int> GetNewsCount();
        /// <summary>
        /// 分页显示
        /// </summary>
        /// <returns></returns>
        Task<List<NewsInfo>> GetNewsLsit(int pageCount, int pageIndex);
        /// <summary>
        /// 查询最热的新闻
        /// </summary>
        /// <returns></returns>
        Task<List<NewsInfo>> GetNewsHotList();
        #endregion

    }
}
