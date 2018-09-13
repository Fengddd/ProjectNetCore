using System;
using System.Collections.Generic;
using System.Text;
using AutoMapper;


namespace ProjectCore.Application.AutoMapprConfig
{
   public class AutoMapprProfile:Profile
    {
        public AutoMapprProfile()
        {
          
          

            //CreateMap<ApplyInformationRoot, ApplyRootDto>()
            //    .ForMember(root => root.AppyDateDay, opt => opt.MapFrom(s => s.AppyDate.ToDateTime().Day));
        }
    }
}
