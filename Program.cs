using JobApplicationTracker.Controllers;
using JobApplicationTracker.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.WebHost.ConfigureKestrel(options =>
{
    options.ListenAnyIP(80); // listen on container port 80
});

// Add services to the container.
builder.Services.AddDbContext<AppDbContext>(options =>
{
    var connString =
        builder.Configuration.GetConnectionString("DefaultConnection")
        ?? Environment.GetEnvironmentVariable("AZURE_SQL_CONNECTIONSTRING");

    if (string.IsNullOrWhiteSpace(connString))
        throw new Exception("SQL connection string not found");

    options.UseSqlServer(connString);
});

builder
    .Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(
            new System.Text.Json.Serialization.JsonStringEnumConverter()
        );
    });

builder.Services.AddCors(options =>
{
    options.AddPolicy(
        "AllowFrontend",
        policy =>
        {
            policy
                .WithOrigins(
                    "https://jobtracker-frontend-chd0d5hva6e3buh2.southafricanorth-01.azurewebsites.net",
                    "http://localhost:3000", // Add for local testing
                    "http://localhost:5173" // Add for local testing
                )
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials(); // Add this if you need cookies/auth
        }
    );
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

// IMPORTANT: UseCors must come BEFORE UseHttpsRedirection
app.UseCors("AllowFrontend");

// Comment this out if running on HTTP only
// app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
