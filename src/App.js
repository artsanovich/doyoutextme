import { BrowserRouter } from 'react-router-dom';
import './App.scss';
import AppRouter from './components/AppRouter/AppRouter';
import Loader from './components/Loader/Loader';
import Navbar from './components/Navbar/Navbar';
import { useContext } from "react";
import { Context } from ".";
import firebase from "firebase/compat/app";
import {useAuthState} from 'react-firebase-hooks/auth'



function App() {

  const {auth} = useContext(Context)
  const [user, loading, error] = useAuthState(auth)

  if(loading) {
    return <Loader />
  }

  return (
    <BrowserRouter>
      <Navbar />
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
