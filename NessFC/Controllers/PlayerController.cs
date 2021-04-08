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
    public class PlayerController : ControllerBase
    {
        //Define private database context and models repositories
        private readonly NessDbContext _context;
        private readonly IRepository<Player> playerRepository;
        private readonly IRepository<Position> positionRepository;


        //Controller Constructor
        public PlayerController(NessDbContext context, IRepository<Player> playerRepo, IRepository<Position> positionRepo)                    
        {
            _context = context;
            playerRepository = playerRepo;
            positionRepository = positionRepo;
        }


        //List all players
        //GET: api/player
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Player>>> GetPlayers()   
        {
            var players = await playerRepository.ToListAsync(); 
            
            foreach(var player in players)
            {
                var position = await positionRepository.FindByIdAsync(player.PositionId);
                player.Position = position;
                player.Position.Players = null;
            }

            return players;
        }


        //List especific player
        //GET: api/player/3
        [HttpGet("{id}")]
        public async Task<ActionResult<Player>> GetPlayer(int id)
        {
            var player = await playerRepository.FindByIdAsync(id);

            if (player == null)
                return NotFound();

            var position = await positionRepository.FindByIdAsync(player.PositionId);
            player.Position = position;

            var players = playerRepository.List.Where(player => player.PositionId == position.Id).ToList();

            player.Position.Players = players;

            return player;
        }


        //Change epecific player's properties
        //PUT: api/player/2
        [HttpPut("{id}")]
        public async Task<ActionResult<Player>> PutPlayer(int id, Player player)
        {
            player.Id = id;

            //_context.Entry(player).State = EntityState.Modified;
            playerRepository.Edit(player);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch(DbUpdateConcurrencyException)
            {
                player = await playerRepository.FindByIdAsync(id);

                if (player == null)
                    return NotFound();
                throw;
            }

            return player;
        }


        //Create new player record
        //POST: api/player
        [HttpPost]
        public async Task<ActionResult<Player>> PostPlayer(Player player)
        {
            var position = await positionRepository.FindByIdAsync(player.PositionId);

            if (position == null)
                return NotFound();

            playerRepository.Add(player);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPlayer", new { id = player.Id }, player);
        }


        //Delete player from ID
        //DELETE: api/player/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Player>> DeletePlayer(int id)
        {
            var player = await playerRepository.FindByIdAsync(id);

            if (player == null)
                return NotFound();

            playerRepository.Delete(player);
            await _context.SaveChangesAsync();

            return player;
        }
    }
}
