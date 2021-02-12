const express = require("express");
const db = require("../db");
const ExpressError = require("../expressError");
const Dog = require("../models/dog");

const router = new express.Router();

router.get("/", async (req, res, next) => {
    try {
        const dogs = await Dog.getAll();
        return res.json(dogs);
    } catch (e) {
        return next(e);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const dog = await Dog.getById(req.params.id);
        return res.json(dog);
    } catch (e) {
        return next(e);
    }
});

router.post("/", async (req, res, next) => {
    try {
        const { name, age } = req.body;
        const dog = await Dog.create(name, age);
        return res.json(dog);
    } catch (e) {
        return next(e);
    }
})
module.exports = router;

router.delete("/:id", async (req, res, next) => {
    try {
        const dog = await Dog.getById(req.params.id);
        await dog.remove();
        return res.json({ msg: "Deleted" })
    } catch (e) {
        return next(e);
    }
});

router.patch("/:id/age", async (req, res, next) => {
    try {

        const dog = await Dog.getById(req.params.id);
        dog.age += 1;
        await dog.save();
        return res.json(dog);
    } catch (e) {
        return next(e);
    }
});

router.patch("/:id/rename", async (req, res, next) => {
    try {

        const dog = await Dog.getById(req.params.id);
        dog.name = req.body.name;
        await dog.save();
        return res.json(dog);
    } catch (e) {
        return next(e);
    }
});