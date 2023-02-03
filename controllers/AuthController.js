import { registerSchema, loginSchema } from "../joiValidation/validation.js";
import bcrypt from "bcrypt";
import { db } from "../user_db.js";

// REGISTER
export const register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    db.query(
      "SELECT email FROM user_table WHERE email =?",
      [email],
      async (error, user) => {
        if (error) return res.status(400).json({ message: error.sqlMessage });
        if (user.length !== 0)
          return res.status(400).json({ message: "email already taken" });
        else {
          const hashPassword = bcrypt.hashSync(password, 10);
          const q =
            "INSERT INTO user_table( `firstName`, `lastName`, `email`, `password`) VALUES (?)";
          const values = [firstName, lastName, email, hashPassword];
          db.query(q, [values], (error, user) => {
            if (error) return res.status(400).json(error.sqlMessage);

            res.status(200).json(user);
          });
        }
      }
    );
  } catch (error) {
    res.status(500).json(error);
  }
};

// LOGIN
export const login = async (req, res) => {
  const { email, password } = req.body;
  const { error } = loginSchema.validate(req.body);
  if (error) return res.status(400).json(error.details[0].message);
  try {
    db.query(
      "SELECT * FROM user_table WHERE email =?",
      [email],
      (err, user) => {
        if (err) return res.status(400).json({ message: err.sqlMessage });
        if (user[0] === undefined)
          return res.status(400).json({ message: "email does not exist" });
        const encryptedPassword = bcrypt.compareSync(
          password,
          user[0].password
        );
        if (!encryptedPassword)
          return res.status(400).json({ message: "invalid password" });
        else {
          res.status(200).json("login successfull");
        }
      }
    );
  } catch (error) {
    res.status(500).json(error.sqlMessage);
  }
};
