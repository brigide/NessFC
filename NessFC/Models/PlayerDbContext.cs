using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace NessFC.Models
{
    //Database abstraction for Player Model
    public class PlayerDbContext : DbContext
    {
        public DbSet<Player> Players { get; set; }
        public PlayerDbContext(DbContextOptions<PlayerDbContext> options) : base(options)
        {

        }
    }
}
