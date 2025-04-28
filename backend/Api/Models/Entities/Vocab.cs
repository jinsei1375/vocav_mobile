
using System.Text.Json.Serialization;

namespace Api.Models.Entities
{
  public class Vocab
  {
    [JsonPropertyName("id")]
    public long Id { get; set; }
    [JsonPropertyName("user_id")]
    public required Guid User_Id { get; set; }

    [JsonPropertyName("word")]
    public string Word { get; set; } = string.Empty;

    [JsonPropertyName("meaning")]
    public string Meaning { get; set; } = string.Empty;

    [JsonPropertyName("created_at")]
    public DateTime Created_At { get; set; }

    [JsonPropertyName("updated_at")]
    public DateTime Updated_At { get; set; }
  }
}
