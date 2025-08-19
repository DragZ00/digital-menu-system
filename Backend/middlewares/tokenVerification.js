const jwt = require("jsonwebtoken");
const createHttpError = require("http-errors");
const config = require("../config/config"); // dosya yolunu kendi proje yapına göre ayarla
const User = require("../models/userModel");


const isVerifiedUser = async (req, res, next) => {
    try {

        const {accessToken} = req.cookies || {};

        if (!accessToken) {
            const error = createHttpError(401, "Lütfen giriş yapın!");
            return next(error);
        }

        const decodeToken = jwt.verify(accessToken, config.accessTokenSecret);

        const user = await User.findById(decodeToken._id);

        if(!user) {
            const error = createHttpError(401, "Kullanıcı bulunamadı!");
            return next(error);
        }

        req.user =user;
        next();

} catch (error) {
        const err = createHttpError(401, "Hatalı giriş");
        next(err);
    }
  }

  module.exports = {isVerifiedUser};