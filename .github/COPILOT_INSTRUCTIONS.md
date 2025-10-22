# Copilot Instructions for Downforce Backend

Welcome to the Downforce Backend repository! This document provides guidance for GitHub Copilot and other AI-powered assistants contributing to this project.

## Repository Overview

This is a Node.js/Express backend service for the Downforce racing board game. The application provides:
- Real-time game state management using Socket.io
- RESTful API endpoints for game operations
- MongoDB database with Mongoose ODM
- User authentication with JWT
- Express-based routing and middleware

## Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Real-time**: Socket.io
- **Authentication**: JWT (jsonwebtoken) + bcryptjs
- **Validation**: express-validator
- **View Engine**: EJS

## Project Structure

```
/bin              - Server startup scripts
/config           - Configuration files (database, etc.)
/controllers      - Business logic controllers
/helpers          - Utility functions
/models           - Mongoose data models
/routes           - Express route definitions
/schemas          - Validation schemas
/store            - State management
/views            - EJS templates
/public           - Static assets
/responses        - API response formatters
```

## Detection Algorithm for Changes

When making changes to this repository, follow this decision tree:

1. **New Game Logic**: Add to `/controllers/GameController.js` or create new controller
2. **New API Endpoint**: Define route in `/routes/` and link to controller
3. **Database Schema**: Add/modify models in `/models/`
4. **Validation Rules**: Update schemas in `/schemas/`
5. **Real-time Events**: Modify Socket.io handlers in `app.js`
6. **Configuration**: Update `/config/` files (never commit secrets!)

## Pull Request Checklist

Before submitting a PR, ensure:

- [ ] **Tests**: Run `npm test` (if tests exist) - all tests pass
- [ ] **Linting**: Run any linters (check `.pre-commit-config.yaml`)
- [ ] **Documentation**: Update relevant docs if API changes
- [ ] **Security**: No secrets, API keys, or credentials committed
- [ ] **Dependencies**: Run `npm audit` to check for vulnerabilities
- [ ] **Code Review**: Changes are minimal and focused
- [ ] **Error Handling**: Proper try-catch blocks for async operations
- [ ] **Validation**: Input validation for all user-facing endpoints

## Testing Guidance

Currently, test infrastructure may be minimal. When adding tests:
- Place tests in a `/test` directory
- Use a testing framework like Jest or Mocha
- Test controllers independently from routes
- Mock database calls for unit tests
- Test socket events for real-time features

To run the application locally:
```bash
npm install
npm start
```

Server will start on the port defined in environment variables.

## Security Best Practices

### Critical Rules
1. **Never commit** `.env` files or credentials
2. **Always validate** user input with express-validator
3. **Sanitize** database queries to prevent injection
4. **Use JWT** for authentication on protected routes
5. **Hash passwords** with bcryptjs before storing
6. **Rate limit** API endpoints to prevent abuse
7. **CORS**: Configure appropriately for production

### Common Vulnerabilities to Avoid
- SQL/NoSQL injection via unsanitized input
- Cross-Site Scripting (XSS) in rendered views
- Authentication bypass on protected routes
- Exposed sensitive data in error messages
- Missing input validation on POST/PUT endpoints

## Automation Guidelines

### Acceptable Automated Changes
- Adding new routes with proper validation
- Creating new controllers following existing patterns
- Updating documentation
- Adding unit tests
- Fixing security vulnerabilities
- Refactoring for code quality

### Changes Requiring Human Review
- Database schema migrations
- Authentication/authorization logic
- Socket.io event handling changes
- Environment configuration changes
- Dependency version updates (major versions)

## Code Style

Follow the existing code style in the repository:
- Use `const` and `let`, avoid `var` where possible
- Async/await for asynchronous operations
- Consistent error handling patterns
- Meaningful variable and function names
- Comments for complex business logic only

## Common Patterns

### Creating a New Route
```javascript
// In /routes/yourroute.js
const express = require('express');
const router = express.Router();
const YourController = require('../controllers/YourController');

router.post('/', async (req, res) => {
  try {
    const controller = new YourController();
    const result = await controller.yourMethod(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
```

### Creating a New Model
```javascript
// In /models/YourModel.js
const mongoose = require('mongoose');

const yourSchema = new mongoose.Schema({
  field: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('YourModel', yourSchema);
```

## Contact & Support

For questions or issues, please create a GitHub issue or contact the repository maintainers.

---

**Remember**: Quality over quantity. Make surgical, well-tested changes that improve the codebase without breaking existing functionality.
