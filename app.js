if(process.env.NODE_ENV!=="production"){
require("dotenv").config();
// console.log(process.env.API_SECRET);
}
const express=require("express");
const app=express();
const mongoose=require("mongoose");
const Listing=require("./models/listing.js");
const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
const ExpressError=require("./utils/ExpressError.js");
const listingsRouter=require("./routes/listing.js");
const reviewsRouter=require("./routes/review.js");
const userRouter=require("./routes/user.js");
const AtlasDbUrl=process.env.ATLASDB_URL;

const session=require("express-session");
const MongoStore = require('connect-mongo');
const flash=require("connect-flash");
const passport=require("passport");
const LocalStrategy=require("passport-local");
// const passportLocalMongoose=require("passport-local-mongoose");

const User=require("./models/user.js");

main().then(()=>{
    console.log("connection successful");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect(AtlasDbUrl);
}



// app.get("/Listings",(req,res)=>{
//     Listing.find({}).then((res)=>{
//         console.log(res);
//     });
// });
app.get("/testListing",async(req,res) =>{
let sampleListing=new Listing({
    title:"My New Villa",
    description:"By the beach",
    price:1300,
    location:"Calangute,Goa",
    country:"India",
});
await sampleListing.save();
console.log("sample was saved");
res.send("successful testing");
});

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

const store = MongoStore.create({
    mongoUrl:AtlasDbUrl,
    crypto:{
        secret:process.env.SESSION_SECRET
    },
    touchAfter:24*60*60 });

    store.on("error",()=>{
        console.log("session store error",err);
    })

const sessionOptions={
    store,
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now()+7*24*60*60*1000,
        httpOnly:true,
    },
}


    


app.use(session(sessionOptions));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currUser=req.user;

    next();
});
app.use("/listings",listingsRouter);
app.use("/listings/:id/reviews",reviewsRouter);
app.use("/",userRouter);

app.get("/demouser",async(req,res)=>{
let fakeUser=new User({
    email:"abc@gmail.com",
    username:"delta-student",
})
let registeredUser= await User.register(fakeUser,"Jeeya Mishra");
res.send(registeredUser);
});

//when no match
app.use((req,res,next)=>{
    next(new ExpressError(404,"Page not found"));
 });

//error handling middleware

app.use((err, req, res, next) => {
    console.log(err);
    let { statusCode = 500, message } = err;
    if (!message) message = "Something went wrong";
    res.status(statusCode).render("error.ejs", { message });
});



app.listen(8080,()=>{
    console.log("server is listening on port 8080");
});
