using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace GradeBook.Models
{
    public class StudentGrade
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int studentNumber { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Section { get; set; }

        [Required]
        public double Grade { get; set; }
    }
}