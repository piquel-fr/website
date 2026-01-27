export interface paths {
    "/self": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get self user object
         * @description Get the user that is associated with the auth
         */
        get: operations["get-self"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/{user}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get specific user
         * @description Get the profile of the user specified in the path
         */
        get: operations["get-user-by-path"];
        /**
         * Update user
         * @description Update the profile of the specified user
         */
        put: operations["update-user"];
        post?: never;
        /**
         * Delete user
         * @description Delete the user specified in the path
         */
        delete: operations["delete-user"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/{user}/admin": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        /**
         * Update user
         * @description Update the profile of the specified user
         */
        put: operations["update-user-admin"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        UpdateUserAdminParams: {
            /** Format: email */
            email: string;
            image: string;
            name: string;
            role: string;
            username: string;
        };
        UpdateUserParams: {
            image: string;
            name: string;
            username: string;
        };
        User: {
            /** Format: date-time */
            createdAt: string;
            /** Format: email */
            email?: string;
            /** Format: int32 */
            id: number;
            image: string;
            name: string;
            role: string;
            username: string;
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
    "get-self": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description User profile found */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["User"];
                };
            };
        };
    };
    "get-user-by-path": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The username */
                user: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description User profile found */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["User"];
                };
            };
        };
    };
    "update-user": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The username to update */
                user: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["UpdateUserParams"];
            };
        };
        responses: {
            /** @description User updated successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Invalid input or json */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": string;
                };
            };
        };
    };
    "delete-user": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The username */
                user: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description User deleted successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": string;
                };
            };
        };
    };
    "update-user-admin": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The username to update */
                user: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["UpdateUserAdminParams"];
            };
        };
        responses: {
            /** @description User updated successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Invalid input or json */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": string;
                };
            };
        };
    };
}
