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
        //Define private database context
        private readonly NessDbContext _context;


        //Controller Constructor
        public PositionController(NessDbContext context)
        {
            _context = context;
        }


        //List all positions
        //GET: api/position
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Position>>> GetPositions()
        {
            return await _context.Positions.ToListAsync();
        }


        //List especific position
        //GET: api/position/3
        [HttpGet("{id}")]
        public async Task<ActionResult<Position>> GetPosition(int id)
        {
            var position = await _context.Positions.FindAsync(id);

            if (position == null)
                return NotFound();

            var players = _context.Players.Where(player => player.PositionId == position.Id).ToList();

            position.Players = players;

            return position;
        }


        //Create new position
        //POST: api/position
        [HttpPost]
        public async Task<ActionResult<Position>> PostPosition(Position position)
        {
            _context.Positions.Add(position);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPosition", new { id = position.Id }, position);
        }


        //Delete position from ID
        //DELETE: api/position/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Position>> DeletePosition(int id)
        {
            var position = await _context.Positions.FindAsync(id);

            if (position == null)
                return NotFound();

            _context.Positions.Remove(position);
            await _context.SaveChangesAsync();

            return position;
        }
    }
}
