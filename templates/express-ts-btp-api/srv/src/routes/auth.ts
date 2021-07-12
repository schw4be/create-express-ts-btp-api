import { Router } from "express";
import xsenv from "@sap/xsenv";
import xssec from "@sap/xssec";
import passport from "passport";

const router = Router();

xsenv.loadEnv();

const services = xsenv.getServices({
    uaa: { tag: "xsuaa" },
});

passport.use("JWT", new xssec.JWTStrategy(services.uaa));
router.use(passport.initialize());
router.use(
    passport.authenticate("JWT", {
        session: false,
    })
);

/**
 * Require user to be logged in for all routes
 */
router.use((req, res, next) => {
    if (req.authInfo.checkScope("uaa.user")) {
        next();
    } else {
        res.status(401).send();
    }
});

export default router;
