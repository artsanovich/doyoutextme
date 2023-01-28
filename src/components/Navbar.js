import { AppBar, Button, Grid, Tabs } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { LOGIN_ROUTE } from '../utils/consts';
import {useAuthState} from 'react-firebase-hooks/auth'
import { useContext } from 'react';
import { Context } from '../index';

const Navbar = () => {

    const {auth} = useContext(Context)
    const [user] = useAuthState(auth)

    return (
        <AppBar color={'secondary'}>
            <Tabs variant={'dense'} value={0}>
                <Grid container justifyContent={'flex-end'}>
                    {user ? 
                        <Button onClick={() => auth.signOut()} variant={'outlined'}>Log out</Button> 
                        : 
                        <NavLink to={LOGIN_ROUTE}>
                            <Button variant={'outlined'}>Log in</Button>
                        </NavLink>
                    }
                </Grid>
            </Tabs>
        </AppBar>
    )
}

export default Navbar;