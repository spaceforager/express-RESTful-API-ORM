const express = require("express");
const db = require("../db");
const ExpressError = require("../expressError");
const Cat = require("../models/cat");

const router = new express.Router();

router.get("/", async (req, res, next) => {
    try {
        const cats = await Cat.getAll();
        return res.json(cats);

    } catch (e) {
        return next(e);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const cat = await Cat.getById(req.params.id);
        return res.json(cat);
    }
    catch (e) {
        return next(e);
    }
});

router.post("/", async (req, res, next) => {
    try {
        const { name, age } = req.body;
        const cat = await Cat.create(name, age);
        return res.json(cat);
    } catch (e) {
        return next(e);
    }

});

router.delete("/:id", async (req, res, next) => {
    try {
        await Cat.delete(req.params.id);
        return res.json({ message: "Deleted" });
    } catch (e) {
        return next(e);
    }
});

router.put("/:id", async (req, res, next) => {
    try {
        const { name, age } = req.body;
        const cat = await Cat.update(req.params.id, name, age);
        return res.json(cat);
    } catch (e) {
        return next(e);
    }
});

// Aging the cat 

router.patch("/:id", async (req, res, next) => {
    try {

        const cat = await Cat.age(req.params.id);
        return res.json(cat);
    } catch (e) {
        return next(e);
    }
});

router.patch("/:id", async (req, res, next) => {
    try {
        const { name } = req.body;
        const cat = await Cat.changeName(req.params.id, name);
        return res.json(cat);
    } catch (e) {
        return next(e);
    }
});

module.exports = router; 