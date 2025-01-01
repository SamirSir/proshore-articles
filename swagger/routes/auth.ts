module.exports = {
    "/api/v1/auth/signup": {
        post: {
            tags: ["Auth"],
            summary: "Register User",
            security: [],
            parameters: [
                {
                    in: "header",
                    name: "accept-language",
                    description: "Language preference",
                    required: false,
                    schema: {
                        type: "string",
                    },
                },
            ],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                name: {
                                    type: "string",
                                    description: "User's full name",
                                    example: "John Doe",
                                },
                                email: {
                                    type: "string",
                                    description: "User's email address",
                                    format: "email",
                                    example: "john.doe@example.com",
                                },
                                password: {
                                    type: "string",
                                    description: "User's password",
                                    format: "password",
                                    example: "securePassword123",
                                },
                            },
                            required: ["name", "email", "password"],
                        },
                    },
                },
            },
            responses: {
                201: {
                    description: "User registered successfully",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    message: {
                                        type: "string",
                                        example: "User registered successfully",
                                    },
                                },
                            },
                        },
                    },
                },
                400: { description: "Bad request", },
                409: { description: "Conflict, email already registered" },
                422: { description: "Unprocessable entities" },
                500: { description: "Internal server error", },
            },
        },
    },
    "/api/v1/auth/login": {
        post: {
            tags: ["Auth"],
            summary: "User Login",
            security: [],
            parameters: [
                {
                    in: "header",
                    name: "accept-language",
                    description: "Language preference",
                    required: false,
                    schema: {
                        type: "string",
                    },
                },
            ],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                email: {
                                    type: "string",
                                    description: "User's email address",
                                    format: "email",
                                    example: "john.doe@example.com",
                                },
                                password: {
                                    type: "string",
                                    description: "User's password",
                                    format: "password",
                                    example: "securePassword123",
                                },
                            },
                            required: ["email", "password"],
                        },
                    },
                },
            },
            responses: {
                200: {
                    description: "User logged in successfully and access token generated",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    message: {
                                        type: "string",
                                        example: "User logged in successfully",
                                    },
                                    data: {
                                        type: "object",
                                        properties: {
                                            accessToken: {
                                                type: "string",
                                                description: "JWT (JSON Web Token) generated upon successful login. This token is used as a Bearer token to authenticate requests to protected endpoints in the app.",
                                            }
                                        }
                                    }
                                },
                            },
                        },
                    },
                },
                400: { description: "Bad request", },
                422: { description: "Unprocessable entities, invalid input data" },
                500: { description: "Internal server error", },
            },
        },
    },
};
