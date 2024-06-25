# Destiny 2 Lore Database 
For this skills assessment, I've converted my code I used for the previous Destiny 2 lore project, and incorporated MongoDB's database so that users can access persisting data. All I did was to transfer over the concepts, routes, and information from the last project and incorporated into my MongoDB database. I didn't include the .env file in the Github, for privacy reasons, however. 

## Challenges
This project I would admit I did not have that much time for. And when I did I had to relearn a lot of different concepts over the course and try to cram in Mongoose terms. But I decided to forego Mongoose for now, and try to get the basic concepts of CRUD into my code. And honestly, integrating Express with MongoDB code, was hard to wrap my head around. I wanted to pace myself and not incorporate Mongoose before I understood how to communicate with MongoDB through Express first. 

## Routes explanation to the API
- destiny_oc_guardians: This is where users will post their Destiny 2 Guardian original characters.
    - CRUD Methods: Post new OCs, Get all entries up to 200 requests, Get by ID, Update by ID, and Delete by ID.
- destiny_exotics: This is where users can access the exotic weapons portion of the database. 
    - CRUD Methods: Post new exotic weapons, Get all entries up to 200 requests, Get by ID, Update by ID and Delete by ID..
- destiny_npcs: This is where users can access the non-player characters portion of the database. 
    - CRUD Methods: Post new non-player characters, Get all entries up to 200 requests, Get by ID, Update by ID and Delete by ID..

