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

## Methodologies

To allow for rapid iteration on infrastructure, terraform will be used to 
provision resources and manage the deployment of services. The deployment
process can be initiated by a GitHub Action workflow

For load testing, we can deploy a playwright script to hit the test server with
many concurrent requests

hi
