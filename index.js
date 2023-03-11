// setup
import cors from 'cors';
import express from 'express';
const port = process.env.port || 5000

const app = express();
// middleware 
app.use(cors());
app.use(express.json());


//api route

app.get('/', (req,res)=>{
    res.send('Hello world')
})

app.use((req, res, next) => {
    next(createError.NotFound());
  });
  
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
      status: err.status || 500,
      message: err.message,
    });
  });


app.listen(port,()=>{
    console.log('app is running', port);
})