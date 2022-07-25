//Node Packages and Modules..

const express = require('express');
const app = express();
app.use(express.json());

const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

const path = require('path');

const dbPath = path.join(__dirname,"cricketTeam.db");

let db = null;

//Initialize the database..
const InitiliazeServer = async () => {
    try {
        db =  await open ({
            filename: dbPath,
            driver: sqlite3.Database,
        });
        app.listen(1000, () => {
            console.log(`Heloo World!...  Server is Running on Port: 1000`);
        }); 
    } catch(e) {
            console.log(`DB Error: {(e.message)}`);
            process.exit(1);
        }   
};

InitiliazeServer(); //calling function..


// Sending File as a Path..

app.get("/index", (request,response)=> {
    response.sendFile("./index.html", {root:__dirname});
});

//Handling Request and Response.. 

app.get("/",(request,response) => {
    response.send(`Heloo World!...  Server is Running on Port: 1000`);    
});

// Today Date..

app.get('/date',(request,response) => {
    const date = new Date();
    response.send(`Today Date is ${date}`);
});

// Get playerId all()..

app.get('/cricket_team', async (request,response)=> {
    const getplayerId = `SELECT * FROM cricket_team`
    const player = await db.all(getplayerId);
    response.send(player);
});

// Get One playerId()..

app.get('/cricket_team/:playerId', async (request,response)=> {
    const {playerId} = request.params;
    const getplayerId = `SELECT * FROM cricket_team WHERE player_id = ${playerId}`;
    const player = await db.get(getplayerId);
    response.send(player);
});

// Add playerId()..

app.post('/cricket_team/', async (request,response)=> {
    const playerDetails = request.body;
    const {playerid,playername,jerseynumber,role} = playerDetails;
    const addPlayer = `INSERT INTO cricket_team (player_id,player_name,jersey_number,role) VALUES

    (${playerid},'${playername}',${jerseynumber},'${role}')`;

    const dbResponse = await db.run(playerDetails);
    const player= dbResponse.lastID;
    response.send({player: playerID});
});








