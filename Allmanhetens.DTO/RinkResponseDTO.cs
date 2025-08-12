using System;
using System.Collections.Generic;
using System.Text;

namespace Allmanhetens.DTO
{
    public class RinkResponseDTO
    {
        public int Id { get; set; }
        public string Name { get; set; } = "";
        public string? Address { get; set; }
        public double? Longitude { get; set; }
        public double? Latitude { get; set; }
        public string? ImageUrl { get; set; }
        public string? IceType { get; set; }
        public string? Status { get; set; }
    }
}
