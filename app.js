const express = require("express");
const userRoute = require("./routes/userRoute");
const documentRoute = require("./routes/documentRoute");
const sharedKeyRoutes = require("./routes/sharedKeyRoutes");
const app = express();
const morgan = require("morgan");
const Student = require("./models/userModel");
const cors = require("cors");
const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;

passport.use(
    "student",
    new JwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET,
        },
        async function (jwt_payload, done) {
            console.log(jwt_payload);
            const user = await Student.findById({
                _id: jwt_payload.id,
                verified: true,
            });
            console.log(user);

            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        }
    )
);

// passport.serializeUser(function (user, done) {
//     done(null, user.id);
// });

// passport.deserializeUser(function (id, done) {
//     Student.findById(id, function (err, user) {
//         done(err, user);
//     });
// });
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use("/api/v1/auth", userRoute);
app.use("/api/v1/document", documentRoute);
app.use("/api/v1/sharedKey", sharedKeyRoutes);

module.exports = app;
