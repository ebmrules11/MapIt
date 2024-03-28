using MapIt.Server.Models;
using System.Globalization;

namespace MapIt.Server.Services
{
    public class CsvService
    {
        public static Dictionary<string, Location> ReadCsvToDictionary(string filePath)
            {
                var dictionary = new Dictionary<string, Location>();

                Dictionary<string, string> raceName = new Dictionary<string, string>
                {
                    { "A", "Asian" },
                    { "B", "Black" },
                    { "H", "Hispanic" },
                    { "NA", "Native American" },
                    { "O", "Other" },
                    { "W", "White" }
                };

                Dictionary<string, string> threatTypeImage = new Dictionary<string, string>
                {
                    { "shoot", "https://www.iconarchive.com/download/i91266/icons8/windows-8/Military-Firing-Gun.ico" },
                    { "point", "https://cdn-icons-png.flaticon.com/256/103/103635.png" },
                    { "attack", "https://static.thenounproject.com/png/2409627-200.png" },
                    { "threat", "https://static.thenounproject.com/png/4212233-200.png" },
                    { "move", "https://cdn0.iconfinder.com/data/icons/man-fighting-resisting-and-obstructing-police-duty/220/policeman-fight-criminal-009-512.png" },
                    { "flee", "https://cdn0.iconfinder.com/data/icons/dentist-and-patient/223/dentist-clinic-012-512.png" },
                    { "accident", "https://upload.wikimedia.org/wikipedia/commons/1/13/Glossy_3d_blue_questionmark.png" },
                    { "undetermined", "https://upload.wikimedia.org/wikipedia/commons/1/13/Glossy_3d_blue_questionmark.png" },
                    { "NA", "NA" }
                };

                Dictionary<string, string> threatTypeDescription = new Dictionary<string, string>
                {
                    { "shoot", "The victim fired a weapon." },
                    { "point", "The victim pointed a weapon at another individual." },
                    { "attack", "The victim attacked with other weapons or physical force." },
                    { "threat", "The victim had some kind of weapon visible to the officers on the scene." },
                    { "move", "The victim was moving in a threatening way." },
                    { "flee", "The victim was fleeing" },
                    { "accident", "????" },
                    { "undetermined", "The threat type could not be determined from available evidence" },
                    { "NA", "NA" }
                };

            // Assuming the first line of the CSV is the header
            var lines = File.ReadAllLines(filePath).Skip(1);

                char[] charsToTrim = { '"' };

                foreach (var line in lines)
                {
                    // Splitting by comma; consider a robust parser for complex CSVs
                    var columns = line.Split(',');

                    var record = new Location
                    {
                        Id = columns[0].Trim(),
                        Date = columns[1].Trim(),
                        ThreatType = threatTypeDescription[columns[2].Trim(charsToTrim)],
                        FleeStatus = columns[3].Trim(),
                        ArmedWith = columns[4].Trim(),
                        City = columns[5].Trim(),
                        County = columns[6].Trim(),
                        State = columns[7].Trim(),
                        Latitude = double.Parse(columns[8].Trim(), CultureInfo.InvariantCulture),
                        Longitude = double.Parse(columns[9].Trim(), CultureInfo.InvariantCulture),
                        LocationPrecision = columns[10].Trim(),
                        Name = columns[11].Trim(),
                        Age = columns[12].Trim(),
                        Gender = columns[13].Trim(),
                        Race = raceName[columns[14].Trim(charsToTrim)],
                        RaceSource = columns[15].Trim(),
                        WasMentalIllnessRelated = columns[16].Trim(),
                        BodyCamera = columns[17].Trim(),
                        AgencyIds = columns[18].Trim(),
                        Year = columns[19].Trim(),
                        url = threatTypeImage[columns[2].Trim(charsToTrim)]
                    };

                    if (!dictionary.ContainsKey(record.Id))
                    {
                        dictionary.Add(record.Id, record);
                    }
                    else
                    {
                        // Handle duplicate IDs if necessary
                        Console.WriteLine($"Duplicate ID found: {record.Id}");
                    }
                }

                return dictionary;
            }

    }
}
