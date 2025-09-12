const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utills/wrapAsync.js");
const review=require("../models/review.js");
const Listing=require("../models/listing.js");
const {validateReview,isLoggedIn,isReviewAuthor}=require("../middleware.js");
const reviewController=require("../controllers/review.js");

//post reviews
router.post("/",isLoggedIn,validateReview,wrapAsync(reviewController.createReview));

//delete review route
router.delete("/:reviewId",isReviewAuthor,wrapAsync(reviewController.updateReview));


module.exports=router;