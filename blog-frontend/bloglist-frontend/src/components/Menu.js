import AppBar from "@material-ui/core/AppBar";
import React from "react";
import { IconButton, Button, Toolbar } from "@material-ui/core"
import { Link } from 'react-router-dom'

const Menu = () => {
    const linkStyle = {
        paddingRight: 3,
    }

    return (
        <AppBar style={{backgroundColor: "#8583af"}} position='static'>
            <Toolbar>
                <IconButton edge='start' color='inherit' aria-label='menu'>
                </IconButton>
                <Button style={{
                    backgroundColor: "#c297c7",
                    padding: "10px 10px",
                    fontSize: "15px"
                }} color='inherit'>
                    <Link href='#' style={linkStyle} to='/blogs'>blogs</Link>
                </Button>
                <Button style={{
                    backgroundColor: "#c297c7",
                    padding: "10px 10px",
                    fontSize: "15px"
                }} color='inherit'>
                    <Link style={linkStyle} to='/users'>users</Link>
                </Button>
            </Toolbar>
        </AppBar>
    )
}

export default Menu