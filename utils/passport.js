const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.PASSPORT_SECRET;

const authenticated = passport.use(
    "student",
    new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.PASSPORT_SECRET,
    }, async function (jwt_payload, done) {
        console.log(jwt_payload);
        const user = await Student.findById({
            _id: jwt_payload.identifier,
            verified: true,
        });

        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    })
);

moduleexports = authenticated;