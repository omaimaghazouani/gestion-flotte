const express = require("express");
const router = express.Router();
const utilisateurController = require('../controllers/utilisateur');

router.post('/', async(req, res)=>{
    await utilisateurController.create(req, res);
});

router.get('/', async(req, res) => {
    await utilisateurController.list(req, res);
});

 router.get('/', async (req, res) => {
    await utilisateurController.show(req, res);
 });

 router.put('/:id', async (req,res) => {
    await utilisateurController.update(req,res);
 });

 router.delete('/:id', async (req, res) => {
    await utilisateurController.delete(req, res);
});

module.exports = router;