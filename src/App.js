import React from 'react';
import FacebookLoginWithButton from 'react-facebook-login';
import fire from './fire';


const componentClicked = () => {
  console.log( "Clicked!" )
}

const LoginButton = ({facebookResponse}) => (
    <FacebookLoginWithButton
        appId="2009920755997639"
        // autoLoad
        fields="name,email,picture"
        onClick={componentClicked}
        callback={facebookResponse}
        icon="fa-facebook"/>
)


const UserScreen = ({user}) => (
    <>
      <h1>{user.name} Joins the Sesh.</h1>
      <img src={user.picture.data.url} height={user.picture.height} width={user.picture.width} alt="avatar"/>
        <h2>Sesh app for iOS is coming soon.</h2>

        fire.database().ref('messages').push( user.name );

        <form onSubmit={this.addMessage.bind(this)}>
            <input type="text" ref={ el => this.inputEl = el }/>
            <input type="submit"/>
            <ul>
                { /* Render the list of messages */
                    this.state.messages.map( message => <li key={user.name}>{user.name}</li> )
                }
            </ul>
        </form>

    </>
)

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { messages: [] }; // <- set up react state
    }
    componentWillMount(){
        /* Create reference to messages in Firebase Database */
        let messagesRef = fire.database().ref('messages').orderByKey().limitToLast(100);
        messagesRef.on('child_added', snapshot => {
            /* Update React state when message is added at Firebase Database */
            let message = { text: snapshot.val(), id: snapshot.key };
            this.setState({ messages: [message].concat(this.state.messages) });
        })
    }
    addMessage(e){
        e.preventDefault(); // <- prevent form submit from reloading the page
        /* Send the message to Firebase */
        fire.database().ref('messages').push( this.inputEl.value );
        this.inputEl.value = ''; // <- clear the input
    }

  state = {user:false}

  facebookResponse = (response) => { console.log( response ); this.setState( {...this.state, user: response } ) }

  render() {




    return (


        <div style={{ margin: "auto", textAlign: "center", paddingTop: "2em" }}>
          { this.state.user ? <UserScreen user={this.state.user}/> :


              <LoginButton facebookResponse={this.facebookResponse}/>
          }
        </div>


    )
  }
}

export default App
