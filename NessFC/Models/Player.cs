using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace NessFC.Models
{
    //Player class (Domain Model)
    [Table("Players")]
    public class Player
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public int Number { get; set; }
        [ForeignKey("PositionId")]
        public int PositionId { get; set; }
        public Position Position { get; set; }
        [Required]
        public int Age { get; set; }
        [Required]
        public decimal Weight { get; set; }
    }
}
