using System.ComponentModel.DataAnnotations;

namespace JobApplicationTracker.Models
{
    public class Interview
    {
        [Key]
        public int Id { get; set; }
        public string? Description { get; set; }
        public string? Location { get; set; }
        public DateTime? InterviewDate { get; set; }

        public JobApplication? JobApplication { get; set; }
        public int? JobApplicationId { get; set; }
        public string? InterviewType { get; set; }
    }
}
