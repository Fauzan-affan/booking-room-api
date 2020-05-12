const express = require("express");
const cors = require("cors");
const pool = require("./db.js");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// POST room
app.post("/room", async (req, res) => {
    try {
        const {name, description, capacity, projector} = req.body;
        const newCompany = await pool.query(
            "INSERT INTO tb_room (name, description, capacity, projector) VALUES ($1, $2, $3, $4) RETURNING *",
            [name, description, capacity, projector]
        )

        res.json(newCompany.rows);
    } catch (err) {
        console.log(err.message)
    }
});

// GET room
app.get("/room", async (req, res) => {
    try {
        const allRooms = await pool.query("SELECT * FROM tb_room");
        res.json(allRooms.rows);
    } catch (err) {
        console.log(err.message)
    }
});

// GET room by id
app.get("/room/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const roomById = await pool.query("SELECT * FROM tb_room where id_room = $1", [id]);
        res.json(roomById.rows);
    } catch (err) {
        console.log(err.message)
    }
});

// PUT room
app.put("/room/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const {name, description, capacity, projector} = req.body;
        const updateRoom = await pool.query(
            `
            UPDATE tb_room
            SET name = $1,
                description = $2,
                capacity = $3,
                projector = $4
            WHERE id_room = $5
            `,
            [name, description, capacity, projector, id]
        )

        res.json("room updated!");
    } catch (err) {
        console.log(err.message)
    }
});

// DELETE room
app.delete("/room/:id", async (req, res) => {
    const { id } = req.params;
    const deleteRoom = await pool.query("DELETE FROM tb_room WHERE id_room = $1", [id]);

    res.json("room was deleted!");
});

app.listen(PORT, () => console.log(`Running at PORT ${PORT}`));