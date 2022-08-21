import classes from './error_msg.module.css';

function ErrorMsg(props)
{
    return (
        <div className={classes.error_msg}>
            <p>{props.msg}</p>
        </div>
    );
}

export default ErrorMsg;