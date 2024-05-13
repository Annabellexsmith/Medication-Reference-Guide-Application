const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const Indication = require('../models/indication.js');
const Drug = require('../models/drug.js');

//Index
router.get('/index', async (req, res) => {
    const userDrugs = await Drug.find({ owner: req.session.user._id})
    res.render('drugs/index', { drugs: userDrugs});
});

//Create
router.get('/new', async (req, res) => {
    const indications = await Indication.find()
    res.render('drugs/new', { indications });
});

//POST
router.post('/', async (req, res)=> {
try { 
    if (req.body.reactive) {
        req.body.reactive = true;
    } else {
        req.body.reactive = false;
    }
    req.body.owner = req.session.user._id
    newDrug = await Drug.create(req.body);
    res.redirect('drugs/index');

       //res.redirect('drugs/index');
} catch (error) {
    console.log(`ERROR`)
    res.redirect(`/`)
}
})

// SHOW- individual medication based on id
router.get('/:drugId', async (req, res) => {
    const drugId = await Drug.findById(req.params.drugId)
    .populate('indications');
    res.render('drugs/show', { drug: drugId });
})


//Edit - individual medicaiton based on id
router.get('/:drugId/edit', async (req, res) => {
    const drugId = await Drug.findById(req.params.drugId)
    .populate('indications')
    res.render('drugs/edit', { drug: drugId});
})

///Update - individual medication based on id
router.put('/:drugId', async (req, res) => {
    if (req.body.reactive) {
            req.body.reactive= true;
        } else {
        req.body.reactive= false;
    }
    req.body.owner = req.session.user._id
    const updatedDrug = await Drug.findByIdAndUpdate(
        req.params.drugId,
        req.body,
        { new : true }
    )
    res.render('drugs/show', { drug : updatedDrug })
})

//calling indicaitons/new
router.get('/<%= drug._id %>/indications/new', (req, res) => {
    res.render('indication/new')
})

//DELETE - individual medication based on id
router.delete('/:drugId', async (req, res) => {
    await Drug.findByIdAndDelete(req.params.drugId)
    res.redirect('/drugs/index')
})

module.exports = router;