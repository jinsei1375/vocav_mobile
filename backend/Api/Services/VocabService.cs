using Api.Models.Entities;
using Api.Repositories;
using Api.Interfaces;
using Api.Models.Dtos;

namespace Api.Services
{
  public class VocabService
  {
    private readonly IVocabRepository _vocabRepository;

    public VocabService(IVocabRepository vocabRepository)
    {
      _vocabRepository = vocabRepository;
    }

    public async Task<string> GetAllVocabsAsync(SupabaseSessionDto supabaseDto)
    {
      return await _vocabRepository.GetVocabsAsync(supabaseDto);
    }

    public async Task<string> CreateVocabAsync(SupabaseSessionDto supabaseDto, VocabDto vocabDto)
    {
      return await _vocabRepository.CreateVocabAsync(supabaseDto, vocabDto);
    }

    public async Task<string> UpdateVocabAsync(SupabaseSessionDto supabaseDto, VocabDto vocabDto)
    {
      return await _vocabRepository.UpdateVocabAsync(supabaseDto, vocabDto);
    }
  }
}
