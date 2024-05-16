const express = require('express');
const router = express.Router();
const Indication = require('../models/indication.js');
const Drug = require('../models/drug.js');

//INDEX page
router.get('/index', async (req, res) => {
    const userDrugs = await Drug.find({ owner: req.session.user._id})
    userDrugs.sort((a, b) => { return a.genericName.localeCompare(b.genericName); });
    res.render('drugs/index', { drugs: userDrugs});
});

//INDEX for COMMUNITY page
router.get('/community', async (req, res) => {
    const allDrugs = await Drug.find();
    res.render('drugs/community-page', {allDrugs});
});

//CREATE drug profile
router.get('/new', async (req, res) => {
    const indications = await Indication.find();
    res.render('drugs/new', { indications });
});

//POST drug profile
router.post('/', async (req, res)=> {
try { 
    if (req.body.reactive) {
        req.body.reactive = true;
    } else {
        req.body.reactive = false;
    }
    req.body.owner = req.session.user._id;
    newDrug = await Drug.create(req.body);
    res.redirect('drugs/index');
} catch (error) {
    res.redirect('drugs');
};
});

// SHOW- individual drug based on Id
router.get('/:drugId', async (req, res) => {
    const foundDrugId = await Drug.findById(req.params.drugId)
    .populate('indications').populate('owner');
    res.render('drugs/show', { drug: foundDrugId });
});

//EDIT - individual medicaiton based on Id
router.get('/:drugId/edit', async (req, res) => {
    const drugId = await Drug.findById(req.params.drugId)
    .populate('indications');
    const allIndications = await Indication.find();
    res.render('drugs/edit', { drug: drugId, allIndications });
});

///Update - individual medication based on Id
router.put('/:drugId', async (req, res) => {
    if (req.body.reactive) {
            req.body.reactive= true;
        } else {
        req.body.reactive= false;
    }
    req.body.owner = req.session.user._id;
    const updatedDrug = await Drug.findByIdAndUpdate(
        req.params.drugId,
        req.body,
        { new : true }
    ).populate('indications');
    res.render('drugs/show', { drug : updatedDrug });
});

//EDIT indications for specific drug 
router.get('/:drugId/indications', async (req, res) => {
    const drugId = await Drug.findById(req.params.drugId);
    res.render('drugs/new-indication', { drug: drugId });
});


//POST indication to drug profile
router.put('/:drugId/indications', async (req, res) => {
    const drug = await Drug.findById(req.params.drugId);
    const createdIndication = await Indication.create(req.body);
    drug.indications.push(createdIndication._id);
    await drug.save();
    const userDrugs = await Drug.find({ owner: req.session.user._id });
    res.render('drugs/index', {drugs: userDrugs });
});

//DELETE - individual medication based on Id
router.delete('/:drugId', async (req, res) => {
    await Drug.findByIdAndDelete(req.params.drugId);
    res.redirect('/drugs/index');
});

module.exports = router;