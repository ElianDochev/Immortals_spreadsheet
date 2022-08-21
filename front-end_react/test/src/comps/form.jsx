import {useRef} from "react";
import ComboBoxes from "./comboBoxes";

function FormChar(props)
{
    const charName = useRef();
    const charClass = useRef();
    const CombatRating = useRef();
    const charLevel = useRef();
    const shadowRank = useRef();
    const bgRank = useRef();
    const WarbandName = useRef();
    const charReso = useRef();
    const Role = useRef();

    function sibmitForm(e)
    {
        e.preventDefault();

        props.playerData.name = charName.current.value;
        props.playerData.class = charClass.current.value;
        props.playerData.combatRating = CombatRating.current.value;
        props.playerData.level = charLevel.current.value;
        props.playerData.shadowRank = shadowRank.current.value;
        props.playerData.bgRank = bgRank.current.value;
        props.playerData.warbandName = WarbandName.current.value;
        props.playerData.Reso = charReso.current.value;
        props.playerData.Role = Role.current.value;

        props.onNewStats(props.playerData);
    }

    return (
    <div className="login-box">
        <h2>Char Stats</h2>
        <form onSubmit={sibmitForm}>
            <div className="user-box">
                <input type="text" required name="name" id="name" ref={charName} value={props.Player}/>
                <label className="text" htmlFor="name">*Char name</label>
            </div>
            <div className="user-box">
                <input type="number" required name="CR" id="CR" min="0" max="8000" ref={CombatRating}/>
                <label className="text" htmlFor="CR">*Combat rating</label>
            </div>
            <div className="user-box">
                <input type="number" required name="level" id="level" min="0" max="670" ref={charLevel}/>
                <label className="text" htmlFor="level">*Paragon lvl</label>
            </div>
            <div className="user-box">
                <input type="number" required name="reso" id="reso" min="0" max="5000" ref={charReso}/>
                <label className="text" htmlFor="reso">*Resonance</label>
            </div>
            <ComboBoxes reference={[charClass, shadowRank, bgRank]}/>
            <div className="user-box">
                <input type="text" name="Warband" id="Warband" ref={WarbandName}/>
                <label className="text" htmlFor="Warband">Warband</label>
            </div>
            <div className="user-box">
                <input type="text" name="Role" id="Role" ref={Role}/>
                <label className="text" htmlFor="Role">Role</label>
            </div>
            <div className="submit-box">
                <button type="submit">Submit</button>
            </div>
        </form>
    </div>
    );
}

export default FormChar;