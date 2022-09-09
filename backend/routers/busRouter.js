import express  from "express";
import expressAsyncHandler from "express-async-handler";
import data from "../data.js";
import Bus from "../models/busModel.js";
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
    const bus = new Bus({
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
            { id: "1A", isAvailable: true },
            { id: "1B", isAvailable: true },
            { id: "1C", isAvailable: true },
            { id: "1D", isAvailable: true },
            { id: "1E", isAvailable: true },
            { id: "1F", isAvailable: true },
            { id: "2A", isAvailable: true },
            { id: "2B", isAvailable: true },
            { id: "2C", isAvailable: true },
            { id: "2D", isAvailable: true },
            { id: "2E", isAvailable: true },
            { id: "2F", isAvailable: true },
            { id: "3A", isAvailable: true },
            { id: "3B", isAvailable: true },
            { id: "3C", isAvailable: true },
            { id: "3D", isAvailable: true },
            { id: "3E", isAvailable: true },
            { id: "3F", isAvailable: true },
            { id: "4A", isAvailable: true },
            { id: "4B", isAvailable: true },
            { id: "4C", isAvailable: true },
            { id: "4D", isAvailable: false },
            { id: "4E", isAvailable: true },
            { id: "4F", isAvailable: true },
            { id: "5A", isAvailable: true },
            { id: "5B", isAvailable: true },
            { id: "5C", isAvailable: true },
            { id: "5D", isAvailable: true },
            { id: "5E", isAvailable: true },
            { id: "5F", isAvailable: true },
            { id: "6A", isAvailable: true },
            { id: "6B", isAvailable: true },
            { id: "6C", isAvailable: true },
            { id: "6D", isAvailable: true },
            { id: "6E", isAvailable: true },
            { id: "6F", isAvailable: true },
            { id: "7A", isAvailable: true },
            { id: "7B", isAvailable: true },
            { id: "7C", isAvailable: true },
            { id: "7D", isAvailable: true },
            { id: "7E", isAvailable: true },
            { id: "7F", isAvailable: true },
            { id: "8A", isAvailable: true },
            { id: "8B", isAvailable: true },
            { id: "8C", isAvailable: true },
            { id: "8D", isAvailable: true },
            { id: "8E", isAvailable: true },
            { id: "8F", isAvailable: true },
            { id: "9A", isAvailable: true },
            { id: "9B", isAvailable: true },
            { id: "9C", isAvailable: true },
            { id: "9D", isAvailable: true },
            { id: "9E", isAvailable: true },
            { id: "9F", isAvailable: true },
            { id: "10A", isAvailable: true },
            { id: "10B", isAvailable: true },
            { id: "10C", isAvailable: true },
            { id: "10D", isAvailable: true },
            { id: "10E", isAvailable: true },
            { id: "10F", isAvailable: true },
          ],
    })
    const createdBus = await bus.save();
    // console.log(createdBus)
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
        bus.seats_remaining = req.body.seats_remaining
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

busRouter.delete('/:id', isAuth, isAdmin, expressAsyncHandler(async(req, res) => {
    const bus = await Bus.findById(req.params.id);
    if(bus){
        const deletedBus = await bus.remove()
        res.send({ message: 'Bus Deleted', bus: deletedBus})
    }
    else{
        res.sendStatus(404).send({message: 'Bus Not Found'})
        
    }

})) 

export default busRouter;