const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const courseRoutes = require('./routes/courseRoutes');

dotenv.config();
const secret = process.env.CONNECTION_STRING;
const app = express();
const port = process.env.PORT || 5000;


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());


mongoose.connect(secret, 
	{
		useNewUrlParser : true,
		useUnifiedTopology : true
	}
);


let db = mongoose.connection;

db.on('error', console.error.bind(console, "Connection Error"));
db.once('open', () => console.log("Successfully connected to MongoDB"));


app.use('/users', userRoutes);
app.use('/courses', courseRoutes);



app.get('/', (req, res) => {
	res.send('Hosted on heroku');
})


//error handlers
app.use((req, res, next) => {
	const error = new Error('Not found');
	error.status = 404;
	next(error);
})

app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.send(`Error: ${error.message}`);
})

app.listen(port, () => console.log(`Server running at port ${port}`))
