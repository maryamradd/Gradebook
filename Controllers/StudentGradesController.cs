using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GradeBook.Data;
using GradeBook.Models;

namespace GradeBook.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class StudentGradesController : ControllerBase
    {
        private readonly StudentGradesContext _context;
        private readonly IDataRepository<StudentGrade> _repo;

        public StudentGradesController(StudentGradesContext context, IDataRepository<StudentGrade> repo)
        {
            _context = context;
            _repo = repo;
        }

        // GET: api/StudentGrades
        [HttpGet]
        public async Task<ActionResult<IEnumerable<StudentGrade>>> GetStudentGrade()
        {
            return await _context.StudentGrade.ToListAsync();
        }

        // GET: api/StudentGrades/5
        [HttpGet("{id}")]
        public async Task<ActionResult<StudentGrade>> GetStudentGrade(int id)
        {
            var studentGrade = await _context.StudentGrade.FindAsync(id);

            if (studentGrade == null)
            {
                return NotFound();
            }

            return studentGrade;
        }

        // PUT: api/StudentGrades/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutStudentGrade(int id, StudentGrade studentGrade)
        {
            if (id != studentGrade.Id)
            {
                return BadRequest();
            }

            _context.Entry(studentGrade).State = EntityState.Modified;

            try
            {
                _repo.Update(studentGrade);
                var save = await _repo.SaveAsync(studentGrade);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StudentGradeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/StudentGrades
        [HttpPost]
        public async Task<ActionResult<StudentGrade>> PostStudentGrade(StudentGrade studentGrade)
        {
            _repo.Add(studentGrade);
            var save = await _repo.SaveAsync(studentGrade);

            return CreatedAtAction("GetStudentGrade", new { id = studentGrade.Id }, studentGrade);
        }

        // DELETE: api/StudentGrades/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<StudentGrade>> DeleteStudentGrade(int id)
        {
            var studentGrade = await _context.StudentGrade.FindAsync(id);
            if (studentGrade == null)
            {
                return NotFound();
            }

            _repo.Delete(studentGrade);
            var save = await _repo.SaveAsync(studentGrade);

            return Ok(studentGrade);
        }

        private bool StudentGradeExists(int id)
        {
            return _context.StudentGrade.Any(e => e.Id == id);
        }
    }
}