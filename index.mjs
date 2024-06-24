import express from 'express'
import dotenv from 'dotenv'
dotenv.config();
import guardians from './routes/guardians.mjs'; 
import exotics from './routes/exotics.mjs'; 


const PORT = process.env.PORT || 3000;
const app = express();

//body parser middleware
//enables server to parse incoming json data, and then places it in the req.body
app.use(express.json());

app.use((req, res, next) => { //setting up logging middleware to log all CRUD requests
    const time = new Date();
  
    console.log(
      `-----
  ${time.toLocaleTimeString()}: Received a ${req.method} request to ${req.url}.`
    );
    if (Object.keys(req.body).length > 0) {
      console.log('Containing the data:');
      console.log(`${JSON.stringify(req.body)}`);
    }
    next();
  });

app.use('/guardians', guardians);
app.use('/exotics', exotics);



app.get('/', (req, res) =>{
    res.send(`<h1 style='color:blue'>Welcome to the API in here</h1>`);
});

app.use((err, req, res, next) => {
    res.status(500).send('Whoopsy doopsy, we messed up somewhere...')
});

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
})