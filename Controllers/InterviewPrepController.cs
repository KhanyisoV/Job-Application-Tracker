using System.ComponentModel.DataAnnotations;
using JobApplicationTracker.Data;
using JobApplicationTracker.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace JobApplicationTracker.Controllers
{
    [ApiController]
    [Route("/api")]
    public class InterviewPrepController : Controller
    {
        public readonly AppDbContext _context;

        public InterviewPrepController(AppDbContext context)
        {
            _context = context;
        }

        // Get all Interviewpreps
        [HttpGet]
        public IActionResult getInterviews()
        {
            var interviewsPrep = _context.InterviewPreps.ToList();
            return Ok(interviewsPrep);
        }

        // Get a specific interview prep using Id
        [HttpGet("{id}")]
        public IActionResult getInterview(int id)
        {
            var exist = _context.InterviewPreps.Find(id);
            if (exist == null)
            {
                return NotFound();
            }

            return Ok(exist);
        }

        //Update an InterviewPrep using Id

        [HttpPut("id")]
        public IActionResult UpdateInterview(int id, InterviewPrep interviewPrep)
        {
            var exist = _context.InterviewPreps.Find(id);
            if (exist == null)
            {
                return NotFound();
            }

            exist.PreparedDate = DateTime.UtcNow;
            exist.Question = interviewPrep.Question;
            exist.Answer = interviewPrep.Answer;

            _context.SaveChanges();
            return NoContent();
        }

        //Delete an InterviewPrep using Id

        [HttpDelete]
        public IActionResult DeleteInterview(int id)
        {
            var exist = _context.InterviewPreps.Find(id);
            if (exist == null)
            {
                return BadRequest(BadRequest("Does not exist"));
            }

            _context.Remove(exist);
            _context.SaveChanges();
            return NoContent();
        }

        // Create an InterviewPrep
        [HttpPut]
        public IActionResult CreateInterview(int id, InterviewPrep interviewPrep)
        {
            interviewPrep.Id = 0;
            _context.Add(interviewPrep.Answer);
            _context.Add(interviewPrep.Question);
            interviewPrep.PreparedDate = DateTime.Now;

            _context.SaveChanges();
            return NoContent();
        }
    }
}
