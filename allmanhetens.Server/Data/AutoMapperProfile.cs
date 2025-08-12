using Allmanhetens.DTO;
using Allmanhetens.Model;
using AutoMapper;

namespace Allmanhetens.Server.Data
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<SkatingSession, SkatingSessionResponseDTO>();
            CreateMap<Rink, RinkResponseDTO>();
        }
    }
}
