'use strict'

const express = require('express');
const router = express.Router();
const Pet = require('../models/pet');

let pet = null;

router.post('/pet', (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ error: 'Name is required' });
    }
    pet = new Pet(name);
    res.status(201).json(pet);
})

router.get('/pet', (req, res) => {
    if (!pet) {
        return res.status(404).json({ error: 'No pet found' });
    }
    res.json(pet);
});

router.post('/pet/feed', (req, res) => {
    if (!pet || pet.status === 'dead') {
        return res.status(400).json({ error: 'Pet is dead or not created' });
    }
    pet.hunger = Math.max(0, pet.hunger - 30);
    pet.mood = Math.min(100, pet.mood + 10);
    pet.updateStatus();
    res.json({ message: 'Pet fed', pet });
});

router.post('/pet/heal', (req, res) => {
    if (!pet || pet.status === 'dead') {
        return res.status(400).json({ error: 'Pet is dead or not created' });
    }
    pet.health = Math.min(100, pet.health + 20);
    pet.hunger = Math.min(100, pet.hunger + 10);
    pet.updateStatus();
    res.json({ message: 'Pet healed', pet });
});

router.post('/pet/play', (req, res) => {
    if (!pet || pet.status === 'dead') {
        return res.status(400).json({ error: 'Pet is dead or not created' });
    }
    pet.mood = Math.min(100, pet.mood + 15);
    pet.hunger = Math.min(100, pet.hunger + 5);
    pet.updateStatus();
    res.json({ message: 'Played with pet', pet });
});

setInterval(() => {
    if (pet && pet.status !== 'dead') {
        pet.passTime();
        console.log(`Time passed for pet ${pet.name}`);
    }
}, 60000);

module.exports = router;