import express from 'express'
import mongoose from 'mongoose';
import cors from 'cors'
import npcRoutes from './routes/npcRoutes.js'

const app = express();
app.use(cors());

app.use(express.json({ limit: '50mb', extended: true }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use('/npclist', npcRoutes);

const CONNECTION_URL = 'mongodb+srv://Markerater:Rockbomb123@cluster0.59vbm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, {
    useNewUrlParser:true, useUnifiedTopology:true
}).then(() => app.listen(PORT, () =>
console.log(`Connection Success! Port: ${PORT}`)
)).catch((err) => console.log(err.message));