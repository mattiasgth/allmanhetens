using System;
using System.ComponentModel.DataAnnotations;

namespace Allmanhetens.Model
{
    public class SkatingSession
    {
        [Key]
        public int Id { get; set; }
        public virtual Rink? Rink { get; set; }
        public double? DistanceKm { get; set; }
        public TimeSpan? StartTime { get; set; }
        public TimeSpan? EndTime { get; set; }
        public DateTime? Date { get; set; }
        public virtual SessionType? SessionType { get; set; }
        public string? DisplayName { get; set; }
        public int? PriceCents { get; set; }
        public int? Capacity { get; set; }
        public int? Booked { get; set; }
    }
}
