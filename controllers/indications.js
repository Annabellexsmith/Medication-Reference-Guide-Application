const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

// Favoriting route
// router.post('/:listingId/favorited-by/:userId', async (req, res) => {
//     try {
//         const foundListing = await Listing.findById(req.params.listingId);
//         foundListing.favoritedByUsers.push(req.params.userId);
//         await foundListing.save();
//         res.redirect(`/listings/${req.params.listingId}`);
//     } catch (error) {
//         console.log(error);
//         res.redirect('/listings');
//     }
// });

// Unfavoriting route
//router.delete('/:listingId/favorited-by/:userId', async (req, res) => {
//     try {
//         // remove the userId fromt he favoritedByUsers array
//         await Listing.findByIdAndUpdate(req.params.listingId, {
//             $pull: { favoritedByUsers: req.params.userId },
//         });
//         res.redirect(`/listings/${req.params.listingId}`);
//     } catch (error) {
//         console.log(error);
//         res.redirect('/listings');
//     }
// });


// const foundListing = await Listing
// .findById(req.params.listingId)
// .populate('owner')




module.exports = router;