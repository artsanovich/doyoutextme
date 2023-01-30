import { Box, Button, Container, Grid } from "@material-ui/core";
import { useContext } from "react";
import { Context } from "../..";
import firebase from "firebase/compat/app";
import classes from './Login.module.scss'

const Login = () => {

    const {auth} = useContext(Context)

    const login = async () => {
        const provider = new firebase.auth.GoogleAuthProvider()
        const {user} = await auth.signInWithPopup(provider)
        console.log(user)
    }

    return ( 
        <div className={classes.login}>
            <div className={classes.login__wrapper}>
                <button onClick={login} className='login__btn btn'>LOG IN WITH GOOGLE</button>
            </div>
        </div>
    )
}

export default Login;