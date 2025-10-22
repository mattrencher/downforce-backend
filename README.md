# 🏁 Downforce Backend 🏎️

```
    _____   ____  _    _ _   _ ______ ____  _____   _____ ______ 
   |  __ \ / __ \| |  | | \ | |  ____/ __ \|  __ \ / ____|  ____|
   | |  | | |  | | |  | |  \| | |__ | |  | | |__) | |    | |__   
   | |  | | |  | | |  | | . ` |  __|| |  | |  _  /| |    |  __|  
   | |__| | |__| | |__| | |\  | |   | |__| | | \ \| |____| |____ 
   |_____/ \____/ \____/|_| \_|_|    \____/|_|  \_\\_____|______|
                                                                  
        🏎️💨  The Backend That Powers the Race!  💨🏁
```

Welcome to the **Downforce Backend** - where speed meets strategy! This is the Node.js backend service powering the digital version of the beloved Downforce racing board game. Strap in, because we're about to take you on a tour of this high-octane codebase! 

## 🎮 What Is This?

Downforce is a fast-paced racing game where players bid on race cars and then try to make the cars they own score the most points. This backend handles:

- 🎯 **Real-time Game State** - Socket.io keeps all players in sync
- 🔐 **Player Authentication** - JWT-based secure access
- 🗄️ **Game Persistence** - MongoDB stores all that racing drama
- 🎲 **Game Logic** - Bidding, movement, and victory conditions
- 🌐 **RESTful API** - Clean endpoints for all game operations

## 🚀 Quick Start (Get Racing!)

### Prerequisites
- Node.js (v14 or higher recommended)
- MongoDB (running locally or remote connection)
- A need for speed! 🏎️

### Installation

```bash
# Clone this bad boy
git clone https://github.com/mattrencher/downforce-backend.git
cd downforce-backend

# Install the goods
npm install

# Set up your environment (create a .env file)
# Don't worry, we've got .env in .gitignore - your secrets are safe!
cp .env.example .env  # If we had an example file (hint: we should!)

# Fire up the engine!
npm start
```

Your server should now be running and ready to handle some high-speed racing action! 🏁

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                     CLIENT APPS                          │
│              (Web, Mobile, Desktop)                      │
└────────────┬────────────────────────────┬───────────────┘
             │                            │
        REST API                    WebSocket (Socket.io)
             │                            │
┌────────────┴────────────────────────────┴───────────────┐
│                   EXPRESS SERVER                         │
│  ┌──────────┐  ┌───────────┐  ┌──────────────────┐    │
│  │  Routes  │→ │Controllers│→ │  Models/Database │    │
│  └──────────┘  └───────────┘  └──────────────────┘    │
└──────────────────────────────────────────────────────────┘
                          ↓
              ┌───────────────────────┐
              │   MongoDB Database    │
              │   (Game State Lives)  │
              └───────────────────────┘
```

## 📁 Project Structure (Your Pit Crew)

```
downforce-backend/
│
├── 📂 bin/              # Server startup scripts - the ignition!
├── 📂 config/           # Configuration files (database, etc.)
├── 📂 controllers/      # Business logic - where the magic happens
├── 📂 models/           # Mongoose models - data shapes
├── 📂 routes/           # API endpoints - the track layouts
├── 📂 schemas/          # Validation rules - no cheating!
├── 📂 helpers/          # Utility functions - your toolkit
├── 📂 store/            # State management 
├── 📂 views/            # EJS templates
├── 📂 public/           # Static files (if any)
├── 📂 responses/        # API response formatters
├── 📄 app.js            # Main application file - the engine
└── 📄 package.json      # Dependencies and scripts
```

## 🛠️ Tech Stack (Our Racing Team)

- **🟢 Node.js** - The engine
- **⚡ Express.js** - The chassis
- **🔌 Socket.io** - Real-time pit-to-driver radio
- **🍃 MongoDB + Mongoose** - The telemetry system
- **🔐 JWT + bcryptjs** - The security detail
- **✅ express-validator** - The race officials

## 🎯 Key Features

### Real-Time Gameplay
Socket.io enables instant updates across all connected players. When someone places a bid or moves a car, everyone knows immediately!

