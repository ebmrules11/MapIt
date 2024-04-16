using Microsoft.AspNetCore.Mvc;
using MapIt.Server.Models;
using MapIt.Server.Services;
using System.Collections.Generic;

namespace MapIt.Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class LocationsController : ControllerBase
    {
        // Path to your CSV file - adjust this to the actual path where your CSV is stored
        private const string CsvFilePath = @"Data\officer_oversight_Mark_I.csv";

        [HttpGet]
        public ActionResult<IEnumerable<Location>> GetLocations()
        {
            // Use the CsvService to read the CSV into a dictionary
            var locationsDict = CsvService.ReadCsvToDictionary(CsvFilePath);

            // Return all the values from the dictionary
            return Ok(locationsDict.Values);
        }
    }
}
