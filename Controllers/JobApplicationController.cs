using Microsoft.EntityFrameworkCore;
using JobApplicationTracker.Models;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Mvc;
using JobApplicationTracker.Data;
using Microsoft.AspNetCore.Mvc.Infrastructure;

namespace JobApplicationTracker.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class JobApplicationController : ControllerBase
    {
        private readonly AppDbContext _context;
        public JobApplicationController(AppDbContext context)
        {
            this._context = context;
        }

        //get all jobs in the database and desplay them
        [HttpGet]
        public IActionResult GetAllJobApplications()
        {
            var jobApplications = _context.JobApplications.ToList();
            return Ok(jobApplications);
        }

        //gets a single job application
        [HttpGet("{id}")]
        public IActionResult GetJobApplication(int id)
        {
            var jobApplication = _context.JobApplications.Find(id);
            if (jobApplication == null)
            {
                return NotFound();
            }
            return Ok(jobApplication);
        }

        //Creates a new job application

        [HttpPost]
        public IActionResult CreateJobApplication(JobApplication jobapplication)
        {

            jobapplication.JobId = 0;
            _context.JobApplications.Add(jobapplication);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetJobApplication), new {id = jobapplication.JobId},jobapplication);
        }

        // Updates job application

        [HttpPut("{id}")]
        public IActionResult UpdateApplication(int id,JobApplication jobApplication)
        {
            var existing = _context.JobApplications.Find(id);
            if (existing == null)
            {
                return BadRequest( BadRequest("Does not exist") );
            }
            

            existing.JobDescription = jobApplication.JobDescription;
            existing.Name = jobApplication.Name;
            existing.Status = jobApplication.Status;

            _context.SaveChanges();
            return NoContent();
        }


        // Deletes Job application

        [HttpDelete("{id}")]
        public IActionResult DeleteJobApplication(int id)
        {
            var exist =_context.JobApplications.Find(id);
            if(exist == null)
            {
                return NotFound();
            }
            _context.Remove(exist);
            _context.SaveChanges();
            return NoContent();
        }




    }
}
