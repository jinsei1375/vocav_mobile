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

    public async Task<List<Vocab>> GetVocabsAsync()
    {
      try
      {
        var supabaseUrl = Environment.GetEnvironmentVariable("SUPABASE_URL");
        var supabaseKey = Environment.GetEnvironmentVariable("SUPABASE_SERVICE_ROLE_KEY");

        var request = new HttpRequestMessage(HttpMethod.Get, $"{supabaseUrl}/rest/v1/vocab");
        request.Headers.Add("apikey", supabaseKey);
        request.Headers.Add("Authorization", $"Bearer {supabaseKey}");

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
