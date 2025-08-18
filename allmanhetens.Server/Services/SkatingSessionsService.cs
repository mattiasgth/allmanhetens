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

        public async Task<IEnumerable<SkatingSession>> GetSkatingSessionsAsync(DateTime? date)
        {
            await Task.CompletedTask;
            var query = SkatingSessionData.Sessions.AsQueryable();
            if(date != null)
            {
                query = query.Where(x => x.Date.Equals(date));
            }
            var rslt = query.ToList();
            return rslt;
        }

        public async Task<IEnumerable<Rink>> GetRinksAsync()
        {
            await Task.CompletedTask;
            return SkatingSessionData.Rinks;
        }
    }
}
