import React from "react";
import { useState } from "react";
import { Collapse } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api";
import "./index.css";

interface Props {
    setIsAuthenticated(isAuthenticated: boolean): void
}

const Login: React.FunctionComponent<Props> = ({ setIsAuthenticated }) => {
    const authAPI = api.auth()
    const [showinvalidlogin, setShowInvalidlogin] = useState<boolean>(false)
    const navigation = useNavigate()

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get("email") as string;
        const password = data.get("password") as string;

        const rst = await authAPI.login(email, password)
        if (!rst) {
            setShowInvalidlogin(true)
            return
        }
        setShowInvalidlogin(false)
        setIsAuthenticated(true)
        navigation("/")
    };

    return (
        <div className="form-body">
            <div className="login_box row">
                <div className="form-holder">
                    <div className="form-content">
                        <div className="form-items">
                            <h3>Login</h3>
                            <form
                                className="was-validated"
                                onSubmit={handleSubmit}
                            >
                                <div className="col-md-12">
                                    <input
                                        className="form-control"
                                        type="email"
                                        name="email"
                                        placeholder="Email Address"
                                        required
                                    />
                                    <div className="valid-feedback">Email field is valid!</div>
                                    <div className="invalid-feedback">
                                        Email field cannot be blank!
                                    </div>
                                </div>

                                <div className="col-md-12">
                                    <input
                                        className="form-control"
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        required
                                    />
                                    <div className="valid-feedback">Password field is valid!</div>
                                    <div className="invalid-feedback">
                                        Password field cannot be blank!
                                    </div>
                                </div>

                                <div className="form-button mt-3">
                                    <button id="submit" type="submit" className="btn btn-primary">
                                        Login
                                    </button>
                                </div>
                                <Collapse in={showinvalidlogin}><span style={{ "color": "#ff606e" }}>Your email or password is invalid!</span></Collapse>
                                <br />
                                <Link to="/register" className="link-secondary">Don't have an account yet?</Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Login