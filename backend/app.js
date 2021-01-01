const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const db = require('./models/index');

const errorMiddleware = require('./middleware/errorMiddleware');
const ridesRoutes = require('./routes/rides');
const authRoutes = require('./routes/auth');

const app = express();
const server = require('http').createServer(app);

//middlewares
app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/rides', ridesRoutes);
app.use('/api/auth', authRoutes);

app.use(morgan('dev'));
app.use(errorMiddleware.notFound);
app.use(errorMiddleware.errorHandler);

db.sequelize.sync(/* { force: true } */);

const port = process.env.PORT || 3000;

server.listen(port);
