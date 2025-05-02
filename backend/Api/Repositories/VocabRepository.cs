using System.Text.Json;
using Api.Models.Entities;
using Api.Interfaces;

namespace Api.Repositories
{
  public class VocabRepository: IVocabRepository
  {
    private readonly HttpClient _httpClient;
    private readonly string _supabaseUrl;
    private readonly string _supabaseKey;

    public VocabRepository(HttpClient httpClient)
    {
      _httpClient = httpClient;
      _supabaseUrl = Environment.GetEnvironmentVariable("SUPABASE_URL") 
        ?? throw new ArgumentNullException(nameof(_supabaseUrl), "SUPABASE_URL is not set in environment variables.");
      _supabaseKey = Environment.GetEnvironmentVariable("SUPABASE_API_KEY") 
        ?? throw new ArgumentNullException(nameof(_supabaseKey), "SUPABASE_API_KEY is not set in environment variables.");
    }

    public async Task<List<Vocab>> GetVocabsAsync(string token)
    {
      try
      {
        var request = new HttpRequestMessage(HttpMethod.Get, $"{_supabaseUrl}/rest/v1/vocab");
        request.Headers.Add("Authorization", $"Bearer {token}");
        request.Headers.Add("apikey", _supabaseKey);

        var response = await _httpClient.SendAsync(request);
        response.EnsureSuccessStatusCode();

        var content = await response.Content.ReadAsStringAsync();
        var data = JsonSerializer.Deserialize<List<Vocab>>(content);

        return data ?? new List<Vocab>();
      }
      catch (Exception ex)
      {
        throw new Exception($"Error fetching data from Supabase: {ex.Message}");
      }
    }
  }
}
