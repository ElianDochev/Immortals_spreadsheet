import LoginBox from "./comps/login";
import FormChar from "./comps/form";
import ErrorMsg from "./comps/ErrorMsg";
import {useState} from "react";


function App () {
    const [pass_passed, setPassPassed] = useState(true);
    const [Error, setError] = useState(false);

    let row = 1;
    const Player= {
        name: "",
        class: "",
        combatRating: "",
        level: "",
        shadowRank: "",
        bgRank: "",
        warbandName: "",
        Reso: "",
        Role: "",
    }
    function UpdatePlayer(row)
    {
        fetch("http://localhost:3000/api/players", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(row)
        }).then(values => {
            Player.name = values[0][0];
            Player.level = values[0][1];
            Player.combatRating = values[0][2];
            Player.class = values[0][3];
            Player.shadowRank = values[0][4];
            Player.Battleground_rank = values[0][5];
            Player.Role = values[0][6];
            Player.Clan_Warband = values[0][7];
            Player.Reso = values[0][8];
        })
    }
    function VerifyPass(data)
    {
        fetch("http://localhost:3000/api/passwords", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(res => {
            if (res.value > 1)
            {
                setPassPassed(true);
                row = res.value;
                UpdatePlayer(row);
            } else {
                setError(true);
            }
        })
    }

    function HandleForm (data) {
        const newData = {
            row : row,
            ...data
        };
        fetch("http://localhost:3000/api/Update", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newData)
        }).then(res => {
            if (res.value === 1)
            {
                setError(2);
            }
        })
    }
    return (
        <div className="app">
            {!pass_passed && Error === false ? <LoginBox onSibmit={VerifyPass}/> : null}
            {pass_passed && Error === false ?  <FormChar onNewStats={HandleForm} playerData={Player}/>: null}
            {Error === true ? <ErrorMsg msg = "Incorrect Password"/> : null}
            {Error === 2 ? <ErrorMsg msg = "Wrong Values types"/> : null}
        </div>
    );
}

export default App;