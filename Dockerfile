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

# Install Poetry
RUN curl -sSL https://install.python-poetry.org | python3 -

# Add Poetry to PATH
ENV PATH="${PATH}:/root/.local/bin"

# Copy the pyproject.toml and poetry.lock files
COPY apps/backend/pyproject.toml apps/backend/poetry.lock* ./

# Install project dependencies
RUN poetry config virtualenvs.create false \
  && poetry install --no-interaction --no-ansi

# Copy the rest of the application code
COPY apps/backend .

# Expose the port the app runs on
EXPOSE 5000

# Command to run the application
CMD ["poetry", "run", "flask", "run", "--host=0.0.0.0"]
