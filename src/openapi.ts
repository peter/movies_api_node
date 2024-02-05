import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";

export function setup(server: any) {
    const swaggerOptions = {
        swagger: {
            info: {
                title: "Example Node/Fastify REST APIs",
                description: "Example CRUD API for movies data in Postgres",
                version: "1.0.0",
            },
            host: "localhost",
            schemes: ["http", "https"],
            consumes: ["application/json"],
            produces: ["application/json"],
            tags: [
                { name: "movies" },
            ],
        },
    };
    
    const swaggerUiOptions = {
        routePrefix: "/docs",
        exposeRoute: true,
    };
    
    server.register(fastifySwagger, swaggerOptions);
    server.register(fastifySwaggerUi, swaggerUiOptions);    
}
