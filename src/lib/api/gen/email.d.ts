export interface paths {
    "/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List email accounts
         * @description List accounts belonging to the authenticated user, or a specific user if admin.
         */
        get: operations["list-email-accounts"];
        /**
         * Create email account
         * @description Create a new email account for the authenticated user
         */
        put: operations["add-email-account"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/{email}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get account info
         * @description Get details of a specific email account
         */
        get: operations["get-email-account"];
        put?: never;
        post?: never;
        /**
         * Remove account
         * @description Delete an email account
         */
        delete: operations["delete-email-account"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/{email}/share": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        /**
         * Share account
         * @description Share an email account with another user
         */
        put: operations["share-email-account"];
        post?: never;
        /**
         * Remove share
         * @description Stop sharing an email account with a specific user
         */
        delete: operations["unshare-email-account"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        AddAccountPayload: {
            /** Format: email */
            email?: string;
            name?: string;
            password?: string;
            username?: string;
        };
        MailAccount: {
            /** Format: email */
            email?: string;
            /** Format: int32 */
            id?: number;
            name?: string;
            /** Format: int32 */
            ownerId?: number;
        };
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    "list-email-accounts": {
        parameters: {
            query?: {
                /** @description Optional username to filter by (admin only) */
                user?: string;
                /** @description If present, returns only the count of accounts as text */
                count?: boolean;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Count of all the email accounts */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "*/*": number;
                };
            };
        };
    };
    "add-email-account": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["AddAccountPayload"];
            };
        };
        responses: {
            /** @description Account created successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Invalid input */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "get-email-account": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The email address of the account */
                email: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Account details */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["MailAccount"];
                };
            };
        };
    };
    "delete-email-account": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The email address to delete */
                email: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Account deleted successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "share-email-account": {
        parameters: {
            query: {
                /** @description The username to share the account with */
                user: string;
            };
            header?: never;
            path: {
                email: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Account shared successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "unshare-email-account": {
        parameters: {
            query: {
                /** @description The username to remove access from */
                user: string;
            };
            header?: never;
            path: {
                email: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Share removed successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
}
