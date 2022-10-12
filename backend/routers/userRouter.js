import express from 'express'
import User from '../models/userModel.js'
import data from '../data.js'
import expressAsyncHandler from 'express-async-handler'
import bcrypt from 'bcryptjs'
import { generateToken, isAdmin, isAuth } from '../utils.js'
import e from 'express'

const userRouter = express.Router();

userRouter.get('/seed', expressAsyncHandler(async(req, res) => {
    await User.deleteMany({})
    const createdUsers = await User.insertMany(data.users)
    res.send({createdUsers})
}))


userRouter.post('/signin', expressAsyncHandler(async (req, res) => {
    const user= await User.findOne({email: req.body.email})
    // console.log(user)
    if(user){
        if(bcrypt.compareSync(req.body.password, user.password)) {  
            res.send({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                isSeller: user.isSeller,
                token: generateToken(user)
            })
            return;            
            }
        }
        res.sendStatus(401).send({message: 'invalid email or password'})
    })
);
userRouter.post('/register', expressAsyncHandler(async(req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone || "",
        cnic: req.body.cnic  || "",
        isSeller: req.body.cnic ? true : false,
        password: bcrypt.hashSync(req.body.password, 8),
    })
    const creattedUser = await user.save()
    res.send({
        _id: creattedUser._id,
        name: creattedUser.name,
        email: creattedUser.email,
        isAdmin: creattedUser.isAdmin,
        isSeller: creattedUser.isSeller,
        token: generateToken(creattedUser)
    })
})
) 

userRouter.get('/:id', expressAsyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id)
    if(user){
        res.send(user)
    }
    else {
        res.sendStatus(404).send({message: 'User Not Found'})
    }
}))
userRouter.put(
    '/profile',
    isAuth,
    expressAsyncHandler(async (req, res) => {
      const user = await User.findById(req.user._id);
      if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (user.isSeller) {
          user.seller.name = req.body.sellerName || user.seller.name;
          user.seller.logo = req.body.sellerLogo || user.seller.logo;
          user.seller.discription =
            req.body.sellerDiscription || user.seller.discription;
        }
        if (req.body.password) {
          user.password = bcrypt.hashSync(req.body.password, 8);
        }
        const updatedUser = await user.save();
        res.send({
          _id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          isAdmin: updatedUser.isAdmin,
          isSeller: user.isSeller,
          token: generateToken(updatedUser),
        });
      }
    })
  );

userRouter.get('/', isAuth, isAdmin, expressAsyncHandler(async(req, res) => {
    const users = await User.find({})
    res.send(users)
}))

userRouter.delete('/:id', isAuth, isAdmin, expressAsyncHandler(async(req,res) => {
    const user = await User.findById(req.params.id);
    if(user){
        if(user.email === 'admin1@mail.com'){
            res.sendStatus(400).send({message: 'Admin Can not be Delete'})
            return;
        }
        const deleteUser = await user.remove()
        res.send({message: 'User Deleted', user: deleteUser})
    } else{
        res.sendStatus(404).send({message: 'User Not found'})
    }
}))

userRouter.put(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    console.log(req.body)
    if (user) {
      
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.isSeller =   req.body.isSeller  ;
      user.isAdmin = req.body.isAdmin ;
      const updatedUser = await user.save();
      res.send({ message: 'User Updated', user: updatedUser });
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
);

export default userRouter;