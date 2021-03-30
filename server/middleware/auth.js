import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    //we get the token from frontend
    const token = req.headers.authorization.split(" ")[1];
    //we check the token from googleAuth or our own
    const isCustomAuth = token.length < 500; // token length gt 500 it's google auth
    let decodedData; // this is the data we wanna get from token itself
    //if we have token & the token is our own
    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, "test"); //it gives data for each specific token// in this case usename & id
      //we store e the data
      req.userId = decodedData.id;
    } else {
      // if it`s google auth
      decodedData = jwt.decode(token);
      req.userId = decodedData.sub; // sub is google id that differentiates evry single user
    }
    next();
  } catch (error) {
    console.log(error);
  }
};
export default auth;
//where to use this middleware ans is in the routes
