using System;

namespace ProjectCore.Common.DomainInterfaces
{
   public interface IEntity
   {
       /// <summary>
       /// 实体Id
       /// </summary>
       Guid Id { get; set; }
    
    }
}
