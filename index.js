const express = require("express");
const mongoose = require("mongoose");

const cors = require("cors");
require('dotenv').config();

const userRoutes = require("./routes/user");
const movieRoutes = require('./routes/movie');
const commentRoutes = require('./routes/comment');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const corsOptions = {
	origin: ['http://localhost:3000'],
	credentials: true,
	optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

mongoose.connect('mongodb+srv://alonsolaira:8ubG8Bg8lusXj9pU@b422-cluster.vqahcau.mongodb.net/movie-App-API?retryWrites=true&w=majority');
mongoose.connection.once('open', () => console.log('Now connected to MongoDB Atlas.'))

app.use('/users', userRoutes);
app.use('/movies', movieRoutes);
app.use('/comments', commentRoutes);

if(require.main === module){
	app.listen(process.env.PORT || 4000, () => {
	    console.log(`API is now online on port ${ process.env.PORT || 4000 }`)
	});
}

module.exports = { app, mongoose };