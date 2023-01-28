import {useAuthState} from 'react-firebase-hooks/auth'
import {useCollectionData} from 'react-firebase-hooks/firestore'
import { useContext, useState } from 'react';
import { Context } from '../../index';
import { Container, TextField, Button, Grid, Avatar } from '@material-ui/core';
import Loader from '../Loader/Loader';
import firebase from 'firebase/compat/app';
import classes from './Chat.module.scss'

const Chat = () => {

    const {auth, firestore} = useContext(Context)
    const [user] = useAuthState(auth)
    const [value, setValue] = useState('')
    const [messages, loading] = useCollectionData(firestore.collection('messages').orderBy('createdAt'))

    const sendMessage = async () => {
        if (user) {
            firestore.collection('messages').add({
                uid: user.uid,
                displayName: user.displayName,
                photoURL: user.photoURL,
                text: value,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            })
            setValue('')
        }
    }

    if(loading) {
        return (<Loader />)
    }

    return (
        // <Container>
        //     <Grid container 
        //     style={{height: window.innerHeight - 50, marginTop: 70}}
        //     justifyContent={'center'}>
        //         <div style={{width: '80%', height: '70vh', border: '1px solid gray', overflowY: 'auto'}}>
        //             {messages.map(message => 
        //                 <div style={{
        //                     margin: 10, 
        //                     border: user.uid === message.uid ? '2px solid blue' : '2px dashed red',
        //                     marginLeft: user.uid === message.uid ? 'auto' : '10px',
        //                     width: 'fit-content',
        //                     padding: '5px'
        //                     }}>
        //                     <Grid container>
        //                         <Avatar src={message.photoURL}/>
        //                         <div>{message.displayName}</div>
        //                         <div>{message.text}</div>
        //                     </Grid>
        //                 </div>
        //                 )}
        //         </div>
        //         <Grid container direction={'column'} alignItems={'flex-end'} style={{width: '80%'}}>
        //                 <TextField value={value} onChange={e => setValue(e.target.value)} fullWidth maxRows={2} variant={'outlined'} />
        //                 <Button onClick={sendMessage} variant={'outlined'}>Send</Button>
        //         </Grid>
        //     </Grid>
        // </Container>
        <div className={classes.chat}>
            <div className={classes.chat__wrapper}>
                <div className={classes.chat__inner}>
                    {messages.map(message => 
                        <div className={user.uid === message.uid ? classes.chat__message_own : classes.chat__message_foreign}>
                            <div className={classes.chat__message_author}>{message.displayName}</div>
                            <div className={classes.chat__message_text}>{message.text}</div>
                        </div>
                        )}
                </div>
                <div className={classes.chat__type}>
                    <input value={value} onChange={e => setValue(e.target.value)} className={classes.chat__input} />
                    <button onClick={sendMessage} className='chat__btn btn'>SEND</button>
                </div>
            </div>
        </div>
    )
}

export default Chat;