# Stage 1: Build the app
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy csproj and restore dependencies
COPY ["JobApplicationTracker.csproj", "./"]
RUN dotnet restore "JobApplicationTracker.csproj"

# Copy all source code and publish
COPY . .
RUN dotnet publish "JobApplicationTracker.csproj" -c Release -o /app/publish

# Stage 2: Runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app

# Copy published app from build stage
COPY --from=build /app/publish .

# Expose port 80 (for Azure)
EXPOSE 80

# Run the app
ENTRYPOINT ["dotnet", "JobApplicationTracker.dll"]
