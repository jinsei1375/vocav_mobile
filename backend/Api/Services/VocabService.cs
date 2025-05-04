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

    public async Task<List<Vocab>> GetAllVocabsAsync(string token)
    {
      return await _vocabRepository.GetVocabsAsync(token);
    }

    public async Task<Vocab> CreateVocabAsync(string token, VocabDto vocabDto)
    {
      return await _vocabRepository.CreateVocabAsync(token, vocabDto);
    }
  }
}
