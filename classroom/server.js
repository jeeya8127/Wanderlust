const express=require("express");
const app=express();
const session=require("express-session");
const path=require("path");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
const flash = require("connect-flash");

// const users=require("./routes/user.js");
// const cookieParser=require("cookie-parser");
// // app.use(cookieParser());
// app.use(cookieParser("jeeya"));

// app.use(session({secret:"Jeeya"}));

const sessionOptions={
    secret:"Jeeya",
    resave:false,
    saveUninitialized:true,
}
app.use(session(sessionOptions));
app.use(flash());

app.use((req,res,next)=>{
     res.locals.successMsg=req.flash("success");
    res.locals.errorMsg=req.flash("error");
    next(); 
});
app.get("/reqcount",(req,res)=>{
    if(req.session.count){
        req.session.count++;
    }
    else{
        req.session.count=1;
    }
    res.send(`you visit this site ${req.session.count}times`);
})
app.get("/register",(req,res)=>{
    let{name="Anonymous"}=req.query;
    // console.log(req.session);
    req.session.name=name;
    // console.log(req.session.name);
    // res.send(name);
    if(name==="Anonymous"){
    req.flash("error","user not registered");

    }
    else{
    req.flash("success","user registered successfully");}
    res.redirect("/test");
    
})
app.get("/test",(req,res)=>{
    // console.log(req.flash("success"));
    // res.locals.successMsg=req.flash("success");
    // res.locals.errorMsg=req.flash("error");

    res.render("page",{name:req.session.name});
    // res.send(`session id created bro,congrats${req.session.name}!`);
})



// app.get("/getcookies",(req,res)=>{
//     res.cookie("greet","welcome");
//     res.cookie("madeIn","India");
//     res.send("sent some cookies");
// });

// app.get("/greet",(req,res)=>{
//   let{name="Anonymous"}=req.cookies;
//   res.send(`hello,${name}`);});
// ;

// //send signed cookie  //make unreadabe code
// app.get("/getsignedcookie",(req,res)=>{
//     res.cookie("color","red",{signed:true});
//     res.send("done!");
// });
// //to verify signed cookie
// app.get("/verify",(req,res)=>{
//     console.log(req.signedCookies);
//     res.send("verified");
// })

// app.get("/",(req,res)=>{
//     console.dir(req.cookies);
//     res.send("Hello,i am root");
// });
// app.use("/users",users);
app.listen(3000,(req,res)=>{
    console.log("server is listening on port 3000");
})