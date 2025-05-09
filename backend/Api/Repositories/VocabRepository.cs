using Api.Models.Entities;
using Api.Interfaces;
using Api.Models.Dtos;
using Newtonsoft.Json;
using Supabase.Postgrest;

namespace Api.Repositories
{
  public class VocabRepository: IVocabRepository
  {
    private readonly Supabase.Client _supabaseClient;

    public VocabRepository(Supabase.Client supabaseClient)
    {
      _supabaseClient = supabaseClient;
    }

    public async Task<string> GetVocabsAsync(SupabaseSessionDto supabaseDto)
    {
      await _supabaseClient.Auth.SetSession(supabaseDto.AccessToken, supabaseDto.RefreshToken);
      var result = await _supabaseClient.From<Vocab>().Get();
      return JsonConvert.SerializeObject(result.Models);
    }

    public async Task<string> CreateVocabAsync(SupabaseSessionDto supabaseDto, VocabDto dto)
    {
      await _supabaseClient.Auth.SetSession(supabaseDto.AccessToken, supabaseDto.RefreshToken);
      var user = await _supabaseClient.Auth.GetUser(supabaseDto.AccessToken) ?? throw new UnauthorizedAccessException("認証されたユーザーが見つかりません");

      var vocab = new AddVocab
      {
        Word = dto.Word,
        Meaning = dto.Meaning,
        User_Id = user.Id != null ? Guid.Parse(user.Id) : throw new ArgumentNullException(nameof(user.Id), "User ID cannot be null"),
        Created_At = DateTime.UtcNow,
        Updated_At = DateTime.UtcNow
      };

      try {
        var result = await _supabaseClient.From<AddVocab>().Insert(vocab);

        return JsonConvert.SerializeObject(result.Models.First());
      } catch (Exception ex) {
        Console.WriteLine($"Error: {ex.Message}");
        throw new Exception("データの挿入に失敗しました");
      }
    }

    public async Task<string> UpdateVocabAsync(SupabaseSessionDto supabaseDto, VocabDto dto)
    {
      await _supabaseClient.Auth.SetSession(supabaseDto.AccessToken, supabaseDto.RefreshToken);
      var user = await _supabaseClient.Auth.GetUser(supabaseDto.AccessToken) ?? throw new UnauthorizedAccessException("認証されたユーザーが見つかりません");

      var vocab = new UpdateVocab
      {
        Id = dto.Id ?? throw new ArgumentNullException(nameof(dto.Id), "ID cannot be null"),
        Word = dto.Word,
        Meaning = dto.Meaning,
        User_Id = user.Id != null ? Guid.Parse(user.Id) : throw new ArgumentNullException(nameof(user.Id), "User ID cannot be null"),
        Updated_At = DateTime.UtcNow
      };

      try {
        var result = await _supabaseClient
            .From<UpdateVocab>()
            .Match(new Dictionary<string, string> { { "id", vocab.Id.ToString() } })
            .Update(vocab);

        return JsonConvert.SerializeObject(result.Models.First());
      } catch (Exception ex) {
        Console.WriteLine($"Error: {ex.Message}");
        throw new Exception("データの更新に失敗しました");
      }
    }
  }
}
