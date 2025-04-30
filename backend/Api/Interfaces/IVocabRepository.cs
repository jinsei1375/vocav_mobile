using Api.Models.Entities;

namespace Api.Interfaces
{
  public interface IVocabRepository
  {
    Task<List<Vocab>> GetVocabsAsync(string token);
  }
}
