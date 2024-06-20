import express from 'express'
import dotenv from 'dotenv'
dotenv.config();
//import grades from './routes/grades.mjs'; line to import from routes folder

const PORT = process.env.PORT || 3000;
const app = express();

//body parser middleware
//enables server to parse incoming json data, and then places it in the req.body
app.use(express.json());

//import './db/conn.mjs'
app.use('/grades', grades);


app.get('/', (req, res) =>{
    res.send(`<h1 style='color:blue'>Welcome to the API in here</h1>`);
});

app.use((err, req, res, next) => {
    res.status(500).send('Whoopsy doopsy, we messed up somewhere...')
});

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
})