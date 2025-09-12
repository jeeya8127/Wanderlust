const express=require("express");
const router=express.Router();
const wrapAsync=require("../utills/wrapAsync.js");
const methodOverride=require("method-override");
router.use(methodOverride("_method"));
const {isLoggedIn,isOwner,validateListing}=require("../middleware.js");
const listingController=require("../controllers/listing.js");
const multer  = require('multer');
const {storage}=require("../cloudConfig.js");
const upload = multer({ storage });

//index route && createnew
router.route("/")
.get(wrapAsync(listingController.index))
.post(isLoggedIn,validateListing,upload.single("listing[image]"),wrapAsync(listingController.createNew));


//new route
router.get("/new",isLoggedIn,listingController.renderNewForm);

//show route && updatem&& delete
router.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(isLoggedIn,isOwner,upload.single("listing[image]"), validateListing,wrapAsync(listingController.updateListing))
.delete(isLoggedIn,isOwner,wrapAsync(listingController.deleteListing));

//edit route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.editListing));


module.exports=router;
