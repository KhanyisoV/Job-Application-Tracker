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

            modelBuilder.Entity<Interview>().Property(i => i.Notes).HasConversion<string>();

            modelBuilder.Entity<InterviewPrep>().Property(ip => ip.Question).HasMaxLength(500);

            modelBuilder
                .Entity<Interview>()
                .HasOne(i => i.JobApplication)
                .WithMany(j => j.Interviews)
                .HasForeignKey(i => i.JobApplicationId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder
                .Entity<InterviewPrep>()
                .HasOne(ip => ip.JobApplication)
                .WithMany(j => j.InterviewPreps)
                .HasForeignKey(ip => ip.JobApplicationId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
