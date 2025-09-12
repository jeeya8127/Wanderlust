const user = require("../models/user");

module.exports.renderSignUp=(req,res)=>{
    res.render("users/signup.ejs");
};

module.exports.renderLogin=(req,res)=>{
    res.render("users/login.ejs");
};

module.exports.signup=async(req,res,next)=>{
    try{
    let{username,email,password}=req.body;
    const newUser=new user({email,username});
  const registeredUser=  await user.register(newUser,password);
  console.log(registeredUser);
  req.login(registeredUser,(err)=>{
    if(err){
        return next(err);
    }
        req.flash("success","Welcome to Wanderlust");
        res.redirect("/listings");
  })
}catch(e){
    req.flash("error",e.message);
    res.redirect("/signup");
  }
};


module.exports.login=async(req,res)=>{
    req.flash("success","Welcome wanderlust! You are logged in!");
    const redirectUrl=res.locals.redirectUrl||"/listings";
     res.redirect(redirectUrl);
};

module.exports.logout=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            next(err);
        }
        else{
            req.flash("success","you are logged out!");
            res.redirect("/listings");
        }
    })
};


