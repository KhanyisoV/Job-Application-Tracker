using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;


namespace JobApplicationTracker.Models
{
    public class Interview
    {
        [Key]
        public int Id { get; set; }

        public int JobApplicationId { get; set; }

        [JsonIgnore]
        public JobApplication? JobApplication { get; set; }

        // Match frontend field names
        public string? Date { get; set; } // Changed from InterviewDate
        public string? Time { get; set; } // New field
        public string? Location { get; set; } // Keep as is
        public string? Notes { get; set; } // Changed from Description
    }
}
