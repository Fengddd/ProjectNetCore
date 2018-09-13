using ProjectCore.Domain.Model;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ProjectCore.Application.Interfaces
{
    public interface IPublicTypeService
    {
        /// <summary>
        /// 类型的分页显示
        /// </summary>
        /// <param name="rows"></param>
        /// <param name="page"></param>
        /// <param name="sort"></param>
        /// <param name="order"></param>
        /// <param name="typeName"></param>
        /// <returns></returns>
        (int, List<PublicTypeInfo>) TypeList(int rows, int page, string sort = "", string order = "", string typeName = "");
        /// <summary>
        /// 添加类型
        /// </summary>
        /// <param name="type"></param>
        /// <returns></returns>
        Task<int> AddType(PublicTypeInfo type);
        /// <summary>
        /// 删除选择的类型
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<bool> DelType(string strIds);
        /// <summary>
        /// 修改类型
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<int> UpdateType(PublicTypeInfo type);

    }
}
