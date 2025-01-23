var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const gameRoutes = require('./routes/gameRoutes');

var app = express();

const server = http.createServer(app);
const io = socketIo(server);

mongoose.connect('mongodb://127.0.0.1:27017/', {});

// Socket.io event handlers
io.on('connection', (socket) => {
  socket.on('joinGame', async (gameId) => {
    socket.join(gameId);
    // Handle player joining game
  });

  socket.on('placeBid', async (data) => {
    const { gameId, playerId, card } = data;
    const gameService = new GameService(gameId);
    
    try {
      const updatedGame = await gameService.submitBid(playerId, card);
      io.to(gameId).emit('gameUpdated', updatedGame);
    } catch (error) {
      socket.emit('error', error.message);
    }
  });
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/games', gameRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
