const jwt = require("jsonwebtoken");
require("dotenv").config();
const generateAuthToken = (user) => {
  const jwtSecretKey = process.env.JWT_SECRET_KEY;
  const token = jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      user_id: user.user_id,
      phone: user.phone ,
      address: user.address ,
      city: user.city ,
      district: user.district ,
      country: user.country ,
    
    },
    jwtSecretKey,
    {
      // radom token moi 30s 
      expiresIn: '30s'
    }
  );

  return token;
};

module.exports = generateAuthToken;