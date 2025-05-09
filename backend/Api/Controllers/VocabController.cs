using Microsoft.AspNetCore.Mvc;
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

    [HttpPost]
    public async Task<IActionResult> GetVocb([FromBody] SupabaseSessionDto sessionDto)
    {
      var result = await _vocabService.GetAllVocabsAsync(sessionDto);
      return Ok(result);
    }

    [HttpPost("create")]
    public async Task<IActionResult> CreateVocab([FromBody] CreateVocabRequest request)
    {
      var result = await _vocabService.CreateVocabAsync(request.Session, request.Vocab);
      return Ok(result);
    }

    [HttpPost("update")]
    public async Task<IActionResult> UpdateVocab([FromBody] UpdateVocabRequest request)
    {
      var result = await _vocabService.UpdateVocabAsync(request.Session, request.Vocab);
      return Ok(result);
    }
  }
}
