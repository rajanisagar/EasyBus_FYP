import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import Bus from '../models/busModel.js';
import { isAdmin, isAuth, isSellerOrAdmin,  } from '../utils.js';

const orderRouter = express.Router();

orderRouter.get('/',isAuth, isSellerOrAdmin, expressAsyncHandler(async(req, res) => {
  const seller = req.query.seller || '';
  const sellerFilter = seller ? { seller } : {};
  
  const orders = await Order.find({ ...sellerFilter }).populate(
    'user',
    'name'
  );
  res.send(orders)

}))

orderRouter.get(
  '/mine',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.send(orders);
  })
);



orderRouter.post(
  '/',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    
    if (req.body.orderItems.length === 0) {
      res.status(400).send({ message: 'Cart is empty' });
    } else {
      
      // const bus = await Bus.find({ _id: req.body.orderItems[0].bus }); 
      //  const seat  = bus[0].seats.find(x => x.id === req.body.orderItems[0].seatId).seatId
      
      // seat.isAvailable = false;
      // // await   bus.save();
      // let query = { _id: req.body.orderItems[0].bus.seats. }  // or whatever your id / _id is
      // let update = { price: 5445  }
      // const bus = await Bus.find({ _id: req.body.orderItems[i].bus }); 
      for(let i = 0; i < req.body.orderItems.length; i++){
        // console.log(req.body.orderItems[i].bus)
        await Bus.findOneAndUpdate(
          { _id:  req.body.orderItems[i].bus, 'seats.id':  req.body.orderItems[i].seatId },
          {
            $set: {
              'seats.$.isAvailable': false, 
              
            }
          },
         );
      }
      const bus = await Bus.find({ _id: req.body.orderItems[0].bus }); 
      // console.log(bus[0])
      let num = bus[0].seats_remaining - req.body.orderItems.length;
      // await bus[0].save();
    console.log(num)
      Bus.findOneAndUpdate({ _id: req.body.orderItems[0].bus }, {$set:{seats_remaining:num}}, {new: true}, (err, doc) => {
        if (err) {
            console.log("Something wrong when updating data!");
        }
    
        console.log(doc);
    });
      const order = new Order({
        
        // seller: req.body.orderItems[0].seller,
        orderItems: req.body.orderItems,
        userDetails: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        // itemsPrice: req.body.itemsPrice,
        // shippingPrice: req.body.shippingPrice,
        // taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
        user: req.user._id,
      });
      const createdOrder = await order.save();
      res
        .status(201)
        .send({ message: 'New Order Created', order: createdOrder });
    }
  })
);


orderRouter.get(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      res.send(order);
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  })
);





orderRouter.delete(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      const deleteOrder = await order.remove();
      res.send({ message: 'Order Deleted', order: deleteOrder });
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  })
);



export default orderRouter;