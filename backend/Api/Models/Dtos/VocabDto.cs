namespace Api.Models.Dtos
{
  using System.Text.Json.Serialization;

  public class VocabDto
  {
    [JsonPropertyName("user_id")]
    public Guid UserId { get; set; }
    [JsonPropertyName("word")]
    public string Word { get; set; } = string.Empty;

    [JsonPropertyName("meaning")]
    public string Meaning { get; set; } = string.Empty;

  }
}