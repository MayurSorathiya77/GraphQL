const express = require('express');
const bodyParser = require('body-parser');
const {ApolloServer} = require('@apollo/server')
const {expressMiddleware} = require('@apollo/server/express4')
const cors = require('cors');
const mongoose = require('mongoose');

const Student = require('./model/student')

async function startServer()
{
    const app = express();
    const server = new ApolloServer({

        typeDefs : `
            type Todo  {
                id : ID!,
                user : User,
            }

            type User  {
                id : ID!,
                name : String!,
                email : String!,
                password : Student,
            }

            type Student{
                name : String!,
                password : String!,
            }

            type Query  {
                getTodo : [Todo],
                getMyUser : [Student]
            }
        `,
        resolvers:{
            Todo : {

                user : (todo)=>{return { id: '1', name: 'Mayur',email:'mayur@gmai.com' };},

            },
            User : {
                password : (User)=>{
                    return {name:"Mayur",password:"adfa"}
                }
            },
            Query: {
                getTodo: async () => {
                    // Your resolver logic here to fetch todos
                    // This is just a placeholder resolver returning an array of todos
                    return [
                        { id: '1', name: 'Mayur' },
                        { id: '2', name: 'Raj' },
                        { id: '3', name: 'Kaushik' },
                    ];
                },
                getMyUser:async () =>{
                    

                    return [{name:"Mayur",password:"adfa"}]
                },
            },
        }
    });

    app.use(bodyParser.json());
    app.use(cors());
    await server.start();

    app.use('/graphql',expressMiddleware(server));

    app.listen(8000,()=>{console.log("server is up")});
}
async function database()
{
    mongoose.connect('mongodb://127.0.0.1:27017/userDatabase').then(()=>{
        console.log('Database Connected');
    }).catch((err)=>{
        console.log("Something is wrong there in database");
    });
}
database();
startServer();