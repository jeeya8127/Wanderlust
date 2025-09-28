require("dotenv").config();
const mongoose=require("mongoose");
const initData=require("./data.js");
const Listing=require("../models/listing.js");
const mongo_url="mongodb://127.0.0.1:27017/wanderlust";
const maptilerClient = require("@maptiler/client");
maptilerClient.config.apiKey = process.env.MAP_TOKEN;

main().then(()=>{
    console.log("connection successful");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect(mongo_url);
};

const initDB=async()=>{
    await Listing.deleteMany({});
    const listings = [];
    for (let i = 0; i < initData.data.length; i++) {
        let listing = initData.data[i];
        const queryAddress = listing.location;
        const response = await maptilerClient.geocoding.forward(queryAddress, {
            limit: 1,
        });
        listing.geometry = response.features[0].geometry;
        listing.owner = "68a74eadfa2714db7dcfe9f4"; // This is a placeholder owner ID
        listings.push(listing);
    }
    await Listing.insertMany(listings);
    console.log("data was initialized");
};
initDB();