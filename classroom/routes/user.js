const express=require("express");
const router=express.Router();
//index route
router.get("/",(req,res)=>{
    res.send("This is index route");
})
//show route
router.get("/:id",(req,res)=>{
    res.send("This is show route");
})
//post route
router.post("/",(req,res)=>{
    res.send("This is post route");
})
//delete route
router.delete("/:id",(req,res)=>{
    res.send("This is delete route");
});
module.exports=router;