import {useRef} from 'react';

function LoginBox(props)
{
    const pass_passed = useRef();

    function sibmitForm(e)
    {
        e.preventDefault();
        props.onBtnPressed(pass_passed.current.value);
    }

    return (
        <div className="login-box">
            <h2>Login</h2>
            <form onSubmit={sibmitForm}>
                <div className="user-box">
                    <input type="text" required name="pass" id="pass" ref={pass_passed}/>
                    <label htmlFor="pass" className="text">Password</label>
                </div>
                <div className="submit-box">
                    <button type="submit">Check</button>
                </div>
            </form>
        </div>
    );
}

export default LoginBox;