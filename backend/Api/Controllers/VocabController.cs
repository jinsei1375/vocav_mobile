using Microsoft.AspNetCore.Mvc;
using Api.Models.Entities;
using Api.Services;
using Api.Models.Dtos;

namespace Api.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class VocabController : ControllerBase
  {
    private readonly VocabService _vocabService;

    public VocabController(VocabService vocabService)
    {
      _vocabService = vocabService;
    }

    [HttpGet]
    public async Task<IActionResult> Get([FromHeader(Name = "Authorization")] string authHeader)
    {
      var token = authHeader?.Replace("Bearer ", "");
      var result = await _vocabService.GetAllVocabsAsync(token);
      return Ok(result);
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromHeader(Name = "Authorization")] string authHeader, [FromBody] VocabDto vocabDto)
    {
      if (string.IsNullOrEmpty(authHeader)) return Unauthorized();

        var token = authHeader.Replace("Bearer ", "");

        try
      {
          var result = await _vocabService.CreateVocabAsync(token, vocabDto);
          return result is not null ? Ok(result) : StatusCode(500, new { message = "登録に失敗しました" });
      }
      catch (Exception ex)
      {
          // 例外内容も返す（開発時のみ）
          return StatusCode(500, new { message = "サーバーエラー", error = ex.Message });
      }
    }
  }
}
