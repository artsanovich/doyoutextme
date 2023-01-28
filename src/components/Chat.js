import {useAuthState} from 'react-firebase-hooks/auth'
import {useCollectionData} from 'react-firebase-hooks/firestore'
import { useContext, useState } from 'react';
import { Context } from '../index';
import { Container, TextField, Button, Grid, Avatar } from '@material-ui/core';
import Loader from './Loader';
import firebase from 'firebase/compat/app';


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
        <Container>
            <Grid container 
            style={{height: window.innerHeight - 50, marginTop: 70}}
            justifyContent={'center'}>
                <div style={{width: '80%', height: '70vh', border: '1px solid gray', overflowY: 'auto'}}>
                    {messages.map(message => 
                        <div style={{
                            margin: 10, 
                            border: user.uid === message.uid ? '2px solid blue' : '2px dashed red',
                            marginLeft: user.uid === message.uid ? 'auto' : '10px',
                            width: 'fit-content',
                            padding: '5px'
                            }}>
                            <Grid container>
                                <Avatar src={message.photoURL}/>
                                <div>{message.displayName}</div>
                                <div>{message.text}</div>
                            </Grid>
                        </div>
                        )}
                </div>
                <Grid container direction={'column'} alignItems={'flex-end'} style={{width: '80%'}}>
                        <TextField value={value} onChange={e => setValue(e.target.value)} fullWidth maxRows={2} variant={'outlined'} />
                        <Button onClick={sendMessage} variant={'outlined'}>Send</Button>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Chat;