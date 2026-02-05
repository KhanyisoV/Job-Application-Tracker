using System.ComponentModel.DataAnnotations;
using JobApplicationTracker.Data;
using JobApplicationTracker.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace JobApplicationTracker.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class InterviewController : ControllerBase
    {
        private readonly AppDbContext _context;

        public InterviewController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("interview")]
        public IActionResult GetInterviews()
        {
            var interviews = _context.Interviews.ToList();
            return Ok(interviews);
        }

        [HttpPost]
        public IActionResult CreateInterview(Interview interview)
        {
            if (!_context.JobApplications.Any(j => j.JobId == interview.JobApplicationId))
            {
                return BadRequest("Job application not found");
            }
            interview.Id = 0;
            _context.Interviews.Add(interview);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetInterviews), new { id = interview.Id }, interview);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateInterview(int id, Interview interview)
        {
            var existing = _context.Interviews.Find(id);
            if (existing == null)
            {
                return NotFound();
            }

            existing.Description = interview.Description;
            existing.InterviewDate = interview.InterviewDate;
            existing.InterviewType = interview.InterviewType;

            _context.SaveChanges();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteInterview(int id)
        {
            var existing = _context.Interviews.Find(id);
            if (existing == null)
            {
                return NotFound();
            }

            _context.Interviews.Remove(existing);
            _context.SaveChanges();
            return NoContent();
        }
    }
}
