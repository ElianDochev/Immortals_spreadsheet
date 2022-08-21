function Options(props)
{
    return (
        <div className="user-box">
            <label className="L_ComboBox" htmlFor={props.name}>{props.title}</label>
            <select name={props.name} required ref={props.value}>
                {props.options.map((option, index) => {
                    return <option key={index} value={option}>{option}</option>
                })}
            </select>
        </div>
    );
}

export default Options;