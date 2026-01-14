using System.Reflection.Metadata.Ecma335;
using Microsoft.AspNetCore.Mvc.Formatters;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;

namespace JobApplicationTracker.Models

{
    public enum ApplicationStatus
    {
        Accepted, Rejected, Awaiting

    }
    public class JobApplication
    {

        [Key]
        public int JobId { get; set; }
        public string Name { get; set; }
        public string? JobDescription { get; set; }
        public ApplicationStatus Status { get; set; }

        public DateTime? Modified { get; set; }

        public DateTime? AppliedDate { get; set; }
       

    }
}
