using Allmanhetens.Model;
using System.Runtime.CompilerServices;

namespace allmanhetens.Server.Data
{
    public static class SkatingSessionData
    {
        public static readonly SessionType[] SessionTypes =
        {
            new SessionType
            {
                Id = 1,
                Name = "With puck and stick"
            },
            new SessionType
            {
                Id = 2,
                Name = "Skating only"
            }
        };
        public static readonly Rink[] Rinks =
        {
            new Rink
            {
                Id = 1,
                Name = "Centennial Arena",
                Address = "123 Main St",
                Latitude = 45.5017,
                Longitude = -73.5673,
                IceType = "Hybrid",
                Status = "Open",
                ImageUrl = "https://example.com/images/centennial-arena.jpg"
            },
            new Rink
            {
                Id = 2,
                Name = "Riverside Ice Complex",
                Address = "456 Oak Ave",
                Latitude = 44.5056,
                Longitude = -72.2065,
                IceType = "Hybrid",
                Status = "Open",
                ImageUrl = "https://example.com/images/riverside-ice.jpg"
            },
            new Rink
            {
                Id = 3,
                Name = "Community Ice Rink",
                Address = "789 Pine Blvd",
                Latitude = 44.1123,
                Longitude = -71.3045,
                IceType = "Hybrid",
                Status = "Open",
                ImageUrl = "https://example.com/images/community-ice.jpg"
            }
        };
        public static readonly SkatingSession[] Sessions =
        {
        new SkatingSession
        {
            Id = 1001,
            Rink = Rinks[0],
            DistanceKm = 0.8,
            StartTime = TimeSpan.Parse("10:00"),
            EndTime = TimeSpan.Parse("12:00"),
            Date = DateTime.Parse("2025-08-11"),
            SessionType = SessionTypes[0]
        },
        new SkatingSession
        {
            Id = 1002,
            Rink = Rinks[0],
            DistanceKm = 0.8,
            StartTime = TimeSpan.Parse("14:00"),
            EndTime = TimeSpan.Parse("16:00"),
            Date = DateTime.Parse("2025-08-11"),
            SessionType = SessionTypes[0]
        },
        new SkatingSession
        {
            Id = 1003,
            Rink = Rinks[0],
            DistanceKm = 0.8,
            StartTime = TimeSpan.Parse("19:00"),
            EndTime = TimeSpan.Parse("21:00"),
            Date = DateTime.Parse("2025-08-11"),
            SessionType = SessionTypes[1]
        },
        new SkatingSession
        {
            Id = 1004,
            Rink = Rinks[1],
            DistanceKm = 1.2,
            StartTime = TimeSpan.Parse("09:00"),
            EndTime = TimeSpan.Parse("11:00"),
            Date = DateTime.Parse("2025-08-11"),
            SessionType = SessionTypes[1]
        },
        new SkatingSession
        {
            Id = 1005,
            Rink = Rinks[1],
            DistanceKm = 1.2,
            StartTime = TimeSpan.Parse("13:00"),
            EndTime = TimeSpan.Parse("15:00"),
            Date = DateTime.Parse("2025-08-11"),
            SessionType = SessionTypes[1],
        },
        new SkatingSession
        {
            Id = 1006,
            Rink = Rinks[1],
            DistanceKm = 1.2,
            StartTime = TimeSpan.Parse("18:00"),
            EndTime = TimeSpan.Parse("20:00"),
            Date = DateTime.Parse("2025-08-11"),
            SessionType = SessionTypes[1]
        },
        new SkatingSession
        {
            Id = 1007,
            Rink = Rinks[2],
            DistanceKm = 2.1,
            StartTime = TimeSpan.Parse("11:00"),
            EndTime = TimeSpan.Parse("13:00"),
            Date = DateTime.Parse("2025-08-11"),
            SessionType = SessionTypes[0]
        },
        new SkatingSession
        {
            Id = 1008,
            Rink = Rinks[2],
            DistanceKm = 2.1,
            StartTime = TimeSpan.Parse("15:00"),
            EndTime = TimeSpan.Parse("17:00"),
            Date = DateTime.Parse("2025-08-11"),
            SessionType = SessionTypes[1],
        },
        new SkatingSession
        {
            Id = 1009,
            Rink = Rinks[2],
            DistanceKm = 2.1,
            StartTime = TimeSpan.Parse("20:00"),
            EndTime = TimeSpan.Parse("22:00"),
            Date = DateTime.Parse("2025-08-11"),
            SessionType = SessionTypes[0]
        }
    };
    }

}
