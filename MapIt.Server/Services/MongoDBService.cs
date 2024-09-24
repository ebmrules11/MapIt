// MongoDBService.cs
using MapIt.Server.Interfaces;
using MongoDB.Bson;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Threading.Tasks;

public class MongoDBService<TDocument> : IMongoDBService<TDocument> where TDocument : class
{
    private readonly IMongoDatabase _database;
    private readonly string _collectionName;

    public MongoDBService(IMongoDatabase database, string collectionName)
    {
        _database = database;
        _collectionName = collectionName;
    }

    /// <summary>
    /// This uploads a map file as an object, but adds email as an identifier to link an email to a document uploaded.
    /// </summary>
    /// <param name="json"></param>
    /// <param name="email"></param>
    /// <returns></returns>
    public async Task<string> AddMapDataAsync(string json, string email)
    {
        var document = BsonDocument.Parse(json);

        // Add or update the email field in the document
        document["email"] = email;

        var collection = _database.GetCollection<BsonDocument>(_collectionName);
        await collection.InsertOneAsync(document);

        // Return the string representation of the ObjectId
        return document["_id"].ToString()!;
    }

    public async Task<BsonDocument> GetMapDataByIdAsync(string id)
    {
        var collection = _database.GetCollection<BsonDocument>(_collectionName);
        var filter = Builders<BsonDocument>.Filter.Eq("_id", ObjectId.Parse(id));
        return await collection.Find(filter).FirstOrDefaultAsync();
    }

    public async Task<List<BsonDocument>> GetMapsByEmailAsync(string email)
    {
        var collection = _database.GetCollection<BsonDocument>(_collectionName);
        var filter = Builders<BsonDocument>.Filter.Eq("email", email);
        return await collection.Find(filter).ToListAsync();
    }


    public async Task UpdateMapDataByIdAsync(string id, string json)
    {
        var collection = _database.GetCollection<BsonDocument>(_collectionName);
        var document = BsonDocument.Parse(json);
        var filter = Builders<BsonDocument>.Filter.Eq("_id", ObjectId.Parse(id));
        await collection.ReplaceOneAsync(filter, document);
    }

    public async Task<bool> DeleteMapDataByIdAsync(string id)
    {
        var collection = _database.GetCollection<BsonDocument>(_collectionName);
        var filter = Builders<BsonDocument>.Filter.Eq("_id", ObjectId.Parse(id));
        DeleteResult deleteResult = await collection.DeleteOneAsync(filter);
        return deleteResult.IsAcknowledged;
    }
}
