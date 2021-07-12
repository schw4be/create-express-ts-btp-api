declare module "@sap/xssec" {
    import { Request } from "express";

    export class JWTStrategy {
        constructor(options: unknown);

        authenticate(req: Request, options?: unknown): void;
    }
}
