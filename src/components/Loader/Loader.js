import { Box, Button, Container, Grid } from "@material-ui/core";
import Typewriter from 'typewriter-effect';
import classes from './Loader.module.scss'

const Loader = () => {

    return (
        <div className={classes.loader}>
            <div className={classes.loader__wrapper}>
                <Typewriter
                    options={{
                        strings: ['doYOUtextME?...'],
                        autoStart: true,
                        delay: 0,
                        deleteSpeed: 0,
                        pauseFor: 500,
                        loop: true,
                        }}
                />
            </div>
        </div>
    )
}

export default Loader;