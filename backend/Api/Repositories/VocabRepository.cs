using System.Text.Json;
using Api.Models.Entities;
using Api.Interfaces;

namespace Api.Repositories
{
  public class VocabRepository: IVocabRepository
  {
    private readonly HttpClient _httpClient;

    public VocabRepository(HttpClient httpClient)
    {
      _httpClient = httpClient;
    }

    public async Task<List<Vocab>> GetVocabsAsync(string token)
    {
      try
      {
        var supabaseUrl = Environment.GetEnvironmentVariable("SUPABASE_URL");
        var supabaseKey = Environment.GetEnvironmentVariable("SUPABASE_API_KEY");

        var request = new HttpRequestMessage(HttpMethod.Get, $"{supabaseUrl}/rest/v1/vocab");
        request.Headers.Add("Authorization", $"Bearer {token}");
        request.Headers.Add("apikey", supabaseKey);

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
