
const config = require("../config/config");
const createHttpError = require("http-errors");
const User =require("../models/userModel");
const jwt = require("jsonwebtoken");

const register = async (req, res, next) => {
 try{
   const {name , phone, email, password, role} = req.body || {};

   if(!name || !phone || !email || !password || !role) {
    const error = createHttpError(400, "Lütfen tüm alanları doldurun!");
      return next(error);
   }
    const isUserPresent = await User.findOne({email});
    if(isUserPresent) {
      const error = createHttpError(400, "Bu email zaten kayıtlı!");
      return next(error);
    }

    const user = { name, phone, email, password, role };
    const newUser = User(user);
    await newUser.save();

    res.status(201).json({ 
        success: true, 
        message: "Kullanıcı başarıyla kaydedildi!",
        data: newUser });

 } catch (error) {
     next(error);
  }

}
const login = async (req, res, next) => {
 try{
   
    const {email, password} = req.body || {};

    if(!email || !password) {
      const error = createHttpError(400, "Lütfen email ve şifre girin!");
      return next(error);
    }

    const isUserPresent = await User.findOne({email});
    if(!isUserPresent) {
      const error = createHttpError(401, "Bu email ile kayıtlı kullanıcı bulunamadı!");
      return next(error);
    }

    if (password !== isUserPresent.password) {
      const error = createHttpError(401, "Şifre yanlış!");
      return next(error);
    }

    const accessToken = jwt.sign(
      { _id: isUserPresent._id},
      config.accessTokenSecret,
    {expiresIn: '1d'}
      );
      console.log("User ID:", isUserPresent._id);

      res.cookie("accessToken", accessToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 gün
        httpOnly: true,
        secure: true, // HTTPS üzerinden gönderilecek
        sameSite: "none",
      });

      res.status(200).json({
        success: true,
        message: "Giriş başarılı!",
        data: isUserPresent, 
        
      });

 } catch (error) {
     next(error);
  }
}



const getUserData = async (req, res, next) => {
  try{

    const user = await User.findById(req.user._id);
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};


module.exports = {
    register,
    login,
    getUserData
  }