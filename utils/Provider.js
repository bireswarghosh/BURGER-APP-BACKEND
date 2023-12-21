import { Strategy as GoogleStrategy } from "passport-google-oauth20"; // google auth 
import passport from "passport";
import { User } from "../models/User.js";
// ! help from --> https://www.passportjs.org/packages/passport-google-oauth20/
// now call this (connectPassport) fun on app.js
export const connectPassport = () => {
  passport.use(
    // add strategy 
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
      },
      // in official website this  fun is normal fun but hear i add async fun because it find data from 3rd party data base 
      async function (accessToken, refreshToken, profile, done) {
        // find from schema of User
        const user = await User.findOne({
          // find googleId from profile.id
          googleId: profile.id,
        });

        if (!user) {
          // if not user so create new  and add all this data of user  
          const newUser = await User.create({
            // for that add     googleId from profile.id,     name from profile.displayName,         photo from profile.photos[0].value add 0 index photo this all are in build
            googleId: profile.id,
            name: profile.displayName,
            photo: profile.photos[0].value,
            // hear i want to store user email id ?
            // store user email id from profile.emails[0].value
            // eMailId: profile.emails[0].value,
          });
            // then done null  and crate new user 
          return done(null, newUser);
        } else {
          // if all ready exist then show user
          return done(null, user);
        }
      }
    )
  );

  // if not then add id 
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // if user already exist then find his id  and show user 
  passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
  });
};
 
