using CsvHelper;
using MapIt.Server.Interfaces;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Bson.IO;
using System;
using System.Formats.Asn1;
using System.Globalization;
using System.Text.Json;
using System.Threading.Tasks;

namespace MapIt.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MapController(IMongoDBService<BsonDocument> mongoDBService) : ControllerBase
    {
        private readonly IMongoDBService<BsonDocument> _mongoDBService = mongoDBService;

        [HttpPost]
        public async Task<IActionResult> UploadMap(IFormFile file, [FromQuery] string email)
        {
            try
            {
                var json = await ConvertFileToJsonAsync(file);
                var document = BsonDocument.Parse(json);
                string documentId = await _mongoDBService.AddMapDataAsync(json, email);
                return Ok(new { DocumentId = documentId });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetMapById([FromQuery] string mapId)
        {
            try{
                var map = await _mongoDBService.GetMapDataByIdAsync(mapId);

                if (map == null)
                    return NotFound($"No map found with ID: {mapId}");
                return Ok(map);
            }
            catch (Exception ex){
                return BadRequest($"An error occurred: {ex.Message}");
            }
            
        }

        [HttpGet("email")]
        public async Task<IActionResult> GetMapsByEmail([FromQuery] string email)
        {
            try{
                var maps = await _mongoDBService.GetMapsByEmailAsync(email);

                if (maps.Count == 0)
                    return NotFound($"No maps found under email: {email}");
                return Ok(maps);
            }
            catch(Exception ex){
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteMapById([FromQuery] string mapId)
        {
            try{
                var isDeleted = await _mongoDBService.DeleteMapDataByIdAsync(mapId);

                if (isDeleted)
                    return Ok("Map Successfully deleted.");

                return NotFound("Could not delete map, it was not found in the database");
            }
            catch(Exception ex){
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Attempts to serialize a csv file and convert it into a processable JSON object
        /// </summary>
        /// <param name="file">CSV or Excel File</param>
        /// <returns>Json copy of excel or csv file</returns>
        private static Task<string> ConvertFileToJsonAsync(IFormFile file)
        {
            using var reader = new StreamReader(file.OpenReadStream());
            using var csv = new CsvReader(reader, CultureInfo.InvariantCulture);
            var records = csv.GetRecords<dynamic>();
            var options = new JsonSerializerOptions { WriteIndented = true };
            var json = JsonSerializer.Serialize(new { map = records }, options);
            return Task.FromResult(json);
        }
    }
}
