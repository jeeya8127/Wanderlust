const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const Listing=require("../models/listing.js");
const{isLoggedIn,isOwner,validateListing}=require("../middleware.js");
const listingController=require("../controllers/listing.js");
const {storage}=require("../cloudConfig.js");
const multer  = require('multer');

const upload = multer({storage}); //BY DEFAULT TO CLOUDINARY STORAGE


router.route("/")
 .get(
    wrapAsync(listingController.index))
 .post(
     isLoggedIn,
   
    upload.single("listing[image]"),
     validateListing,
   wrapAsync(listingController.createListing));

//NEW ROUTE :BEFORE ID ROUTE
router.get(
    "/new",
    isLoggedIn,
    listingController.renderNewForm);

router.get("/search", (req, res) => {
  res.redirect("/listings");
});

router.route("/:id")
 .get(
    wrapAsync(listingController.showListing) )
 .put(
    isLoggedIn,
      upload.single("listing[image]"),
    isOwner,
    validateListing,
    wrapAsync(listingController.updateListing))
.delete(
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.destroyListing));



//EDIT ROUTE
router.get("/:id/edit",
    isLoggedIn,
    isOwner,
   wrapAsync(listingController.renderEditForm));



module.exports=router;