declare namespace Express {
    /**
     * See @sap/xssec/lib/xssec.js => SecurityContext
     */
    export interface AuthInfo {
        // isInForeignMode(): boolean;
        checkScope(scope: string): boolean;
    }

    export interface User {
        id: string;
        emails: { value: string }[];
    }

    // TODO geht das besser? alternative: null-checks in allen anderen Modulen...
    export interface Request {
        authInfo: AuthInfo;
        user: User;
    }
}
