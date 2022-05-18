const pool = require("../db/client");
const crypto = require("crypto");

const createNewUser = async (req, res) => {
  try {
    const { username } = req.body;

    const { rows } = await pool.query(
      "INSERT INTO users (username) VALUES ($1) RETURNING *",
      [username]
    );
    return res.status(201).send(rows);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const createTokenForUser = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const token = crypto.randomUUID();
    console.log(userId);
    const {
      rows: [{ value }],
    } = await pool.query("INSERT INTO tokens (value) VALUES ($1) RETURNING *", [
      token,
    ]);

    const { rows } = await pool.query(
      "UPDATE users SET token_value=$1 WHERE id=$2 RETURNING *",
      [value, userId]
    );
    return res.status(201).send(rows);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = { createTokenForUser, createNewUser };
