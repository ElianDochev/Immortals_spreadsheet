
function ErrorMsg(props)
{
    function sibmitForm(e)
    {
        e.preventDefault();
        window.location.reload();
    }
    return (
    <div className="login-box">
        <form onSubmit={sibmitForm}>
            <div className="user-box">
                <h2 className="text">{props.msg}</h2>
                <br/>
                <br/>
            </div>
            <div className="submit-box">
                <button type="submit">Go back</button>
            </div>
        </form>
    </div>
    );
}

export default ErrorMsg;