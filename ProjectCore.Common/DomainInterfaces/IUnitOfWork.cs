using System.Threading.Tasks;

namespace ProjectCore.Common.DomainInterfaces
{
    public interface IUnitOfWork
    {
        void Commit();
        Task CommitAsync();       
    }
}
