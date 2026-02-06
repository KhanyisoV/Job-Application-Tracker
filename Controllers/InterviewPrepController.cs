using System.ComponentModel.DataAnnotations;
using JobApplicationTracker.Data;
using JobApplicationTracker.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace JobApplicationTracker.Controllers
{
    [ApiController]
    [Route("api/[controller]")] // This creates /api/InterviewPrep
    public class InterviewPrepController : ControllerBase // Changed from Controller to ControllerBase
    {
        private readonly AppDbContext _context;

        public InterviewPrepController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/InterviewPrep
        [HttpGet]
        public async Task<IActionResult> GetInterviewPreps()
        {
            var interviewPreps = await _context.InterviewPreps.ToListAsync();
            return Ok(interviewPreps);
        }

        // GET: api/InterviewPrep/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetInterviewPrep(int id)
        {
            var interviewPrep = await _context.InterviewPreps.FindAsync(id);

            if (interviewPrep == null)
            {
                return NotFound();
            }

            return Ok(interviewPrep);
        }

        // POST: api/InterviewPrep
        [HttpPost]
        public async Task<IActionResult> CreateInterviewPrep([FromBody] InterviewPrep interviewPrep)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            interviewPrep.Id = 0; // Ensure new record
            interviewPrep.PreparedDate = DateTime.UtcNow;

            _context.InterviewPreps.Add(interviewPrep);
            await _context.SaveChangesAsync();

            return CreatedAtAction(
                nameof(GetInterviewPrep),
                new { id = interviewPrep.Id },
                interviewPrep
            );
        }

        // PUT: api/InterviewPrep/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateInterviewPrep(
            int id,
            [FromBody] InterviewPrep interviewPrep
        )
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var existing = await _context.InterviewPreps.FindAsync(id);

            if (existing == null)
            {
                return NotFound();
            }

            // Update field names to match model
            existing.Content = interviewPrep.Content;
            existing.Notes = interviewPrep.Notes;
            existing.PreparedDate = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return Ok(existing);
        }

        // DELETE: api/InterviewPrep/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteInterviewPrep(int id)
        {
            var interviewPrep = await _context.InterviewPreps.FindAsync(id);

            if (interviewPrep == null)
            {
                return NotFound();
            }

            _context.InterviewPreps.Remove(interviewPrep);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
