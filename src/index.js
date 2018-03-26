import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as firebase from 'firebase';
import registerServiceWorker from './registerServiceWorker';
import { firebaseConfig } from './config';



firebase.initializeApp(firebaseConfig);


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
