# Scaling Web Sockets

This project is meant to be an exercise in implementing a web socket server
with high availability and resiliency. 
The app will include a simple chat feature, allowing users to create or select
an already existing room, where users can send messages to other users in the
room.

We can simulate different scenarios such as high load on the server by running
the application with bots constantly sending messages. The system should be able
to support high load handle requests in a distributed fashion.

## Techologies
Web Socket Server
- EC2 and socket.io
- CloudFlare worker?
- load balancer (ELB)

Pub/Sub broker
- Redis
- SNS

check out: https://socket.io/docs/v4/redis-adapter/

## Methodologies

To allow for rapid iteration on infrastructure, terraform will be used to 
provision resources and manage the deployment of services. The deployment
process can be initiated by a GitHub Action workflow

For load testing, we can deploy a playwright script to hit the test server with
many concurrent requests
check out: https://socket.io/docs/v4/load-testing/

## Socket.io and PM2
https://socket.io/docs/v4/pm2/

## Frontend
can be hosted on S3/Cloudflare Pages
React + Socket.io/client

## Diagrams
https://www.tldraw.com/s/v2_c_biKqLKEU9NSWIFIcUMLWy?viewport=-221%2C-672%2C5317%2C2681&page=page%3AjsNPQs_8vL3XA8Q6etPkC

## Requirements

- users can log in w/ username + password (hashed)
- users can create and join rooms
- users in a given room can send each other messages
- users can friend request each other
- users can send each friends direct messages
- users can delete messages, making them not visible to other users
- rooms and their messages should be persistent. on joining a room should display recent messages
- users can block other users, preventing their messages from being seen
- users can be banned at the IP level
- users can have role USER or ADMIN
- ADMIN users can ban USER users

Will need:
- database
    - Tables: users, friends, rooms, messages, blocks, and respective junction tables
- routes:
    - /login POST
    - /signup POST
    - /rooms GET
    - /rooms POST
    - /account GET
    - /users/block POST
    - /users/add POST
    - /users/remove POST
    - /users/ban POST
- ws events:
    - connection
    - join_room
    - new_chat_message
    - new_direct_message

