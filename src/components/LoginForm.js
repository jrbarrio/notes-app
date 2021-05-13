import Togglable from "./Togglable";

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