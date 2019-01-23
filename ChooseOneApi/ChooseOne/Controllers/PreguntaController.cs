using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace ChooseOne.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PreguntaController : ControllerBase
    {

        [HttpGet]
        public ActionResult<IEnumerable<string>> Get()
        {
            return new string[] { "Lorem Poncium", "Ergo Denuncium" };
        }


        [HttpGet("{id}")]
        public ActionResult<string> Get(int id)
        {
            return $"value: {id}";
        }


        [HttpPost]
        public void Post([FromBody] string value)
        {
        }


        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }


        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
