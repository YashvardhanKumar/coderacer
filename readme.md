# Coderacer

A problem solving platform where you can practice questions for Online Assessments and Interviews

## Precommit Checks

This project has automated precommit checks enabled using Husky and lint-staged:

- **ESLint**: Code quality checks for all TypeScript/JavaScript files
- **Prettier**: Automatic code formatting
- **Commitlint**: Ensures commit messages follow conventional standards

The checks run automatically before each commit to maintain code quality.

## Prerequisites

Install the following

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Quick Start

1. Clone this repository:
   ```bash
   git clone https://github.com/YashvardhanKumar/coderacer.git
   cd coderacer
   ```
2. Run the following commands from the root directory
   - `cd client/user && yarn`
   - `cd client/contributor && yarn`
   - `cd server && yarn`
3. Start all services with a single command:

   ```bash
   docker-compose up -d
   ```

   This will start all containers in detached mode.

4. Access the application:
   ```
   http://localhost
   ```

## Components

This application uses several Docker containers:

- Frontend: User interface for the coding platform
- Backend API: Handles user requests and business logic
- Database: Stores user data, challenges, and results
- Nginx: Acts as a reverse proxy and serves static files

## Common Commands

### View logs

```bash
# View logs for all services
docker-compose logs

# View logs for a specific service
docker-compose logs [service_name]

# Follow logs in real-time
docker-compose logs -f
```

### Stop the application

```bash
docker-compose down
```

### Rebuild containers after file changes

```bash
docker-compose build
docker-compose up -d
```

## Configuration

The application can be configured through environment variables in the `docker-compose.yml` file.

## Development

To make changes to the application:

1. Modify the source code
2. Rebuild the containers with `docker-compose build`
3. Restart with `docker-compose up -d`

## Troubleshooting

If you encounter any issues:

- Check the logs with `docker-compose logs`
- Ensure all required ports are available
- Try restarting with `docker-compose restart`
- For persistent problems, try `docker-compose down -v` followed by `docker-compose up -d`

## License

This project is licensed under the MIT License - see the LICENSE file for details.
