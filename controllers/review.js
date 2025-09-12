const Listing=require("../models/listing.js");
const review=require("../models/review.js");

module.exports.createReview=async(req,res)=>{
let listing=await Listing.findById(req.params.id);
let newReview=new review(req.body.review);
newReview.author=req.user._id;
console.log(newReview.author);
listing.reviews.push(newReview._id);
 await newReview.save();
 await listing.save();
    req.flash("success","Review created!");
 res.redirect(`/listings/${listing._id}`);

};

module.exports.updateReview=async(req,res)=>{
    let{id,reviewId}=req.params;
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await review.findByIdAndDelete(reviewId);
    req.flash("success","Review deleted!");
    res.redirect(`/listings/${id}`);
};