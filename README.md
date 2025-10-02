# Blogging Platform API

A simple RESTful API for managing blog posts built with TypeScript, Express.js, and MySQL.

## Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment**
   
   Create `config.env`:
   ```env
   ENV=development
   PORT=3000
   DB_HOST=localhost
   DB_USER=your_mysql_username
   DB_PASSWORD=your_mysql_password
   DB_DATABASE=blog_app
   ```

3. **Create MySQL table**
   ```sql
   CREATE TABLE blogs (
     id INT AUTO_INCREMENT PRIMARY KEY,
     title VARCHAR(255) NOT NULL,
     content TEXT NOT NULL,
     category VARCHAR(100),
     tags JSON,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
   );
   ```

4. **Start server**
   ```bash
   npm start
   ```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/posts` | Get all posts |
| GET    | `/posts/:id` | Get post by ID |
| POST   | `/posts` | Create new post |
| PUT    | `/posts/:id` | Update post (full) |
| PATCH  | `/posts/:id` | Update post (partial) |
| DELETE | `/posts/:id` | Delete post |

## Request Body Example

```json
{
  "title": "My Blog Post",
  "content": "Post content here...",
  "category": "Technology",
  "tags": ["nodejs", "api"]
}
```

## Tech Stack

- Node + TypeScript + Express.js
- MySQL db
- Error handling with transactions

## Roadmap

- https://roadmap.sh/projects/blogging-platform-api
