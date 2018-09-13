using ProjectCore.Application.Interfaces.Dtos;
using ProjectCore.Domain.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ProjectCore.Application.Interfaces
{
    public interface ISolveProblemService
    {
        (int, List<SolveProblemInfo>) SolveList(int rows, int page, string sort = "", string order = "", string solveName = "");

        List<PublicTypeInfo> SelectSolveBox();

        Task<int> AddSolve(SolveDtos solve);

        Task<int> UpdateSolve(SolveDtos solve);

        Task<bool> DelSolve(string arrys);

        Task<List<SolveProblemInfo>> WhereSolveIdList(int id);

        Task<List<DeskSolveProgramDtos>> DeskSolveProgramList();
    }
}
