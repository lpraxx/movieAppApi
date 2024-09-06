const express = require("express");
const mongoose = require("mongoose");

const cors = require("cors");
require('dotenv').config();

const workoutRoutes = require("./routes/workout");
const userRoutes = require("./routes/user");

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const corsOptions = {
	origin: ['http://localhost:3000'],
	credentials: true,
	optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

mongoose.connect('mongodb+srv://alonsolaira:8ubG8Bg8lusXj9pU@b422-cluster.vqahcau.mongodb.net/fitness-API?retryWrites=true&w=majority');
mongoose.connection.once('open', () => console.log('Now connected to MongoDB Atlas.'))

app.use("/workouts", workoutRoutes);
app.use("/users", userRoutes);

if(require.main === module){
	app.listen(process.env.PORT || 4000, () => {
	    console.log(`API is now online on port ${ process.env.PORT || 4000 }`)
	});
}

module.exports = { app, mongoose };