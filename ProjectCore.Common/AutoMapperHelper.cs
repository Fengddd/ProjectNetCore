using System;
using System.Collections.Generic;
using System.Text;
using AutoMapper;

namespace ProjectCore.Common
{
    /// <summary>
    /// AutoMapper的帮助类
    /// </summary>
    public static class AutoMapperHelper
    {
        /// <summary>
        /// 单条实体类型映射,默认字段名字一一对应
        /// </summary>
        /// <typeparam name="TSource">Dto类型</typeparam>
        /// <typeparam name="TDestination">要被转化的数据</typeparam>
        /// <param name="source">转化之后的实体</param>
        /// <returns></returns>
        public static TDestination MapTo<TSource, TDestination>(this TSource source)
            where TDestination : class, new()
            where TSource : class
        {
            if (source == null) return new TDestination();
            var config = new MapperConfiguration(cfg => cfg.CreateMap<TSource, TDestination>());
            var mapper = config.CreateMapper();
            return mapper.Map<TDestination>(source);
        }

        /// <summary>
        /// 实体列表类型映射,默认字段名字一一对应
        /// </summary>
        /// <typeparam name="TDestination">Dto类型</typeparam>
        /// <typeparam name="TSource">要被转化的数据</typeparam>
        /// <param name="source">可以使用这个扩展方法的类型，任何引用类型</param>
        /// <returns>转化之后的实体列表</returns>
        public static List<TDestination> MapToList<TSource, TDestination>(this IEnumerable<TSource> source)
            where TDestination : class
            where TSource : class
        {
            if (source == null) return new List<TDestination>();
            var config = new MapperConfiguration(cfg => cfg.CreateMap<TSource, TDestination>());
            var mapper = config.CreateMapper();
            return mapper.Map<List<TDestination>>(source);
        }




    }
}
