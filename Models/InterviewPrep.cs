using System.ComponentModel.DataAnnotations;

namespace JobApplicationTracker.Models
{
    public class InterviewPrep
    {
        [Key]
        public int Id { get; set; }

        public int JobApplicationId { get; set; }
        public JobApplication? JobApplication { get; set; }

        // Match frontend field names
        public string? Content { get; set; } // Changed from Question
        public string? Notes { get; set; } // Changed from Answer
        public DateTime PreparedDate { get; set; }
    }
}
