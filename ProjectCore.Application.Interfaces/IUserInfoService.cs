using ProjectCore.Domain.Model;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ProjectCore.Application.Interfaces
{
    public interface IUserInfoService
    {
        (int, List<UserInfo>) UserList(int rows, int page, string sort = "", string order = "", string userName = "");

        int Computer();

        Task<List<UserInfo>> ChaXun();
    }
}
