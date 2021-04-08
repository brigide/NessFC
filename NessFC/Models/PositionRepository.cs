using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;

namespace NessFC.Models
{
    public class PositionRepository : IRepository<Position>
    {
        private readonly NessDbContext _context;

        public PositionRepository(NessDbContext context)
        {
            _context = context;
        }

        public IQueryable<Position> List => _context.Positions;

        public async Task<List<Position>> ToListAsync()
        {
            return await _context.Positions.ToListAsync();
        }

        public List<Position> ToList()
        {
            return _context.Positions.ToList();
        }

        public ValueTask<Position> FindByIdAsync(int id)
        {
            var player = _context.Positions.FindAsync(id);
            return player;
        }

        public void Add(Position position)
        {
            _context.Positions.Add(position);
        }

        public void Edit(Position position)
        {
            _context.Entry(position).State = EntityState.Modified;
        }

        public void Delete(Position position)
        {
            _context.Positions.Remove(position);
        }
    }
}
