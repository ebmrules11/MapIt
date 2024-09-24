namespace MapIt.Server.Interfaces
{
    using MongoDB.Bson;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public interface IMongoDBService<TDocument>
    {
        Task<BsonDocument> GetMapDataByIdAsync(string id);
        Task<string> AddMapDataAsync(string json, string email);
        Task UpdateMapDataByIdAsync(string id, string json);
        Task<bool> DeleteMapDataByIdAsync(string id);
        Task<List<BsonDocument>> GetMapsByEmailAsync(string email);
    }

}
