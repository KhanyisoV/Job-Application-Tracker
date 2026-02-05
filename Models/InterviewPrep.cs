using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace JobApplicationTracker.Models
{
    public class InterviewPrep
    {
        [Key]
        public int Id { get; set; }
        public string? Question { get; set; }
        public string? Answer { get; set; }
        public DateTime? PreparedDate { get; set; }
        public int JobApplicationId { get; set; }
        public JobApplication JobApplication { get; set; }
    }
}
