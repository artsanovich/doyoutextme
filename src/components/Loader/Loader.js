import { Box, Button, Container, Grid } from "@material-ui/core";
import classes from './Loader.module.css'

const Loader = () => {

    return (
        <Container>
            <Grid container 
            style={{height: window.innerHeight - 50}}
            alignItems={'center'}
            justifyContent={'center'}
            >
                <Grid
                        container
                        alignItems={'center'}
                        direction={'column'}>
                            <div className={classes.lds_hourglass}></div>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Loader;