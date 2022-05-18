// Create a route GET on endpoint /verify/:token. The process must :
// Check if the token is available in the database
// Check if the token is available on a user
// if the user is linked to this token –> res.send(“token valid”);
// if the token doesn’t exist or no user is linked to that –> res.status(401).send(“invalid token”);

const pool = require("../db/client");

const verifyTokenHandler = async (req, res, next) => {
  const { token } = req.params;
  try {
    const { rowCount: tokenExists } = await pool.query(
      "SELECT * FROM tokens WHERE value=$1",
      [token]
    );
    const { rowCount: tokenExistsOnUser } = await pool.query(
      "SELECT * FROM users WHERE token_value=$1",
      [token]
    );

    if (!tokenExists || !tokenExistsOnUser)
      return res.status(401).send("invalid token");

    return res.status(200).send("token valid");
  } catch (err) {
    console.log(err);
    next(err);
  }
};
module.exports = { verifyTokenHandler };
