using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;


namespace NessFC.Models
{
    //Database abstraction for Player Model
    public class NessDbContext : DbContext
    {
        public DbSet<Player> Players { get; set; }
        public DbSet<Position> Positions { get; set; }
        public NessDbContext(DbContextOptions<NessDbContext> options) : base(options)
        {

        }
    }
}
