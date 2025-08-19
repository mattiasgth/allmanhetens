using Allmanhetens.DTO;
using Allmanhetens.Server.Services;
using AutoMapper;
using Microsoft.AspNetCore.Components.Forms.Mapping;
using Microsoft.AspNetCore.Mvc;

namespace allmanhetens.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SkatingSessionsController : ControllerBase
    {
        private readonly ILogger<SkatingSessionsController> _logger;
        private readonly SkatingSessionsService _service;
        private readonly IMapper _mapper;

        public SkatingSessionsController(ILogger<SkatingSessionsController> logger, SkatingSessionsService service, IMapper mapper)
        {
            _logger = logger;
            _service = service;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<SkatingSessionResponseDTO>>> GetSkatingSessions(DateTime? date = null)
        {
            try
            {
                await Task.Delay(100);
                var sessions = await _service.GetSkatingSessionsAsync(date);
                var rslt = _mapper.Map<IEnumerable<SkatingSessionResponseDTO>>(sessions);
                return Ok(rslt);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Exception caught");
                return BadRequest(ex.Message);
            }
        }
    }
}
