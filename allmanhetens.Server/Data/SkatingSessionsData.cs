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
    // Indoor Rinks within Stockholm Municipality
    new Rink
    {
        Id = 1,
        Name = "Östermalms IP (indoor)",
        Address = "Fiskartorpsvägen 2, Östermalm, Stockholm",
        Longitude = 18.0730,
        Latitude = 59.3340,
        ImageUrl = "/image_missing.png", // image from wheree.com 
        IceType = "Artificial (Indoor)",
        Status = "Open (seasonal)"
    },
    new Rink
    {
        Id = 2,
        Name = "Farsta Ishall",
        Address = "Farstaängsvägen 3, Farsta, Stockholm",
        Longitude = 18.0630,
        Latitude = 59.2560,
        ImageUrl = "https://www.farstahockey.se/images/1098/29381/11057705-6A92-4BA1-B6DD-0888C1BD340B_1057513_512.JPG?v=2021-03-22%2008:29:16", // image from farstahockey.se 
        IceType = "Artificial (Indoor)",
        Status = "Open (seasonal)"
    },
    new Rink
    {
        Id = 3,
        Name = "Zinkensdamms IP (indoor)",
        Address = "Ringvägen 16, Södermalm, Stockholm",
        Longitude = 18.0450,
        Latitude = 59.3150,
        ImageUrl = "https://imgs.aftonbladet-cdn.se/v2/images/aef49146-3faa-47ce-8acb-acf3faddbe2b?fit=crop&h=733&q=50&w=1100&s=fde87abd0873f91114587e3345e9e73c690e853b",
        IceType = "Artificial (Indoor)",
        Status = "Open (seasonal)",
        InfoUrl = "https://foreningsservice.stockholm/hitta-idrottsanlaggningar-som-bokas/idrottsanlaggning/zinkensdamms-idrottsplats"
    },
    new Rink
    {
        Id = 4,
        Name = "Stora Mossens Ishall",
        Address = "Västerled 26, Bromma, Stockholm",
        Longitude = 18.0375,
        Latitude = 59.3520,
        ImageUrl = "https://foreningsservice.stockholm/optimized/serviceunitspage/filer/hitta/44b5fbbc-888a-449b-bf97-16e222b597b0.jpeg",
        IceType = "Artificial (Indoor)",
        Status = "Open (select public hours)"
    },
    new Rink
    {
        Id = 5,
        Name = "Mälarhöjdens Ishall",
        Address = "Lotta Svärds gränd 3, Hägersten, Stockholm",
        Longitude = 17.954953,
        Latitude = 59.28802,
        ImageUrl = "/image_missing.png",
        IceType = "Artificial (Indoor)",
        Status = "Open (new, since 2024)"
    },
    new Rink
    {
        Id = 6,
        Name = "Husby Ishall",
        Address = "Nykarlebygatan 3, Husby, Stockholm",
        Longitude = 18.0000,
        Latitude = 59.4200,
        ImageUrl = "https://foretagsservice.stockholm/optimized/serviceunitspage/filer/hitta/920e65b7-f398-461f-b772-94029f54a3e8.jpeg",
        IceType = "Artificial (Indoor)",
        Status = "Open (modern facility)"
    },

    // A few outdoor/seasonal rinks for reference
    new Rink
    {
        Id = 7,
        Name = "Kungsträdgården",
        Address = "Kungsträdgården, Stockholm",
        Longitude = 18.07142,
        Latitude = 59.33125,
        ImageUrl = "https://kultur.stockholm/optimized/c8x5_medium/siteassets/konst-och-kultur/evenemang/kungstradgarden/_dsc0203_red.jpg",
        IceType = "Artificial (Outdoor)",
        Status = "Open (seasonal)"
    },
    new Rink
    {
        Id = 8,
        Name = "Vasaparken",
        Address = "Vasaparken, Stockholm",
        Longitude = 18.04149,
        Latitude = 59.33968,
        ImageUrl = "/image_missing.png",
        IceType = "Artificial (Outdoor)",
        Status = "Open (seasonal)"
    },
    new Rink
    {
        Id = 9,
        Name = "Trekanten (lake)",
        Address = "Liljeholmen, Stockholm",
        Longitude = 18.0050,
        Latitude = 59.3100,
        ImageUrl = "/image_missing.png",
        IceType = "Natural",
        Status = "Weather dependent"
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
            Date = DateTime.Today,
            SessionType = SessionTypes[0]
        },
        new SkatingSession
        {
            Id = 1002,
            Rink = Rinks[0],
            DistanceKm = 0.8,
            StartTime = TimeSpan.Parse("14:00"),
            EndTime = TimeSpan.Parse("16:00"),
            Date = DateTime.Today,
            SessionType = SessionTypes[0]
        },
        new SkatingSession
        {
            Id = 1003,
            Rink = Rinks[0],
            DistanceKm = 0.8,
            StartTime = TimeSpan.Parse("19:00"),
            EndTime = TimeSpan.Parse("21:00"),
            Date = DateTime.Today,
            SessionType = SessionTypes[1]
        },
        new SkatingSession
        {
            Id = 1004,
            Rink = Rinks[1],
            DistanceKm = 1.2,
            StartTime = TimeSpan.Parse("09:00"),
            EndTime = TimeSpan.Parse("11:00"),
            Date = DateTime.Today,
            SessionType = SessionTypes[1]
        },
        new SkatingSession
        {
            Id = 1005,
            Rink = Rinks[1],
            DistanceKm = 1.2,
            StartTime = TimeSpan.Parse("13:00"),
            EndTime = TimeSpan.Parse("15:00"),
            Date = DateTime.Today,
            SessionType = SessionTypes[1],
        },
        new SkatingSession
        {
            Id = 1006,
            Rink = Rinks[1],
            DistanceKm = 1.2,
            StartTime = TimeSpan.Parse("18:00"),
            EndTime = TimeSpan.Parse("20:00"),
            Date = DateTime.Today,
            SessionType = SessionTypes[1]
        },
        new SkatingSession
        {
            Id = 1007,
            Rink = Rinks[2],
            DistanceKm = 2.1,
            StartTime = TimeSpan.Parse("11:00"),
            EndTime = TimeSpan.Parse("13:00"),
            Date = DateTime.Today,
            SessionType = SessionTypes[0]
        },
        new SkatingSession
        {
            Id = 1008,
            Rink = Rinks[2],
            DistanceKm = 2.1,
            StartTime = TimeSpan.Parse("15:00"),
            EndTime = TimeSpan.Parse("17:00"),
            Date = DateTime.Today,
            SessionType = SessionTypes[1],
        },
        new SkatingSession
        {
            Id = 1009,
            Rink = Rinks[2],
            DistanceKm = 2.1,
            StartTime = TimeSpan.Parse("20:00"),
            EndTime = TimeSpan.Parse("22:00"),
            Date = DateTime.Today,
            SessionType = SessionTypes[0]
        },
        new SkatingSession
        {
            Id = 1010,
            Rink = Rinks[0],
            DistanceKm = 0.8,
            StartTime = TimeSpan.Parse("10:00"),
            EndTime = TimeSpan.Parse("12:00"),
            Date = DateTime.Today.AddDays(1),
            SessionType = SessionTypes[0]
        },
        new SkatingSession
        {
            Id = 1011,
            Rink = Rinks[0],
            DistanceKm = 0.8,
            StartTime = TimeSpan.Parse("10:00"),
            EndTime = TimeSpan.Parse("12:00"),
            Date = DateTime.Today.AddDays(-1),
            SessionType = SessionTypes[0]
        },
        new SkatingSession
        {
            Id = 1012,
            Rink = Rinks[0],
            DistanceKm = 0.8,
            StartTime = TimeSpan.Parse("10:00"),
            EndTime = TimeSpan.Parse("12:00"),
            Date = DateTime.Today.AddDays(2),
            SessionType = SessionTypes[0]
        }
        };
    }

}
