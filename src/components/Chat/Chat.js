import {useAuthState} from 'react-firebase-hooks/auth'
import {useCollectionData} from 'react-firebase-hooks/firestore'
import { useContext, useRef, useState } from 'react';
import { Context } from '../../index';
import { Container, TextField, Button, Grid, Avatar } from '@material-ui/core';
import Loader from '../Loader/Loader';
import firebase from 'firebase/compat/app';
import classes from './Chat.module.scss'

const Chat = () => {

    const {auth, firestore} = useContext(Context)
    const messagesRef = useRef(null);
    const [user] = useAuthState(auth)
    const [value, setValue] = useState('')
    const [messages, loading] = useCollectionData(firestore.collection('messages').orderBy('createdAt'))

    const sendMessage = async () => {
        if (value) {
            await firestore.collection('messages').add({
                uid: user.uid,
                displayName: user.displayName,
                photoURL: user.photoURL,
                text: value,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            })
            setValue('')
            messagesRef.current?.lastElementChild?.scrollIntoView();
        }
    }

    if(loading) {
        return (<Loader />)
    }

    return (
        <div className={classes.chat}>
            <div className={classes.chat__wrapper}>
                <div className={classes.chat__inner} ref={messagesRef}>
                    {messages.map(message => {
                        const date = message?.createdAt?.toDate().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
                        return (
                            <div className={classes.chat__message}>
                                <div className={user.uid === message.uid ? classes.chat__message_own : classes.chat__message_foreign}>
                                <div className={classes.chat__message_author}>{message.displayName}</div>
                                <div className={classes.chat__message_text}>{message.text}</div>
                                <div className={user.uid === message.uid ? classes.chat__message_own_date : classes.chat__message_foreign_date}>{date}</div>
                            </div>
                        </div>
                        )
                    }
                        )}
                </div>
                <div className={classes.chat__type}>
                    <input value={value} onChange={e => setValue(e.target.value)} className={classes.chat__input} />
                    <button onClick={sendMessage} className={value ? 'chat__btn btn' : 'chat__btn btn disabled'}>SEND</button>
                </div>
            </div>
        </div>
    )
}

export default Chat;