const express = require("express");
const userRoute = require("./routes/userRoute");
const documentRoute = require("./routes/documentRoute");
const app = express();
const Student = require("./models/userModel");

const cookieParser = require("cookie-parser");
const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;


passport.use(
    "student",
    new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET,
    }, async function (jwt_payload, done) {
        const user = await Student.findById({
            _id: jwt_payload.identifier,
        });
        console.log(user);

        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    })
);

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    Student.findById(id, function (err, user) {
        done(err, user);
    });
});

app.use(express.json());
app.use("/api/v1/auth", userRoute);
app.use("/api/v1/document", documentRoute);

module.exports = app;
