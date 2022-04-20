# Social-Network-Api
## David Aylward

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)


<hr>

##  Table Of Contents

1. [About](#about)

2. [How To Use](#how-to-use)

3. [Api Breakdown](#api-breakdown)

4. [Reference Links](#reference-links)

5. [Demonstration](#demonstration)

<hr>

## About

This application is made to setup the api that would be used in a social media application. In the application you will be able to create users, view users, and delete users. You can also create, view, and delete posts, with this API you can also add friends, and remove friends. Finally with this API you can react to user's posts, leaving comments or messages on the posts.

<hr>


## How To Use

To run this application you must either run the command `npm start` or `nodemon` in your terminal. From here you can go into insomnia and use the routes, this will be demonstrated later in this readme.

<hr>

## API Breakdown

This API uses models, controllers, routes and a connection file to make everything work. A lot of these files have similar patterns they follow, in example the get method for posts and users look very similar.
#### Get for Posts
        getThoughts(req, res) {
        Thought.find()
            .then((Thoughts) => res.json(Thoughts))
            .catch((err) => res.status(500).json(err));
    }, 

#### Get for Users
     getUsers(req, res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    }, 

<hr>

## Reference Links

### MONGODB documentation

https://www.mongodb.com/docs/manual/core/document/

### Models in MONGO

https://www.mongodb.com/docs/manual/core/data-modeling-introduction/

### Routing

https://www.geeksforgeeks.org/routing-in-node-js/

<hr>

## Demonstration
