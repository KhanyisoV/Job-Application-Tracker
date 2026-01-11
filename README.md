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

# 🗃️ Data Model

Each job application contains:

Company name

Position title

Application status (Applied, Interview, Offer, Rejected)

Date applied

# ⚙️ Requirements
Backend

.NET 7 or later

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
