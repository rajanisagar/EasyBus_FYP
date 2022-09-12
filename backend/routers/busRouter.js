import express  from "express";
import expressAsyncHandler from "express-async-handler";
import data from "../data.js";
import Bus from "../models/busModel.js";
import Order  from "../models/orderModel.js";
import { isAdmin, isAuth, isSellerOrAdmin } from "../utils.js";
const busRouter = express.Router();



busRouter.get('/', expressAsyncHandler(async (req, res) => {
    const name = req.query.name || '';
    const departureDate = req.query.departureDate || '';

    const from = req.query.from || '';
    const to = req.query.to || '';
    const seller = req.query.seller || '';
    const order = req.query.order || '';
    const category = req.query.category || '';
    const min =
    req.query.min && Number(req.query.min) !== 0 ? Number(req.query.min) : 0;
    const max =
    req.query.max && Number(req.query.max) !== 0 ? Number(req.query.max) : 0;
    const rating =
    req.query.rating && Number(req.query.rating) !== 0
      ? Number(req.query.rating)
      : 0;


    const nameFilter = name ? { operator: { $regex: name, $options: 'i' } } : {};
    const sellerFilter = seller ? { seller } : {};
    const categoryFilter = category ? { bus_type:category } : {};
    const fromFilter = from ? { from:from } : {};

    const toFilter = to ? { to:to } : {};
    const departureDateFilter = departureDate ? { departureDate:departureDate } : {};
    console.log(departureDateFilter)
    const priceFilter = min && max ? { price: { $gte: min, $lte: max } } : {};
    const ratingFilter = rating ? { rating: { $gte: rating } } : {};
    const sortOrder =
    order === 'lowest'
      ? { price: 1 }
      : order === 'highest'
      ? { price: -1 }
      : order === 'toprated'
      ? { rating: -1 }
      : { _id: -1 };
    // console.log(nameFilter);
   
    const buses = await Bus.find({
            ...sellerFilter,
            ...nameFilter, 
            ...categoryFilter,
            ...priceFilter,
            ...ratingFilter,
            ...fromFilter,
            ...toFilter,
            ...departureDateFilter
            
        }).populate(
        'seller',
        'seller.name seller.logo'
      ).sort(sortOrder);
    //  console.log('from '+buses)
    res.send(buses)
}))

busRouter.get('/categories', expressAsyncHandler(async(req, res) => {
    const categories = await Bus.find().distinct('bus_type')
    res.send(categories)
}))

busRouter.get('/seed', expressAsyncHandler(async(req, res) => {
    await Bus.deleteMany()
    const createdBuses = await Bus.insertMany(data.buses)
    res.send({createdBuses})
}))


busRouter.get('/:id', expressAsyncHandler( async(req,res) => {
    const bus = await Bus.findById(req.params.id).populate(
        'seller',
        'seller.name seller.logo seller.rating seller.numReviews'
      );
    if(bus){
        res.send(bus);
    }
    else{
        res.status(404).send({message: 'Bus not found'})
    }
}))


