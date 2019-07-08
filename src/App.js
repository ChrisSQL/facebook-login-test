import React from 'react';
import FacebookLoginWithButton from 'react-facebook-login';
import fire from './fire';
import logo from './logo.svg';


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
      <h4>{user.name} Joins the Sesh.</h4>
      <img src={user.picture.data.url} height={user.picture.height} width={user.picture.width} alt="avatar"/>
        <h4>Sesh app for iOS is coming soon.</h4>

        fire.database().ref('messages').push( {user.name} );

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
    }


  state = {user:false}

  facebookResponse = (response) => { console.log( response ); this.setState( {...this.state, user: response } ) }

  render() {

      return (
          <div className="App">
              <header className="App-header">
                  <img src={logo} className="App-logo" alt="logo" />

                  <LoginButton facebookResponse={this.facebookResponse}/>

              </header>
          </div>
      );


    // return (
    //
    //     <div style={{ margin: "auto", textAlign: "center", paddingTop: "2em" }}>
    //       { this.state.user ? <UserScreen user={this.state.user}/> :
    //
    //
    //
    //
    //       }
    //
    //     </div>
    //
    //
    // )
  }
}

export default App
