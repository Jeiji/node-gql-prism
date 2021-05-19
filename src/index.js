const { ApolloServer } = require('apollo-server');
const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');


// "Database", lol
// let links = [
//     {
//         id: 'link-0',
//         url: 'www.howtographql.com',
//         description: 'Fullstack tutorial for GraphQL'
//     },
//     {
//         id: 'link-1',
//         url: 'www.howtasdfl.com',
//         description: 'Fulas dflasd fGraphQL'
//     }
// ]


// Resolvers
const resolvers = {
    Query: {
        info: () => `This is the API of a Hackernews Clone`,
        
    },
    Mutation: {
        post: (parent, args, context) => {
            const newLink = context.prisma.link.create({
                data: {
                    url: args.url,
                    description: args.description,
                },
            })
            return newLink;
        },
        deleteLink: (parent, args) => links = links.filter(link => link.id != args.id),
        updateLink: (parent, args) => {
            let indexOfLinkToChange = links.findIndex(link => link.id == args.id)
            links[indexOfLinkToChange].url = args.url ? args.url : links[indexOfLinkToChange].url
            links[indexOfLinkToChange].description = args.description ? args.description : links[indexOfLinkToChange].description

            return links[indexOfLinkToChange];
        },

    }
}

// Real Database
const prisma = new PrismaClient();

// Apollo GraphQL Server Def

const server = new ApolloServer({
    typeDefs: fs.readFileSync(
        path.join(__dirname, 'schema.graphql'),
        'utf8'
    ),
    resolvers,
    context: {
        prisma,
    },
})

server.listen()
    .then(({ url, port }) =>
        console.log(`Server is running on port ${port} (full url: ${url})`)
    );

