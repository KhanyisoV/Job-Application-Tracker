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
    public class JobApplicationController : Controller
    {
        private readonly AppDbContext _context;
        public JobApplicationController(AppDbContext context)
        {
            this._context = context;
        }

        //get all jobs in the database and desplay them
        [HttpGet]
        public IActionResult getAllJobApplications()
        {
            var jobApplications = _context.JobApplications.ToList();
            return Ok(jobApplications);
        }

        //gets a single job application
        [HttpGet]
        public IActionResult getJobApplication(JobApplication jobApplication)
        {
            return Ok(jobApplication);
        }

        //Creates a new job application

        [HttpPost]
        public IActionResult createJobApplication(JobApplication jobapplication)
        {
            return CreatedAtAction(nameof(jobapplication), new {id = jobapplication.JobId},jobapplication);
        }

        // Updates job application

        [HttpPut]
        public IActionResult updateApplication(int id,JobApplication jobApplication)
        {
            return NoContent();
        }


        // Deletes Job application

        [HttpDelete]
        public IActionResult deleteJobApplication(int id)
        {
            return NoContent();
        }




    }
}
