import Options from "./options";

function ComboBoxes(props)
{
    const StaticData = [
        {name: "Class", options:
        ["Demon Hunter", "Crusader", "Wizzard", "Monk", "Barbarian", "Necromancer"],
        value: props.reference[0], title: "*Class"},
        {name: "S rank", options:
        ['INITIATE I', 'INITIATE II', 'INITIATE III', 'INITIATE IV', 'APPRENTICE I', 'APPRENTICE II', 'APPRENTICE III', 'APPRENTICE IV', 'WATCHER I', 'WATCHER II', 'WATCHER III', 'WATCHER IV', 'HUNTER I', 'HUNTER II', 'HUNTER III', 'HUNTER IV', 'BLADE I', 'BLADE II', 'BLADE III', 'BLADE IV', 'PHANTOM I', 'PHANTOM II', 'PHANTOM III', 'PHANTOM IV', 'UNSEEN I', 'UNSEEN II', 'UNSEEN III', 'UNSEEN IV', 'WHISPER I', 'WHISPER II', 'WHISPER III', 'WHISPER IV'],
        value: props.reference[1], title: "*Shadow rank"},
        {name: "BG", options:['Bronze I', 'Bronze II', 'Bronze III', 'Bronze IV', 'Bronze V', 'Silver I', 'Silver II', 'Silver III', 'Silver IV', 'Silver V', 'Gold I', 'Gold II', 'Gold III', 'Gold IV', 'Gold V', 'Legend'],
        value: props.reference[2], title: "*Battlegrounds rank"}
    ];
    return (
        <div>
            {StaticData.map((option, index) => {
                return <Options key={index} name={option.name} options={option.options} value={option.value} title={option.title}/>
            })}
        </div>
    )
}

export default ComboBoxes;