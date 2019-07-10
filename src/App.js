import React, { Component } from "react"
import "./App.css"
import firebase from "firebase"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"

firebase.initializeApp({
    apiKey: "AIzaSyCHRLOibxIQtzGaZ7Pi4SFaxFyOqp0H7oU",
    authDomain: "onthesesh.ie"
})

class App extends Component {
    state = { isSignedIn: false }
    uiConfig = {
        signInFlow: "popup",
        signInOptions: [
            //  firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            //  firebase.auth.TwitterAuthProvider.PROVIDER_ID,
            //  firebase.auth.GithubAuthProvider.PROVIDER_ID,
            //  firebase.auth.EmailAuthProvider.PROVIDER_ID
        ],
        callbacks: {
            signInSuccess: () => false
        }
    }

    componentDidMount = () => {
        firebase.auth().onAuthStateChanged(user => {
            this.setState({ isSignedIn: !!user })
            console.log("user", user)
        })
    }

    render() {
        return (
            <div className="App">
                {this.state.isSignedIn ? (
                    <span>
            <div>Signed In!</div>
            <button onClick={() => firebase.auth().signOut()}>Sign out!</button>
            <h1>Welcome {firebase.auth().currentUser.displayName}</h1>
            <img
                alt="profile picture"
                src={firebase.auth().currentUser.photoURL}
            />
          </span>
                ) : (
                    <StyledFirebaseAuth
                        uiConfig={this.uiConfig}
                        firebaseAuth={firebase.auth()}
                    />
                )}
            </div>
        )
    }
}

export default App


// import React from 'react';
// import FacebookLoginWithButton from 'react-facebook-login';
// import fire from './fire';
// import logo from './logo.svg';
//
//
// const componentClicked = () => {
//   console.log( "Clicked!" )
// }
//
// const LoginButton = ({facebookResponse}) => (
//     <FacebookLoginWithButton
//         appId="2009920755997639"
//         // autoLoad
//         fields="name,email,picture"
//         onClick={componentClicked}
//         callback={facebookResponse}
//         icon="fa-facebook"/>
// )
//
//
// const UserScreen = ({user}) => (
//     <>
//       <h4>{user.name} Joins the Sesh.</h4>
//       <img src={user.picture.data.url} height={user.picture.height} width={user.picture.width} alt="avatar"/>
//         <h4>Sesh app for iOS is coming soon.</h4>
//
//         fire.database().ref('messages').push( user.name );
//
//         <form onSubmit={this.addMessage.bind(this)}>
//             <input type="text" ref={ el => this.inputEl = el }/>
//             <input type="submit"/>
//             <ul>
//                 { /* Render the list of messages */
//                     this.state.messages.map( message => <li key={user.name}>{user.name}</li> )
//                 }
//             </ul>
//         </form>
//
//     </>
// )
//
// class App extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = { messages: [] }; // <- set up react state
//     }
//     componentWillMount(){
//         /* Create reference to messages in Firebase Database */
//         let messagesRef = fire.database().ref('usersUsername').orderByKey().limitToLast(100);
//         messagesRef.on('child_added', snapshot => {
//             /* Update React state when message is added at Firebase Database */
//             let message = { text: snapshot.val(), id: snapshot.key };
//             this.setState({ messages: [message].concat(this.state.messages) });
//         })
//     }
//     addMessage(e){
//         e.preventDefault(); // <- prevent form submit from reloading the page
//         /* Send the message to Firebase */
//         fire.database().ref('messages').push( this.inputEl.value );
//         this.inputEl.value = ''; // <- clear the input
//     }
//
//   state = {user:false}
//
//   facebookResponse = (response) => { console.log( response ); this.setState( {...this.state, user: response } ) }
//
//   render() {
//
//       return (
//           <div className="App">
//               <header className="App-header">
//                   <img src={logo} className="App-logo" alt="logo" />
//
//                   <LoginButton facebookResponse={this.facebookResponse}/>
//
//               </header>
//           </div>
//       );
//
//
//     // return (
//     //
//     //     <div style={{ margin: "auto", textAlign: "center", paddingTop: "2em" }}>
//     //       { this.state.user ? <UserScreen user={this.state.user}/> :
//     //
//     //
//     //
//     //
//     //       }
//     //
//     //     </div>
//     //
//     //
//     // )
//   }
// }
//
// export default App
