import LoginBox from "./comps/login";
import FormChar from "./comps/form";
import ErrorMsg from "./comps/ErrorMsg";
import {useState} from "react";


function App () {
    console.log = function () {};
    const [pass_passed, setPassPassed] = useState(false);
    const [Error, setError] = useState(false);
    const [PlayerData, setPlayerData] = useState();
    const [Success, setSuccess] = useState(false);
    const Api_url = "https://backend-sheets.herokuapp.com/"
    //  const Api_url = "http://localhost:4000/"

    console.log(Api_url + "api/players");
    function UpdatePlayer(row_id)
    {
        fetch(Api_url + "api/players", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({rows: row_id})
        }).then(response =>{
            response.json().then(values => {
                //display the data recieved from the server
                console.log(values);
                setPlayerData({
                name : values[0][0],
                level : values[0][1],
                combatRating : values[0][2],
                Reso : values[0][3],
                class : values[0][4],
                shadowRank : values[0][5],
                Battleground_rank : values[0][6],
                Role : values[0][7],
                Clan_Warband : values[0][8],
                row : row_id
            })
                //this displays the updated data
                console.log(PlayerData);
                //goes to the form component
                setPassPassed(true);
            }).catch(err => {
                setPlayerData({
                    name : "",
                    level : "",
                    combatRating : "",
                    Reso : "",
                    class : "",
                    shadowRank : "",
                    Battleground_rank : "",
                    Role : "",
                    Clan_Warband : "",
                    row : row_id
                })
                setPassPassed(true);
                console.log(err);
            })
        }).catch(err => {
            //if there is an error, set the error to true
            setError(true);
            setPassPassed(false);
            console.log(err);
        })
    }
    function VerifyPass(data)
    {
        fetch(Api_url + "api/passwords", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({password: data})
        }).then(response =>{
            response.json().then(res => {
                console.log(res);
                console.log(res.value);
                if (res.value > 1)
                {
                    console.log("passed");
                    console.log(res.value);
                    UpdatePlayer(res.value);
                } else {
                    setError(true);
                    setPassPassed(true);
                }
            })
        }).catch(err => {
            setError(true);
            setPassPassed(false);
            console.log(err);
        })
    }

    function HandleForm (data) {
        console.log(data);
        fetch(Api_url + "api/Update", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).catch(err => {
            setError(true);
            console.log(err);
        }).then(response =>{
            response.json().then(res => {
                if (res.error === null){
                    setSuccess(true);
                    setError(null);
                } else if (res.err === 1) {
                    setError(null);
                    setPassPassed(false);
                    console.log(res.message);
                } else {
                    setError(true);
                    setPassPassed(false);
                    console.log(res.message);
                }
            })
        })
    }
    console.log(PlayerData);
    return (
        <div className="app">
            {pass_passed === false && Error === false ? <LoginBox onBtnPressed={VerifyPass}/> : null}
            {pass_passed === true  && Error === false ?  <FormChar onNewStats={HandleForm} playerData={PlayerData}/>: null}
            {pass_passed === true && Error === true ? <ErrorMsg msg="Wrong Password "/> : null}
            {Error === true && pass_passed === false? <ErrorMsg msg = "Something went wrong"/> : null}
            {Error === null && pass_passed === false? <ErrorMsg msg = "Dont troll"/> : null}
            {Error === null && Success === true? <ErrorMsg msg = "Success Info sent"/> : null}
        </div>
    );
}

export default App;