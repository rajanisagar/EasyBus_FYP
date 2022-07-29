import bcrypt from 'bcryptjs'
const data = {
    // buses === product
    users: [
        {
            name: 'sagar',
            email: 'admin@mail.com',
            password: await bcrypt.hashSync("1234", 8),
            isAdmin: true
        },
        {
            name: 'john',
            email: 'john@mail.com',
            password: await bcrypt.hashSync("1234", 8),
            isAdmin: false

        }
    ],
    buses: [
        {
            operator: 'Daewoo',
            bus_type:'standard',
            image :'/images/p1.jpg',
            seats_remaining: 37,
            price:650,
            rating:0.5,
            numReviews:10,
            description:"Daewoo ."


        },
        {
            operator: 'faisal Movers',
            bus_type:'Executive',
            image :'/images/p1.jpg',
            seats_remaining: 0,
            price:650,
            rating:4.5,
            numReviews:10,
            description:"FM  is a role model and trend setter private transport company in Pakistan with largest infrastructural setup and buses."


        },
        {
            operator: 'BB',
            bus_type:'standard Executive',
            image :'/images/p1.jpg',
            seats_remaining: 37,
            price:650,
            rating:1.5,
            numReviews:10,
            description:"BB Express is a role model and trend setter private transport company in Pakistan with largest infrastructural setup and buses."


        },
        {
            operator: 'kk',
            bus_type:'standard',
            image :'/images/p1.jpg',
            seats_remaining: 37,
            price:650,
            rating:4.5,
            numReviews:10,
            description:"Daewoo Express is a role model and trend setter private transport company in Pakistan with largest infrastructural setup and buses."



        },
        {
            operator: 'ALi moovers',
            bus_type:'standard',
            image :'/images/p1.jpg',
            seats_remaining: 37,
            price:650,
            rating:4.5,
            numReviews:10,
            description:"Daewoo Express is a role model and trend setter private transport company in Pakistan with largest infrastructural setup and buses."
        },
    ]

};
export default data;