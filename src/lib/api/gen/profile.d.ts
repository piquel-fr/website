export interface paths {
    "/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get user profile
         * @description Get user by query param 'username', or the currently authenticated user if empty
         */
        get: operations["get-profile"];
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
        UpdateUserParams: {
            image: string;
            name: string;
            username: string;
        };
        User: {
            /** Format: date-time */
            createdAt: string;
            /** Format: email */
            email: string;
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
    "get-profile": {
        parameters: {
            query?: {
                /** @description Optional username. If omitted, returns current user. */
                username?: string;
            };
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
}
