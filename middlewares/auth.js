import ErrorHandler from "../utils/ErrorHandler.js";

export const isAuthenticated = (req, res, next) => {
//  const token = req.cookies;
 
 
  const token = req.cookies["connect.sid"];
  console.log(token);
  if (!token) {
    return next(new ErrorHandler("Not Logged In", 401)); // when ERROR in  basically we can passed  only err massage  but if  i want to pass statusCode as  my wishes  so it did not posable so  cerate  a new file to possible it , file exist on  \utils\ErrorHandler.js --> hear to receive err massage by using super() . and receive statusCode by using this.statusCode 
  }
  next();

//  //! another approch
//   const cookieName = "connect.sid";
//   console.log(cookieName);
//   if (req.cookies && req.cookies[cookieName]) {
//     // Cookie is present, user is authenticated
//     next();
//   } else {
//     // Cookie is not present, user is not authenticated
//     res.status(401).json({ success: false, message: "Unauthorized" });
//   }


};
export const authorizeAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return next(new ErrorHandler("Only Admin Allowed", 405));
  }
  next();
};// if role only admin so then this authorizeAdmin middle wear will work 
