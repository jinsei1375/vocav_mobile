namespace Api.Models.Dtos
{
  public class CreateVocabRequest
  {
    public required SupabaseSessionDto Session { get; set; }
    public required VocabDto Vocab { get; set; }
  }
}