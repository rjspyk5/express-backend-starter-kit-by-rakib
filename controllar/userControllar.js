const User = require("../model/userModel");
const database = require("../services/database");
const genarateToken = require("../utils/genarateToken");

const userControllar = {
  login: async (req, res, next) => {
    const credentials = req.body;
    try {
      const result = await User.findOne({ email: credentials?.email });
      const isPasswordMatched = await result.isPasswordMatched(
        credentials?.password
      );
      if (!isPasswordMatched)
        return res
          .status(400)
          .send({ message: "Password didn't match", success: false });
      const token = genarateToken({ email: credentials?.email });
      res
        .status(200)
        .send({ success: true, message: "Successfully Login", token });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  register: async (req, res, next) => {
    const data = req.body;
    try {
      const result = await database.create(User, data);
      res.status(200).send({
        success: true,
        message: "registration successfull",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = userControllar;
