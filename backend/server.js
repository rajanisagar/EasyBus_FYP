import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routers/userRouter.js';
import busRouter from './routers/busRouter.js';
import path from 'path';
import orderRouter from './routers/orderRouter.js';



dotenv.config()
const app = express();
const DB = 'mongodb://localhost:27017/easybus'
app.use(express.json());
app.use(express.urlencoded({extended: true}))
mongoose.connect(DB, {
    // userNewUrlParser: true,
    // useCreateIndex: true,
    // useUnifiedTopology: true,
    // useFindAndModify: false
    
}).then(() => {
    console.log(`connection succesfull`)
}).catch((err) => {console.log(err)});




const __dirname = path.resolve();
app.use('/api/users', userRouter)
app.use('/api/buses', busRouter);
app.use('/api/orders', orderRouter);
app.use(express.static(path.join(__dirname, '/frontend/build')))
app.get('*', (req, res) => res.sendFile(path.join(__dirname, '/frontend/build/index.html'))) 
// app.get('/',(req,res) => {
//     res.send('Server is ready')
// });




app.use((err, req, res, next) => {
    // res.sendStatus(500).send({ message : err.message})
})
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log('Server at locahost 5000')
});