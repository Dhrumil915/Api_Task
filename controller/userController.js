const User = require('../Models/userModel') 
const sendToken = require("../sendToken");



// Register User
  exports.registerUser = async(req,res,next) => {
    const {name, email, password,  mobile} = req.body;

    if(!name || !email || !password || mobile){
       return res.status(400).json({
      success: false,
      message: "Please Enter All feild",
    })
    }
    const userExists = await User.findOne({email});
    if(userExists){
        return next(
       res.status(400).json({
      success: false,
      message: "User Already exist",
    })
        )
    }

    const user = await User.create({
        name:name,
        email:email,
        password:password,
         mobile: mobile
    })
    
        sendToken(user, 201, res);
  };
  
// Login User
exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  // checking if user has given password and email both

  if (!email || !password) {
     return res.status(200).json({
      success: false,
      message: "Please Enter email and password",
    })
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
     return res.status(401).json({
      success: false,
      message: "Invalid email and password",
    })
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
     return res.status(200).json({
      success: false,
      message: "Invalid email and password",
    })  }

  sendToken(user, 200, res);
};