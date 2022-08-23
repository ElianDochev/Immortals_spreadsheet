const express = require('express');
// app onject for express
const app = express();
//instance of googleapis
const {google} = require('googleapis');
//cors object for cross origin resource sharing
const cors = require('cors');
//port variable for port number
const port = process.env.PORT || 1337;
//spreadsheet id for google sheets
const spreadsheetId = '1SJZB6FvT06205RoCRN4veDGQHBmqCLAvBLW9YTg5cS8';
//allowed origins for cors
const cors_options = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
//authentication for google sheets
const auth = new google.auth.GoogleAuth({
    keyFile: './credentials.json',
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});
//cleint instance of auth
const client = auth.getClient();
//instance of sheets api
const sheets = google.sheets({version: 'v4', auth: client});

function get_correct(Playerclass ,bgRank, shadowRank) {
    const correct_vals = [["Demon Hunter", "Crusader", "Wizzard", "Monk", "Barbarian", "Necromancer"],
    ['INITIATE I', 'INITIATE II', 'INITIATE III', 'INITIATE IV', 'APPRENTICE I', 'APPRENTICE II', 'APPRENTICE III', 'APPRENTICE IV', 'WATCHER I', 'WATCHER II', 'WATCHER III', 'WATCHER IV', 'HUNTER I', 'HUNTER II', 'HUNTER III', 'HUNTER IV', 'BLADE I', 'BLADE II', 'BLADE III', 'BLADE IV', 'PHANTOM I', 'PHANTOM II', 'PHANTOM III', 'PHANTOM IV', 'UNSEEN I', 'UNSEEN II', 'UNSEEN III', 'UNSEEN IV', 'WHISPER I', 'WHISPER II', 'WHISPER III', 'WHISPER IV'],
    ['Bronze I', 'Bronze II', 'Bronze III', 'Bronze IV', 'Bronze V', 'Silver I', 'Silver II', 'Silver III', 'Silver IV', 'Silver V', 'Gold I', 'Gold II', 'Gold III', 'Gold IV', 'Gold V', 'Legend']];
    let count = 0;
    correct_vals[0].every((val) => {
        if (Playerclass === val) {
            ++count;
            return false;
        }
    });
    correct_vals[1].every((val) => {
        if (bgRank === val) {
            ++count;
            return false;
        }
    });
    correct_vals[2].every((val) => {
        if (shadowRank === val) {
            ++count;
            return false;
        }
    });
    if (count != 3) {
        console.log("the correct values are: " + count);
        return true;
    } else {
        console.log("the correct values are: " + count);
        return false;
    }
}

app.use(cors(cors_options));
app.use(express.json());
app.get('/', (req, res) => res.send('Server is running'));

app.post('/api/Update', async (req, res) => {
    const user_data = req.body;
    console.log(user_data);
    // if (get_correct(user_data.Playerclass, user_data.bgRank, user_data.shadowRank)) {
    //     res.send({error: 1, message: "wtf is wrong with you, dont try to troll man"});
    //     console.log("intersting")
    //     return;
    // }
    const check = await sheets.spreadsheets.values.update({
            auth,
            spreadsheetId,
            range: `Stats!A${user_data.row}:I${user_data.row}`,
            valueInputOption: 'RAW',
            resource: {
                values: [
                    [user_data.name, user_data.level, user_data.combatRating,
                    user_data.Reso, user_data.class, user_data.shadowRank,
                    user_data.bgRank, user_data.Role, user_data.warbandName],
                ],
            }
        } ).catch(err => {
            console.log(err);
            res.send({error: 2,
                message: err});
        } ).then(() => {
        res.send({error: null, message: "success"});
        return;
        } );
} );

app.post('/api/players', async (req, res) => {
    const data = await sheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: `Stats!A${req.body.rows}:I${req.body.rows}`,
    });
    const values = data.data.values;
    res.send(values);
} );

app.post('/api/passwords',cors(), async (req, res) => {
    const password = await sheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "passwords!A2:B101",
    } );
    password.data.values.forEach(element => {
        if (element[0] === req.body.password) {
            res.send({value: element[1]});
            return;
        }
    } );
    res.send({value: "1"});
} );

app.listen(port, (req, res) => console.log(`listening on port ${port}`));
