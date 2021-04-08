using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Cors;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using NessFC.Models;

namespace NessFC.Controllers
{
    [EnableCors]
    [Route("api/[controller]")]
    [ApiController]
    public class PositionController : ControllerBase
    {
        //Define private database context and models repositories
        private readonly NessDbContext _context;
        private readonly IRepository<Player> playerRepository;
        private readonly IRepository<Position> positionRepository;


        //Controller Constructor
        public PositionController(NessDbContext context, IRepository<Player> playerRepo, IRepository<Position> positionRepo)
        {
            _context = context;
            playerRepository = playerRepo;
            positionRepository = positionRepo;
        }



        //List all positions
        //GET: api/position
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Position>>> GetPositions()
        {
            return await positionRepository.ToListAsync();
        }


        //List especific position
        //GET: api/position/3
        [HttpGet("{id}")]
        public async Task<ActionResult<Position>> GetPosition(int id)
        {
            var position = await positionRepository.FindByIdAsync(id);

            if (position == null)
                return NotFound();

            var players = playerRepository.List.Where(player => player.PositionId == position.Id).ToList();

            position.Players = players;

            return position;
        }


        //Create new position
        //POST: api/position
        [HttpPost]
        public async Task<ActionResult<Position>> PostPosition(Position position)
        {
            positionRepository.Add(position);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPosition", new { id = position.Id }, position);
        }


        //Delete position from ID
        //DELETE: api/position/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Position>> DeletePosition(int id)
        {
            var position = await positionRepository.FindByIdAsync(id);

            if (position == null)
                return NotFound();

            positionRepository.Delete(position);
            await _context.SaveChangesAsync();

            return position;
        }
    }
}
