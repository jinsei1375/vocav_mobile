using System.Security.Principal;
using Api.Models.Dtos;
using Api.Models.Entities;

namespace Api.Interfaces
{
  public interface IVocabRepository
  {
    Task<string> GetVocabsAsync(SupabaseSessionDto supabaseDto);
    Task<string> CreateVocabAsync(SupabaseSessionDto supabaseDto, VocabDto vocabDto);
    Task<string> UpdateVocabAsync(SupabaseSessionDto supabaseDto, VocabDto vocabDto);
  }
}
