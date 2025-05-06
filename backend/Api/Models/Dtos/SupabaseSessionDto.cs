namespace Api.Models.Dtos
{
  public class SupabaseSessionDto
{
  public string AccessToken { get; set; } = string.Empty;
  public string RefreshToken { get; set; } = string.Empty;
}
}