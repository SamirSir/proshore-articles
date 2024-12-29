module.exports = {
    '/api/v1/articles/{id}': {
        get: {
            tags: ['Customers'],
            summary: 'Find Article by ID',
            security: [
                // {
                //   BearerAuth: [],
                // },
                {
                    ApiKeyAuth: [],
                },
                {
                    BasicAuth: []
                }
            ],
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    required: true,
                    schema: {
                        type: 'string',
                    },
                    description: 'The article id',
                },
            ],
            responses: {
                200: {
                    description: 'Article found',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    id: {
                                        type: 'string',
                                    },
                                    name: {
                                        type: 'string',
                                    },
                                    // add other article properties as needed
                                },
                            },
                        },
                    },
                },
                404: {
                    description: 'Article not found',
                },
            },
        },
    },
};
