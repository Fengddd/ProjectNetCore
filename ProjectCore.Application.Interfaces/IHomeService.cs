using ProjectCore.Application.Interfaces.Dtos;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ProjectCore.Application.Interfaces
{
   public interface IHomeService
    {
        Task<List<HomeShowDtos>> HomeShowList();
    }
}
