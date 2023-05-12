import React, { Component } from 'react';
import './LoginPage.css'
import { Grid } from '@mui/material';
import goalbook_image from '../../images/goalbookad.png';
import goalbook_logo from '../../images/goalbooklogo.png';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: true
        }
    }

    changeLogin = () => {
        if (this.state.isLogin)
            this.setState({ isLogin: false });
        else
            this.setState({ isLogin: true });
    }

    render() {
        return (
            <div>
                <Grid container>
                    <Grid item xs={3}>
                    </Grid>
                    <Grid item xs={6}>
                        <div className="loginpage__main">
                            <div>
                                <img src={goalbook_image} width="454px" alt='goalbook-sneak-peek' />
                            </div>
                            <div>
                                <div className="loginpage_rightcomponent">
                                    <img className="loginpage__logo" src={goalbook_logo} alt='goalbook logo' />
                                    <div className="loginPage__signin">

                                        {
                                            this.state.isLogin ? <SignIn /> : <SignUp />
                                        }

                                        {/* <div className="login_forgt"> Forgot password?</div> */}
                                    </div>
                                </div>

                                <div className="loginpage__signupoption">
                                    {
                                        this.state.isLogin ?
                                            <div className="loginPage__signin">
                                                Don't have an account? <span onClick={this.changeLogin} style={{ "fontWeight": "bold", "color": "#0395F6" }}>Sign up</span>
                                            </div> :
                                            <div className="loginPage__signup">
                                                Have an account? <span onClick={this.changeLogin} style={{ "fontWeight": "bold", "color": "#0395F6" }}>Sign in</span>
                                            </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={3}>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default LoginPage;