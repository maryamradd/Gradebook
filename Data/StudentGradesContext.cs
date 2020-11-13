using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using GradeBook.Models;

namespace GradeBook.Data
{
    public class StudentGradesContext : DbContext
    {
        public StudentGradesContext (DbContextOptions<StudentGradesContext> options)
            : base(options)
        {
        }

        public DbSet<GradeBook.Models.StudentGrade> StudentGrade { get; set; }
    }
}
