namespace MapIt.Server.Models
{
    public class Location
    {
        public string Id { get; set; } = default!;
        public string Date { get; set; } = default!;
        public string ThreatType { get; set; } = default!;
        public string FleeStatus { get; set; } = default!;
        public string ArmedWith { get; set; } = default!;
        public string City { get; set; } = default!;
        public string County { get; set; } = default!;
        public string State { get; set; } = default!;
        public double Latitude { get; set; } = default!;
        public double Longitude { get; set; } = default!;
        public string LocationPrecision { get; set; } = default!;
        public string Name { get; set; } = default!;
        public string Age { get; set; } = default!;
        public string Gender { get; set; } = default!;
        public string Race { get; set; } = default!;
        public string RaceSource { get; set; } = default!;
        public string WasMentalIllnessRelated { get; set; } = default!;
        public string BodyCamera { get; set; } = default!;
        public string AgencyIds { get; set; } = default!;
        public string Year { get; set; } = default!;
        public string url { get; set; } = default!;
    }

}
