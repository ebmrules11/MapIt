using Microsoft.AspNetCore.Mvc;
using MapIt.Server.Models;
using MapIt.Server.Services;
using System.Collections.Generic;
using MapIt.Server.Interfaces;

namespace MapIt.Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class LocationsController : ControllerBase
    {
        private readonly ICsvService _csvService;

        public LocationsController(ICsvService fileProcessingService)
        {
            _csvService = fileProcessingService;
        }
        // Path to your CSV file - adjust this to the actual path where your CSV is stored
        private const string CsvFilePath = @"Data\officer_oversight_Mark_I.csv";

        [HttpGet]
        public ActionResult<IEnumerable<Location>> GetLocations()
        {
            // Use the CsvService to read the CSV into a dictionary
            var locationsDict = _csvService.ReadCsvToDictionary(CsvFilePath);

            // Return all the values from the dictionary
            return Ok(locationsDict.Values);
        }

        [HttpPost("upload")]
        public IActionResult UploadFile(IFormFile file)
        {
            try
            {
                var columns = _csvService.GetColumnNames(file);
                return Ok(columns);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
