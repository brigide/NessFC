﻿using Microsoft.AspNetCore.Mvc;
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
        //Define private database context
        private readonly NessDbContext _context;                           


        //Controller Constructor
        public PlayerController(NessDbContext context)                    
        {
            _context = context;                                         
        }


        //List all players
        //GET: api/player
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Player>>> GetPlayers()   
        {
            var players = await _context.Players.ToListAsync(); 
            
            foreach(var player in players)
            {
                var position = await _context.Positions.FindAsync(player.PositionId);
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
            var player = await _context.Players.FindAsync(id);

            if (player == null)
                return NotFound();

            var position = await _context.Positions.FindAsync(player.PositionId);
            player.Position = position;

            var players = _context.Players.Where(player => player.PositionId == position.Id).ToList();

            player.Position.Players = players;

            return player;
        }


        //Change epecific player's properties
        //PUT: api/player/2
        [HttpPut("{id}")]
        public async Task<ActionResult> PutPlayer(int id, Player player)
        {
            player.Id = id;

            _context.Entry(player).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch(DbUpdateConcurrencyException)
            {
                player = await _context.Players.FindAsync(id);

                if (player == null)
                    return NotFound();
                throw;
            }

            return NoContent();
        }


        //Create new player record
        //POST: api/player
        [HttpPost]
        public async Task<ActionResult<Player>> PostPlayer(Player player)
        {
            var position = await _context.Positions.FindAsync(player.PositionId);

            if (position == null)
                return NotFound();

            _context.Players.Add(player);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPlayer", new { id = player.Id }, player);
        }


        //Delete player from ID
        //DELETE: api/player/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Player>> DeletePlayer(int id)
        {
            var player = await _context.Players.FindAsync(id);

            if (player == null)
                return NotFound();

            _context.Players.Remove(player);
            await _context.SaveChangesAsync();

            return player;
        }
    }
}
