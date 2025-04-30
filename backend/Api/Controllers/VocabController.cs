using Microsoft.AspNetCore.Mvc;
using Api.Models.Entities;
using Api.Services;

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
  }
}
