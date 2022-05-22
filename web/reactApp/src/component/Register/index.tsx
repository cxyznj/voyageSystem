import { useState } from "react";
import { Collapse } from "react-bootstrap";
import api from "../../api";
import "./index.css";

export default function Register() {
    const authAPI = api.auth()
    const [showinvalidlogin, setShowInvalidlogin] = useState<boolean>(false)

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const username = data.get("username") as string;
        const email = data.get("email") as string;
        const password = data.get("password") as string;

        const rst = await authAPI.register(username, email, password)

        if (!rst) {
            setShowInvalidlogin(true)
            return
        }
        setShowInvalidlogin(false)
        // props.setIsAuthenticated(true)
        // setRedirect(true)
    };

    return (
        <div className="form-body">
            <div className="row">
                <div className="form-holder">
                    <div className="form-content">
                        <div className="form-items">
                            <h3>Register</h3>
                            <form
                                className="was-validated"
                                onSubmit={handleSubmit}
                            >
                                <div className="col-md-12">
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="username"
                                        placeholder="Username"
                                        required
                                    />
                                    <div className="valid-feedback">Username field is valid!</div>
                                    <div className="invalid-feedback">
                                        Username field cannot be blank!
                                    </div>
                                </div>

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
                                        Register
                                    </button>
                                </div>
                                <Collapse in={showinvalidlogin}><span style={{ "color": "#ff606e" }}>Your username or email has been taken!</span></Collapse>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
