using allmanhetens.Server.Controllers;
using Allmanhetens.DTO;
using Allmanhetens.Server.Services;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace Allmanhetens.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RinksController : ControllerBase
    {
        private readonly ILogger<RinksController> _logger;
        private readonly SkatingSessionsService _service;
        private readonly IMapper _mapper;
        
        public RinksController(ILogger<RinksController> logger, SkatingSessionsService service, IMapper mapper)
        {
            _logger = logger;
            _service = service;
            _mapper = mapper;
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<RinkResponseDTO>> GetRinkById(int id)
        {
            try
            {
                var rink = await _service.GetRinkByIdAsync(id);
                var rslt = _mapper.Map<RinkResponseDTO>(rink);
                return Ok(rslt);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Exception caught");
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<RinkResponseDTO>>> GetRinks()
        {
            try
            {
                var rinks = await _service.GetRinksAsync();
                var rslt = _mapper.Map<IEnumerable<RinkResponseDTO>>(rinks);
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
