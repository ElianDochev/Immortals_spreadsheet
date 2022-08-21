const express = require('express');
const {google} = require('googleapis');
const spreadsheetId = '1WQhstqDIWJQvxrFI3ms6mbh9vpqIqUbBuL8OeRo_nXU';
const app = express();

// var user_data = {
//     name: "t",
//     level: "e",
//     Combat_rating: "s",
//     Class: "t",
//     Shadow_rank: "i",
//     Battleground_rank: "n",
//     Role: "g",
//     Clan_Warband: "it",
// }
app.listen(1337, (req, res) => console.log('listening on port 1337'));

const toto = new google.auth.

app.get('/', async (req, res) => {
    const auth = new google.auth.GoogleAuth({
        keyFile: './credentials.json',
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    //cleint instance of auth
    const client = await auth.getClient();

    //instance of sheets api
    const sheets = google.sheets({version: 'v4', auth: client});

    //get metadata of spreadsheet
    const metadata = await sheets.spreadsheets.get({
        auth,
        spreadsheetId,
    });

    var row = "6";


    //get data from spreadsheet
    const password = await sheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "passwords!A2:B101",
    });
    //test if password is correct
    var test_str = "Random pass 2";
    var test = password.data.values;
    for (let index = 0; index < test.length; index++) {
        if (test[index][0] === test_str) {
            row = test[index][1];
            break;
        } else {
            row = "0";
        }
    }
    if (row === "0") {
        res.send(password.data.values[0][0]);
        return 1;
    }
    //get data from sheet
    const data = await sheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: `Stats!A${row}:H${row}`,
    });
    // const values = data.data.values;
    // var user_data = {
    //     name: values[0][0],
    //     level: values[0][1],
    //     Combat_rating: values[0][2],
    //     Class: values[0][3],
    //     Shadow_rank: values[0][4],
    //     Battleground_rank: values[0][5],
    //     Role: values[0][6],
    //     Clan_Warband: values[0][7],
    // }
    // //overwrite data in sheet
    // const check = await sheets.spreadsheets.values.update({
    //     auth,
    //     spreadsheetId,
    //     range: `Stats!A${row}:H${row}`,
    //     valueInputOption: 'RAW',
    //     resource: {
    //         values: [
    //             [user_data.name, user_data.level, user_data.Combat_rating,
    //             user_data.Class, user_data.Shadow_rank, user_data.Battleground_rank,
    //             user_data.Role, user_data.Clan_Warband],
    //         ],
    //     }
    // });
    //output
    res.send(data.data.values);
    // res.send(check.data);
    // console.log(user_data);
    return 0;
});

