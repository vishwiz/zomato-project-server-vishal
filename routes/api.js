const express = require("express");
const router = express.Router();
let restaurant = require("../modals/restaurants");
let user = require("../modals/user");

// Get the Trending Resturants
router.get("/restaurants/trending", async (req, res) => {
  try {
    let trendingRestaurants = await restaurant
      .find()
      .sort({
        "user_rating.aggregate_rating": -1
      })
      .limit(12);
    await res.status(200).send(trendingRestaurants);
  } catch (e) {
    return res.status(500).send({ message: "Internal server error" });
  }
});

// Get the search result for the restaurants
router.get("/restaurants/search/:searchText", async (req, res) => {
  try {
    let searchText = req.params.searchText;
    let regex = new RegExp(searchText, "i");
    let searchRestaurants = await restaurant.find({
      $or: [
        {
          name: regex
        },
        {
          cuisine: regex
        },
        {
          "location.address": regex
        }
      ]
    });
    await res.status(200).send(searchRestaurants);
  } catch (e) {
    return res.status(500).send({ message: "Internal server error" });
  }
});

// Get the restaurants data from id
router.get("/restaurants/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let data = await restaurant.find({
      id: id
    });
    await res.status(200).send(data);
  } catch (e) {
    return res.status(500).send({ message: "Internal server error" });
  }
});

// Get the User data from its id
router.get("/user/:id", async (req, res) => {
  try {
    let id = req.params.id;
    //  console.log(id)
    let userDetails = await user.findById({
      _id: id
    });
    // console.log(userDetails);

    await res.status(200).send(userDetails);
  } catch (e) {
    console.log(e);
    return res.status(500).send({ message: "Internal server error" });
  }
});

//Get the user data on login
router.get("/user", async (req, res) => {
  try {
    let UserEmail = req.headers.email;
    let userData = await user.findOne({
      email: UserEmail
    });
    console.log(UserEmail)
    if (userData._id) {
      res.status(200).send(userData);
    } else {
      res.status(400).send({ message: "Invaild User" });
    }
  } catch (e) {
    return res.status(500).send({ message: "Internal server error" });
  }
});

router.post('/user',async(req,res)=>{
  //  let UserEmail = req.headers.email;
   let newUser = req.body;
    let userData = await user.find({
      email:newUser.email
    })
    if(userData.length===0){
     await  user.insertMany(newUser)
      .then((result)=>{
          res.status(201).send({message:'Account Created'})
      })
      .catch((err)=>{
          return res.status(500).send({message:"Internal Server Error"})
      })
    }else{
      return res.status(400).send({message:"user already exist"})
    }
})

router.put('/user',async(req,res)=>{
  let userDetails = req.body;
  let userData = await user.updateOne({
    email:userDetails.email
  },{name:userDetails.name,phone:userDetails.phone,payment:userDetails.payment})
  console.log(userData) 
  if(userData.length!==0){
     res.status(200).send({message:'Edit Done'})
   }else return res.status(500).send({message:"Internal Server Error"})
})


router.get("/bookings",async(req,res)=>{
      try{
        let UserEmail = req.headers.email;
        let userData =await user.findOne({
          email:UserEmail
        })
        console.log(userData)
        await res.status(200).send(userData.booking)
       }catch(e){
         return res.status(500).send({ message: "Internal server error" })
       }
})

router.post("/bookings", async (req, res) => {
  try {
    let UserEmail = req.headers.email;
    let userBookingDetails = req.body;

    await user.findOneAndUpdate(
      {
        email: UserEmail
      },
      {
        $push: {
          booking: userBookingDetails
        }
      }
    );
    await res.send({ message: okie });
  } catch (e) {}
});
module.exports = router;

// Restaurants:
// GET /api/restaurants/trending ( top 10 )
// GET /api/restaurants/search/:search-text
// GET /api/restaurants/:id
// Users:
// GET /api/user/:id
// POST /api/user
// GET /api/bookings
// POST /api/bookings (details in body)
