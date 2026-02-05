using JobApplicationTracker.Models;
using Microsoft.EntityFrameworkCore;

namespace JobApplicationTracker.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options) { }

        public DbSet<JobApplication> JobApplications { get; set; }

        public DbSet<Interview> Interviews { get; set; }

        public DbSet<InterviewPrep> InterviewPreps { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<JobApplication>().Property(j => j.Status).HasConversion<string>();

            modelBuilder.Entity<Interview>().Property(i => i.InterviewType).HasConversion<string>();

            modelBuilder.Entity<InterviewPrep>().Property(ip => ip.Question).HasMaxLength(500);
        }
    }
}