### Secure Authentication  
JWT tokens keep your players' identities secure. No one's sneaking onto the track!

### Flexible Game State
MongoDB stores complex game states with ease. Track positions, bid history, player scores - it's all there.

### Input Validation
Every endpoint is protected by express-validator. Bad data doesn't make it past the starting line!

## 🔌 API Endpoints (The Track Map)

### Games
- `GET /games` - List all games
- `POST /games` - Create a new game
- `POST /games/:gameId/start` - Start the race!

### Users  
- `POST /users/register` - Sign up a new racer
- `POST /users/login` - Get your credentials checked

### Socket Events
- `joinGame` - Enter the race
- `placeBid` - Put your money where your car is
- `gameUpdated` - Broadcast game state changes

*(Check the route files for complete endpoint documentation)*

## 🧪 Testing (Lap Times Matter)

```bash
# Run tests (when they exist)
npm test

# Check for security issues
npm audit

# Fix any auto-fixable issues
npm audit fix
```

## 🔒 Security First!

We take security seriously around here:
- ✅ No credentials in code
- ✅ Input validation on all endpoints  
- ✅ Password hashing with bcryptjs
- ✅ JWT for authentication
- ✅ MongoDB injection prevention via Mongoose

See `.github/COPILOT_INSTRUCTIONS.md` for detailed security guidelines!

## 🤝 Contributing (Join the Pit Crew!)

Want to contribute? Awesome! Here's how:

1. **Fork** the repo
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Make** your changes (keep them focused!)
4. **Test** your changes thoroughly
5. **Commit** with clear messages
6. **Push** to your branch
7. **Open** a Pull Request

### PR Checklist
- [ ] Tests pass
- [ ] No secrets committed
- [ ] Code follows existing style
- [ ] Documentation updated (if needed)
- [ ] Changes are minimal and focused

Check out `.github/COPILOT_INSTRUCTIONS.md` for detailed contribution guidelines!

## 🐛 Found a Bug? (Flat Tire?)

Open an issue on GitHub! Include:
- What you expected to happen 🤔
- What actually happened 😱  
- Steps to reproduce 🔁
- Your environment (Node version, OS, etc.) 💻

## 📚 Documentation

- **API Docs**: *(Coming soon - or check the route files!)*
- **Game Rules**: *(Link to Downforce game rules)*
- **Copilot Guide**: `.github/COPILOT_INSTRUCTIONS.md`

## 🎨 Code Style

We keep it clean and consistent:
- Use `const` and `let` (avoid `var`)
- Async/await for async operations
- Meaningful names (no single letters unless in loops!)
- Comments for complex logic only
- Error handling everywhere

## 📝 Environment Variables

Create a `.env` file with these variables:

```bash
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/downforce

# JWT Secret (make this strong!)
JWT_SECRET=your-super-secret-key-change-this

# Server Port
PORT=3000

# Node Environment
NODE_ENV=development
```

**⚠️ NEVER commit your .env file! It's in .gitignore for a reason!**

## 🚦 Development Workflow

```bash
# Install dependencies
npm install

# Start the server in development
npm start

# The server will restart on file changes (if using nodemon)
# Otherwise, restart manually after changes
```

## 🏆 Acknowledgments

- The Downforce board game creators
- The amazing open-source community
- Coffee ☕ (lots of it)
- Race car drivers everywhere 🏎️

## 📜 License

*(Add your license here - MIT, Apache, etc.)*

## 🎉 Final Words

Remember: In Downforce, it's not just about having the fastest car - it's about being in the right place at the right time! The same applies to code: write it smart, keep it clean, and always think ahead.

Now get out there and build something awesome! 🏁

```
                         ___
                       _/   \__
                  ___/   __    \___
             ___/   __/   \__   \__\___
        ___/   __/   \_    /  \     \  \___
    ___/      /  \_    \_/    \_    \_    \___
   |         /    |                  |      __|
   |___     /    /                    \    |  
       |___/    |                      |___|
                |______________________|
                    
              KEEP RACING, KEEP CODING!
```

---

**Happy Racing! 🏎️💨** 

Made with ❤️ and a healthy dose of competitive spirit.
