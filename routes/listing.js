// const express=require("express");
// const router=express.Router();
// const wrapAsync=require("../utils/wrapAsync.js");
// const methodOverride=require("method-override");
// router.use(methodOverride("_method"));
// const {isLoggedIn,isOwner,validateListing}=require("../middleware.js");
// const listingController=require("../controllers/listing.js");
// const multer  = require('multer');
// const {storage}=require("../cloudConfig.js");
// const upload = multer({ storage });

// //index route && createnew
// router.route("/")
// .get(wrapAsync(listingController.index))
// .post(isLoggedIn,validateListing,upload.single("listing[image]"),wrapAsync(listingController.createListing));


// //new route
// router.get("/new",isLoggedIn,listingController.renderNewForm);

// //show route && updatem&& delete
// router.route("/:id")
// .get(wrapAsync(listingController.showListing))
// .put(isLoggedIn,isOwner,upload.single("listing[image]"), validateListing,wrapAsync(listingController.updateListing))
// .delete(isLoggedIn,isOwner,wrapAsync(listingController.deleteListing));

// //edit route
// router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.editListing));


// module.exports=router;






const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
// const {listingSchema,reviewSchema,validateListing}=require("../schema.js");
// const ExpressError=require("../utils/ExpressError.js");
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
    // isOwner,
   
    upload.single("listing[image]"),
     validateListing,
   wrapAsync(listingController.createListing));
// .post(
//      upload.single('listing[image]'),async(req,res)=>
//      {
//           console.log(req.file);
//         res.send(req.file);
//      }
// )

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