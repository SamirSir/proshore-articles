module.exports = {
    "/api/v1/articles/": {
        post: {
            tags: ["Article"],
            summary: "Create Article",
            security: [
                {
                    BearerAuth: [],
                },
            ],
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
                    "multipart/form-data": {
                        schema: {
                            type: "object",
                            properties: {
                                title: {
                                    type: "string",
                                    description: "Title of the article",
                                    example: "How to write OpenAPI specifications",
                                },
                                content: {
                                    type: "string",
                                    description: "Main content of the article in a file (e.g. image, text or document file)",
                                    example: "OpenAPI specifications details",
                                },
                                file: {
                                    type: "file",
                                    format: "binary",
                                    description: "Optional additional file attachment (e.g., images or resources).",
                                },
                            },
                            required: ["title",],
                        },
                    },
                },
            },
            responses: {
                201: {
                    description: "Article created successfully",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    message: {
                                        type: "string",
                                        example: "Articles retrieved successfully",
                                    },
                                    data: { $ref: '#/components/schemas/Article', },
                                },
                            },
                        },
                    },
                },
                400: { description: "Bad request; Likely due to missing or invalid parameters" },
                401: { description: "Unauthorized; Ensure the Bearer token is valid and included" },
                409: { description: "Conflict; Likely due to duplicate article data" },
                422: { description: "Unprocessable entities; Validation failed for provided data" },
                500: { description: "Internal server error; Something went wrong on the server" },
            },
        },
        get: {
            tags: ["Article"],
            summary: "List articles",
            security: [
                { BearerAuth: [] }
            ],
            parameters: [
                { $ref: '#/components/parameters/AcceptLanguageHeader' },
                {
                    in: "query",
                    name: "page",
                    description: "Page number for pagination",
                    required: false,
                    schema: {
                        type: "integer",
                        example: 1,
                    },
                },
                {
                    in: "query",
                    name: "limit",
                    description: "Number of articles per page",
                    required: false,
                    schema: {
                        type: "integer",
                        example: 10,
                    },
                },
            ],
            responses: {
                200: {
                    description: "List of articles retrieved successfully",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    message: {
                                        type: "string",
                                        example: "Articles retrieved successfully",
                                    },
                                    data: {
                                        type: "array",
                                        items: { $ref: '#/components/schemas/Article' },
                                    },
                                },
                            },
                        },
                    },
                },
                400: { description: "Bad request, invalid query parameters", },
                401: { description: "Unauthorized, invalid credentials or token", },
                500: { description: "Internal server error", },
            },
        },
    },
    "/api/v1/articles/{id}": {
        get: {
            tags: ["Article"],
            summary: "Get a single article",
            security: [
                { BearerAuth: [], },
            ],
            parameters: [
                { $ref: '#/components/parameters/AcceptLanguageHeader' },
                {
                    in: "path",
                    name: "id",
                    description: "ID of the article to retrieve",
                    required: true,
                    schema: {
                        type: "integer",
                        example: 123,
                    },
                },
            ],
            responses: {
                200: {
                    description: "Article retrieved successfully",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    message: {
                                        type: "string",
                                        example: "Articles retrieved successfully",
                                    },
                                    data: { $ref: '#/components/schemas/Article', },
                                },
                            },
                        },
                    },
                },
                400: { description: "Bad request, invalid query parameters or missing article" },
                401: { description: "Unauthorized, invalid credentials or token" },
                404: { description: "Article not found" },
                500: { description: "Internal server error" },
            },
        },
        put: {
            tags: ["Article"],
            summary: "Update an existing article",
            security: [
                { BearerAuth: [], },
            ],
            parameters: [
                { $ref: '#/components/parameters/AcceptLanguageHeader' },
                {
                    in: "path",
                    name: "id",
                    description: "ID of the article to update",
                    required: true,
                    schema: {
                        type: "integer",
                        example: 123,
                    },
                },
            ],
            requestBody: {
                required: true,
                content: {
                    "multipart/form-data": {
                        schema: {
                            type: "object",
                            properties: {
                                title: {
                                    type: "string",
                                    description: "Title of the article",
                                    example: "Updated Article Title",
                                },
                                content: {
                                    type: "string",
                                    description: "Updated content of the article",
                                    example: "This article discusses the updated RESTful APIs...",
                                },
                                file: {
                                    type: "file",
                                    format: "binary",
                                    description: "Updated file for the article (optional)",
                                },
                            },
                            required: [],
                        },
                    },
                },
            },
            responses: {
                200: {
                    description: "Article updated successfully",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    message: {
                                        type: "string",
                                        example: "Article updated successfully",
                                    },
                                    data: { $ref: '#/components/schemas/Article', },
                                },
                            },
                        },
                    },
                },
                400: { description: "Bad request, invalid or missing parameters" },
                401: { description: "Unauthorized, invalid credentials or token" },
                404: { description: "Article not found" },
                409: { description: "Conflict, attempting to update with conflicting data" },
                422: { description: "Unprocessable entity, validation failed" },
                500: { description: "Internal server error" },
            },
        },
        delete: {
            tags: ["Article"],
            summary: "Delete an article",
            security: [
                { BearerAuth: [], },
            ],
            parameters: [
                { $ref: '#/components/parameters/AcceptLanguageHeader' },
                {
                    in: "path",
                    name: "id",
                    description: "ID of the article to delete",
                    required: true,
                    schema: {
                        type: "integer",
                        example: 123,
                    },
                },
            ],
            responses: {
                200: {
                    description: "Article deleted successfully",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    message: {
                                        type: "string",
                                        example: "Article deleted successfully",
                                    },
                                },
                            },
                        },
                    },
                },
                400: { description: "Bad request, invalid parameters", },
                401: { description: "Unauthorized, invalid credentials or token", },
                404: { description: "Article not found", },
                500: { description: "Internal server error", },
            },
        },
    }

};
