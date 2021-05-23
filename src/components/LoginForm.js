import Togglable from "./togglable/Togglable";
import PropTypes from "prop-types";

export default function LoginForm (props) {
    return (
        <Togglable buttonLabel='Show'>
            <form onSubmit={props.handleSubmit}>
                <input
                    type="text"
                    value={props.username}
                    name='Username'
                    placeholder='Username'
                    onChange={ props.handleUsernameChange }></input>
                <input
                    type="password"
                    value={props.password}
                    name='Password'
                    placeholder='Password'
                    onChange={ props.handlePasswordChange }></input>
                <button id="form-login-button">Login</button>
            </form>
        </Togglable>
    )
};

LoginForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    username: PropTypes.string,
    handleUsernameChange: PropTypes.func.isRequired,
    handlePasswordChange: PropTypes.func.isRequired,
}