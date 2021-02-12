const db = require("../db");
const ExpressError = require("../expressError");

class Cat {
    static async getAll() {
        let result = await db.query('SELECT * FROM cats');

        let cats = result.rows;

        return cats;
    }
    static async getById(id) {
        let result = await db.query('SELECT * FROM cats WHERE id = $1', [id]);
        if (result.rows.length === 0) throw new ExpressError("Cat not found", 404);
        return result.rows[0];
    }

    static async create(name, age) {
        if (!name || !age) throw new ExpressError("Missing name or age", 400);
        let result = await db.query('INSERT INTO cats (name, age) VALUES ($1, $2) RETURNING id, name, age', [name, age]);

        return result.rows[0];
    }



    static async delete(id) {
        let result = await db.query(`DELETE FROM cats WHERE id = $1 RETURNING id`, [id]);

        if (result.rows.length === 0) throw new ExpressError("Cat not found", 404);

    }

    static async update(id, newName, newAge) {
        let result = await db.query(`
        UPDATE cats SET name = $1, age = $2 WHERE id = $3 RETURNING id, name, age`, [newName, newAge, id]);
        if (result.rows.length === 0) throw new ExpressError("Cat not found", 404);
        return result.rows[0];


    }

    static async age(id) {
        let result = await db.query(`
        UPDATE cats SET age =  age + 1 WHERE id = $1 RETURNING id, name, age`, [id]);
        if (result.rows.length === 0) throw new ExpressError("Cat not found", 404);
        return result.rows[0];
    }

    static async changeName(id, newName) {
        let result = await db.query(`
        UPDATE cats SET name =  $1 WHERE id = $2 RETURNING id, name, age`, [newName, id]);
        if (result.rows.length === 0) throw new ExpressError("Cat not found", 404);
        return result.rows[0];
    }


}

module.exports = Cat;