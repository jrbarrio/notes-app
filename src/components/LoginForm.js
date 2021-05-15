import Togglable from "./Togglable";
import PropTypes from "prop-types";

export default function LoginForm (props) {
    return (
        <Togglable>
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
                <button>Login</button>
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