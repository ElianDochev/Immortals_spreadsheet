import LoginBox from "./comps/login";
import FormChar from "./comps/form";
import ErrorMsg from "./comps/ErrorMsg";
import {useState} from "react";


function App () {
    const [pass_passed, setPassPassed] = useState(false);
    const [Error, setError] = useState(false);

    let row = "1";

    const Player= {
        name: "",
        class: "",
        combatRating: "",
        level: "",
        shadowRank: "",
        bgRank: "",
        warbandName: "",
        Reso: "",
        Role: ""
    }
    function UpdatePlayer(row)
    {
        fetch("http://localhost:4000/api/players", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({rows: row})
        }).then(response =>{
            response.json().then(values => {
                //display the data recieved from the server
                console.log(values);
                Player.name = values[0][0];
                Player.level = values[0][1];
                Player.combatRating = values[0][2];
                Player.Reso = values[0][3];
                Player.class = values[0][4];
                Player.shadowRank = values[0][5];
                Player.Battleground_rank = values[0][6];
                Player.Role = values[0][7];
                Player.Clan_Warband = values[0][8];
                //this displays the updated data
                console.log(Player);
                //goes to the form component
                setPassPassed(true);
            }).catch(err => {
                //if there is an error, set the error to true
                setError(true);
                console.log(err);
            })
        }).catch(err => {
            //if there is an error, set the error to true
            setError(true);
            console.log(err);
        })
    }
    function VerifyPass(data)
    {
        fetch("http://localhost:4000/api/passwords", {
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
                    row = res.value;
                    UpdatePlayer(row);
                } else {
                    setError(true);
                    setPassPassed(true);
                }
            })
        }).catch(err => {
            setError(true);
            console.log(err);
        })
    }

    function HandleForm (data) {
        const newData = {
            row : row,
            ...data
        };
        fetch("http://localhost:4000/api/Update", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newData)
        }).catch(err => {
            setError(true);
            console.log(err);
        }).then(response =>{
            response.json().then(res => {
                if (res.error === null){
                    window.location.reload();
                    alert(res.msg);
                } else if (res.err == 1) {
                    setError(2);
                    setPassPassed(false);
                    console.log(res.msg);
                } else {
                    setError(true);
                    setPassPassed(false);
                    console.log(res.msg);
                }
            })
        })
    }
    console.log(Player);
    return (
        <div className="app">
            {pass_passed === false && Error === false ? <LoginBox onBtnPressed={VerifyPass}/> : null}
            {pass_passed === true  && Error === false ?  <FormChar onNewStats={HandleForm} playerData={Player}/>: null}
            {pass_passed === true && Error === true ? <ErrorMsg msg="Wrong Password "/> : null}
            {Error === true && pass_passed === false? <ErrorMsg msg = "Something went wrong"/> : null}
            {Error === 2 && pass_passed === false? <ErrorMsg msg = "Dont troll"/> : null}
        </div>
    );
}

export default App;