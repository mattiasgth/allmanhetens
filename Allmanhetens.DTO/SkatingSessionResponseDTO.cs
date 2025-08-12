using System;

namespace Allmanhetens.DTO
{
    public class SkatingSessionResponseDTO
    {
        public int Id { get; set; }
        public int? RinkId { get; set; }
        public string? RinkName { get; set; }
        public string? RinkAddress { get; set; }
        public double? DistanceKm { get; set; }
        public TimeSpan? StartTime { get; set; }
        public TimeSpan? EndTime { get; set; }
        public DateTime? Date { get; set; }
        public string? SessionTypeName { get; set; }
        public int? SessionTypeId { get; set; }
        public string? DisplayName { get; set; }
        public int? PriceCents { get; set; }
        public int? Capacity { get; set; }
        public int? Booked { get; set; }
    }
}
