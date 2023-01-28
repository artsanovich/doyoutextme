import { AppBar, Button, Grid, Tabs } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { LOGIN_ROUTE } from '../../utils/consts';
import {useAuthState} from 'react-firebase-hooks/auth'
import { useContext } from 'react';
import { Context } from '../../index';
import classes from './Navbar.module.scss'

const Navbar = () => {

    const {auth} = useContext(Context)
    const [user] = useAuthState(auth)

    return (
        <div className={classes.navbar}>
            <div className={classes.navbar__wrapper}> 
                <h1 className={classes.navbar__title}>doY0UtextME</h1>
                <div className={classes.navbar__btnGroup}>
                    {
                        user ? 
                        <button onClick={() => auth.signOut()} className='navbar__btn btn'>LOG OUT</button>
                        :
                        <NavLink to={LOGIN_ROUTE}>
                            <button className='navbar__btn btn'>LOG IN</button>
                        </NavLink>
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar;