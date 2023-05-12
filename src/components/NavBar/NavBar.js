import React, { Component } from 'react';
import "./NavBar.css";
// import Grid from '@material-ui/core/Grid';
import { Grid } from '@mui/material';

import goalbook_logo from "../../images/goalbooklogo.png"
import home from "../../images/home.svg";
import message from "../../images/message.svg";
import find from "../../images/find.svg";
import react from "../../images/love.svg";
// import Avatar from '@material-ui/core/Avatar';
import Avatar from '@mui/material/Avatar';
import pp from "../../images/pp1.png"

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div>
                <div className="navbar__barContent">
                    <Grid container>
                        <Grid item xs={1}> </Grid>
                        <Grid item xs={3}>
                            <img className="navbar_logo" src={goalbook_logo} width="105px" />
                        </Grid>
                        <Grid item xs={4}>
                           <input text="text" className="navbar__searchBar" placeholder="Search" />
                        </Grid>
                        <Grid item xs={3} style={{"display":"flex"}} >
                            <svg height='25px' width='25px' className="navbar__img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M288 109.3V352c0 17.7-14.3 32-32 32s-32-14.3-32-32V109.3l-73.4 73.4c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l128-128c12.5-12.5 32.8-12.5 45.3 0l128 128c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L288 109.3zM64 352H192c0 35.3 28.7 64 64 64s64-28.7 64-64H448c35.3 0 64 28.7 64 64v32c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V416c0-35.3 28.7-64 64-64zM432 456a24 24 0 1 0 0-48 24 24 0 1 0 0 48z"/></svg>
                            <img className="navbar__img" src={home} width="25px"/>
                            <img className="navbar__img" src={react} width="25px" />
                            <Avatar src={pp} className="navbar__img"  style={{"maxWidth":"25px","maxHeight":"25px"}} />
                        </Grid>
                        <Grid item xs={1}></Grid>
                    </Grid>
                </div>
            </div>
         );
    }
}
 
export default NavBar;