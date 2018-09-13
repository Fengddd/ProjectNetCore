using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using Microsoft.EntityFrameworkCore;
using ProjectCore.Common.DomainInterfaces;

namespace ProjectCore.Domain.Model.ValueObject
{
    /// <summary>
    /// 地址
    /// </summary>
    [Owned]
    public class Address:IValueObject
    {
        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="province">省</param>
        /// <param name="city">市</param>
        /// <param name="county">镇</param>
        /// <param name="addressDetails">详细地址</param>
        public Address(string province, string city, string county, string addressDetails)
        {
            Province = province;
            City = city;
            County = county;
            AddressDetails = addressDetails;
        }
        /// <summary>
        /// 无参构造
        /// </summary>
        public Address()
        {

        }

        #region 地址属性

        /// <summary>
        /// 省
        /// </summary>
        [StringLength(25)]
        public string Province { get;private set; }

        /// <summary>
        /// 市县
        /// </summary>
        [StringLength(25)]
        public string City { get; private set; }

        /// <summary>
        /// 镇
        /// </summary>
        [StringLength(25)]
        public string County { get; private set; }

        /// <summary>
        /// 详细地址
        /// </summary>
        [StringLength(200)]
        public string AddressDetails { get; private set; }
        #endregion
    }
}
