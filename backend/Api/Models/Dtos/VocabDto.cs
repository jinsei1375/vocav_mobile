namespace Api.Models.Dtos
{
  using System.Text.Json.Serialization;

  public class VocabDto
  {
    [JsonPropertyName("id")]
    public long? Id {get; set; }

    [JsonPropertyName("user_id")]
    public Guid UserId { get; set; }
    
    [JsonPropertyName("word")]
    public string Word { get; set; } = string.Empty;

    [JsonPropertyName("meaning")]
    public string Meaning { get; set; } = string.Empty;
  }

  public class CreateVocabRequest
  {
    public required SupabaseSessionDto Session { get; set; }
    public required VocabDto Vocab { get; set; }
  }

  public class UpdateVocabRequest
  {
    public required SupabaseSessionDto Session { get; set; }
    public required VocabDto Vocab { get; set; }
  }
}