using MapIt.Server.Models;

namespace MapIt.Server.Interfaces
{
    public interface ICsvService
    {
        List<string> GetColumnNames(IFormFile file);

        Dictionary<string, Location> ReadCsvToDictionary(string filePath);
    }
}
