using allmanhetens.Server.Data;
using Allmanhetens.Model;

namespace Allmanhetens.Server.Services
{
    public class SkatingSessionsService
    {
        private readonly ILogger<SkatingSessionsService> _logger;

        public SkatingSessionsService(ILogger<SkatingSessionsService> logger)
        {
            _logger = logger;
        }

        public async Task<IEnumerable<SkatingSession>> GetSkatingSessionsAsync()
        {
            await Task.CompletedTask;
            return SkatingSessionData.Sessions;
        }

        public async Task<IEnumerable<Rink>> GetRinksAsync()
        {
            await Task.CompletedTask;
            return SkatingSessionData.Rinks;
        }
    }
}
