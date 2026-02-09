# 📌 Job Application Tracker

A full-stack Job Application Tracker built to demonstrate practical experience with ASP.NET Core Web API, Entity Framework Core, SQL Server, React, and Docker.

This project is designed as a learning-focused, resume-ready application that follows real-world development practices while keeping the core functionality simple.

# 🧠 Project Overview

The Job Application Tracker allows users to manage job applications by:

Adding new job applications

Viewing a list of applications

Updating application status

Deleting applications

The application follows a frontend + backend + database architecture and exposes a RESTful API consumed by a React frontend.

### Features
- **Real-time Job Search**: Search for jobs by keywords and location across South Africa
- **Direct Integration**: Save job listings directly to your applications with pre-filled details
- **Comprehensive Results**: View job title, company, location, salary range, and description
- **External Links**: Quick access to full job postings on external sites

### How It Works
1. Navigate to the **Job Search** tab
2. Enter job title/keywords (e.g., "Software Engineer", "Data Analyst")
3. Specify location (e.g., "Cape Town", "Johannesburg")
4. Browse up to 20 matching results
5. Click **Save to Applications** to add a job directly to your tracker
6. Click **View Job** to open the full listing on the employer's site

### API Details
- **Provider**: Adzuna API
- **Region**: South Africa (ZA)
- **Results per search**: 20
- **Data returned**: Job title, company name, location, salary range, description, posting date, and redirect URL

This feature streamlines the job application process by eliminating manual data entry and keeping all opportunities in one centralized location.

# 🏗️ Tech Stack
Backend

ASP.NET Core Web API

Entity Framework Core

SQL Server

RESTful API design

Frontend

React

JavaScript (ES6+)

Fetch API / Axios

Basic CSS

DevOps (Planned)

Docker

Docker Compose


# 🔁 Development Plan

This project is being built in stages to maintain clarity and learning focus:

Create ASP.NET Core Web API (no Docker)

Add Entity Framework Core + SQL Server locally

Implement CRUD API endpoints

Build React frontend

Dockerize API and SQL Server

(Optional) Dockerize React frontend

# 📡 API Functionality

The API exposes the following endpoints:

Method	Endpoint	Description
GET	/api/jobs	Get all job applications
GET	/api/jobs/{id}	Get a specific job application
POST	/api/jobs	Create a new job application
PUT	/api/jobs/{id}	Update an existing job application
DELETE	/api/jobs/{id}	Delete a job application

### External API Integration
Adzuna Job Search API | Fetch real-time job listings | `https://api.adzuna.com/v1/api/jobs/za/search/1` 

# 🗃️ Data Model

### Job Application
- Company name
- Position title
- Job description
- Application status (Accepted, Rejected, Awaiting)
- Salary offer
- Date applied

### Interview
- Associated job application (foreign key)
- Interview date
- Interview time
- Location
- Notes

### Interview Preparation
- Associated job application (foreign key)
- Preparation questions
- Answers/notes

### External Job Search Results (Adzuna)
- Job title
- Company name
- Location
- Salary range (min/max)
- Job description
- Posted date
- External application URL

# ⚙️ Requirements
Backend

.NET 8 or later

SQL Server (LocalDB or SQL Server Express)

Entity Framework Core CLI

Frontend

Node.js (v18 or later)

npm or yarn

Tools

Git

Visual Studio / VS Code

# ▶️ Running the Project (Current Phase)
Backend
cd backend/JobTracker.Api
dotnet restore
dotnet run


The API will be available at:

https://localhost:5001

Frontend (added later)
cd frontend/job-tracker-ui
npm install
npm start

# 🐳 Docker Support (Planned)

The project will later be containerized using Docker and Docker Compose to run:

ASP.NET Core API

SQL Server

Instructions will be added once Docker support is implemented.

# 🎯 Project Goals

Demonstrate understanding of RESTful APIs

Practice backend development with ASP.NET Core

Learn database integration using Entity Framework Core

Build a frontend that consumes an API

Gain hands-on experience with Docker

# 🚀 Future Improvements

Authentication and authorization

Input validation and error handling

Improved UI styling

Deployment to cloud (Azure)

# 📄 License

This project is for educational and portfolio purposes.


#URL
https://jobtracker-frontend-chd0d5hva6e3buh2.southafricanorth-01.azurewebsites.net/


https://jobtracker-backend-f7bxc9fyg4htendh.southafricanorth-01.azurewebsites.net/