busRouter.post('/', isAuth, isSellerOrAdmin, expressAsyncHandler(async(req,res) => {
    const buses = await Bus.find();

    console.log(buses.length)
    // console.log(buses)
    const bus = new Bus({
        ID: buses.length+1,
        operator:''+ Date.now(),
        seller: req.user._id,
        image: '',
        price: 0,
        bus_type: '',
        seats_remaining:22,
        rating: 0,
        numReviews:0,
        description:'',
        from:'',
        to:'',
        departureDate:'',
        seats: [
            { id: "1", isAvailable: true },
            { id: "2", isAvailable: true },
            //{ id: "1C", isAvailable: true },
            { id: "3", isAvailable: true },
            { id: "4", isAvailable: true },
           // { id: "1F", isAvailable: true },
            { id: "5", isAvailable: true },
            { id: "6", isAvailable: true },
            //{ id: "2C", isAvailable: true },
            { id: "7", isAvailable: true },
            { id: "8", isAvailable: true },
            //{ id: "2F", isAvailable: true },
            { id: "9", isAvailable: true },
            { id: "10", isAvailable: true },
            //{ id: "3C", isAvailable: true },
            { id: "11", isAvailable: true },
            { id: "12", isAvailable: true },
            //{ id: "3F", isAvailable: true },
            { id: "13", isAvailable: true },
            { id: "14", isAvailable: true },
            //{ id: "4C", isAvailable: true },
            { id: "15", isAvailable: true },
            { id: "16", isAvailable: true },
            //{ id: "4F", isAvailable: true },
            { id: "17", isAvailable: true },
            { id: "18", isAvailable: true },
            //{ id: "5C", isAvailable: true },
            { id: "19", isAvailable: true },
            { id: "20", isAvailable: true },
            //{ id: "5F", isAvailable: true },
            { id: "21", isAvailable: true },
            { id: "22", isAvailable: true },
            //{ id: "6C", isAvailable: true },
            { id: "23", isAvailable: true },
            { id: "24", isAvailable: true },
            //{ id: "6F", isAvailable: true },
            { id: "25", isAvailable: true },
            { id: "26", isAvailable: true },
            //{ id: "7C", isAvailable: true },
            { id: "27", isAvailable: true },
            { id: "28", isAvailable: true },
            //{ id: "7F", isAvailable: true },
            { id: "29", isAvailable: true },
            { id: "30", isAvailable: true },
            //{ id: "8C", isAvailable: true },
            { id: "31", isAvailable: true },
            { id: "32", isAvailable: true },
            //{ id: "8F", isAvailable: true },
            { id: "33", isAvailable: true },
            { id: "34", isAvailable: true },
            //{ id: "9C", isAvailable: true },
            { id: "35", isAvailable: true },
            { id: "36", isAvailable: true },
            //{ id: "9F", isAvailable: true },
            { id: "37", isAvailable: true },
            { id: "38", isAvailable: true },
            //{ id: "10C", isAvailable: true },
            { id: "39", isAvailable: true },
            { id: "40", isAvailable: true },
            //{ id: "10F", isAvailable: true },
          ],
    })
    //  console.log(createdBus)
    const createdBus = await bus.save();
   
    res.send({message: 'Bus Created', bus: createdBus })
}))


busRouter.put('/:id', isAuth, isSellerOrAdmin, expressAsyncHandler(async(req, res) => {
    const busid = req.params.id;
    
    const bus = await Bus.findById(busid)
    
    if(bus){
       

        bus.operator = req.body.operator
        bus.price = req.body.price
        bus.image = req.body.image
        bus.bus_type = req.body.bus_type
        bus.seats_remaining = 40    
        bus.description = req.body.description
        bus.rating = 211
        bus.numReviews = 0
        bus.from = req.body.from;
        bus.to = req.body.to;
        bus.departureDate = req.body.departureDate;

        

       
        
        const updatedBus = await bus.save();
        
        res.send({message: 'Bus Updated', bus: updatedBus})
       
    }
    else {
        res.sendStatus(404).send({message: 'Bus Not Found'})
    }
}))

busRouter.delete('/:id', isAuth, isSellerOrAdmin, expressAsyncHandler(async(req, res) => {
    const bus = await Bus.findById(req.params.id);
    if(bus){
        const deletedBus = await bus.remove()
        res.send({ message: 'Bus Deleted', bus: deletedBus})
    }
    else{
        res.sendStatus(404).send({message: 'Bus Not Found'})
        
    }

})) 
busRouter.get('/cancelreservation/:id', expressAsyncHandler(async(req, res) => {
    const order = await Order.findById(req.params.id);
    for(let i = 0; i < order.orderItems.length; i++){
        console.log(order.orderItems[i].bus)
        await Bus.findOneAndUpdate(
          { _id:  order.orderItems[i].bus, 'seats.id':  order.orderItems[i].seatId },
          {
            $set: {
              'seats.$.isAvailable': true, 
              
            }
          },
         );
      }
      const bus = await Bus.find({ _id: order.orderItems[0].bus }); 
      // console.log(bus[0])
      let num = bus[0].seats_remaining + order.orderItems.length;
      // await bus[0].save();
    console.log(num)
      Bus.findOneAndUpdate({ _id: order.orderItems[0].bus }, {$set:{seats_remaining:num}}, {new: true}, (err, doc) => {
        if (err) {
            console.log("Something wrong when updating data!");
        }
    
        console.log(doc);
    });


      await order.remove()
   
}))


export default busRouter;