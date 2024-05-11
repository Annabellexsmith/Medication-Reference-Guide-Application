const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const Indications = require('../models/indication.js');
const Drug = require('../models/drug.js');
const drug = require('../models/drug.js');

//Index
router.get('/index', async (req, res) => {
    const userDrugs = await Drug.find({ owner: req.session.user._id})
    res.render('drugs/index', { drugs: userDrugs});
});

//Create
router.get('/new', async (req, res) => {
    res.render('drugs/new');
});

//POST
router.post('/', async (req, res)=> {
    if (req.body.reactive) {
        req.body.reactive = true;
    } else {
        req.body.reactive = false;
    }
    req.body.owner = req.session.user._id
    await Drug.create(req.body);
    res.redirect('drugs/index');
})

// SHOW- individual medication based on id
router.get('/:drugId', async (req, res) => {
    const drugId = await Drug.findById(req.params.drugId);
    // let reactiveValue = (!drugId.reactive) ? 'off' : 'on'
    res.render('drugs/show', { drug: drugId });
})


//Edit - individual medicaiton based on id
router.get('/:drugId/edit', async (req, res) => {
    const drugId = await Drug.findById(req.params.drugId);
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
    const updatedDrug = await drug.findByIdAndUpdate(
        req.params.drugId,
        req.body,
        { new : true }
    )
    res.render('drugs/show', { drug : updatedDrug })
})

//DELETE - individual medication based on id
router.delete('/:drugId', async (req, res) => {
    await Drug.findByIdAndDelete(req.params.drugId)
    res.redirect('/drugs/index')
})

module.exports = router;