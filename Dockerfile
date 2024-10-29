# Use an official Python runtime as the base image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app/backend

# Install system dependencies
RUN apt-get update && apt-get install -y \
  build-essential \
  curl \
  libpq-dev \
  && rm -rf /var/lib/apt/lists/*


# Copy the rest of the application code
COPY apps/backend .

RUN pip install -r requirements.txt

# Expose the port the app runs on
EXPOSE 5000

# Command to run the application
CMD ["flask", "--app", "backend/app.py", "run", "--host=0.0.0.0"]
