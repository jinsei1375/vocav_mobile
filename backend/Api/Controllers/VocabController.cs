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
    public async Task<ActionResult<List<Vocab>>> Get()
    {
      var result = await _vocabService.GetAllVocabsAsync();
      return Ok(result);
    }
  }
}
