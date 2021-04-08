using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;

namespace NessFC.Models
{
    public class PlayerRepository : IRepository<Player>
    {
        private readonly NessDbContext _context;

        public PlayerRepository(NessDbContext context)
        {
            _context = context;
        }

        public IQueryable<Player> List => _context.Players;

        public async Task<List<Player>> ToListAsync()
        {
            return await _context.Players.ToListAsync();
        }

        public List<Player> ToList()
        {
            return _context.Players.ToList();
        }

        public ValueTask<Player> FindByIdAsync(int id)
        {
            var player = _context.Players.FindAsync(id);
            return player;
        }

        public void Add(Player player)
        {
            _context.Players.Add(player);
        }

        public void Edit(Player player)
        {
            _context.Entry(player).State = EntityState.Modified;
        }

        public void Delete(Player player)
        {
            _context.Players.Remove(player);
        }
    }
}
