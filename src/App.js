import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { socketConnect } from 'socket.io-react';

class App extends Component {
  constructor() {
    super()
    this.state = {
      message: "",
      messages: []
    }
  }
  componentDidMount() {
    const { messages} = this.state
    this.props.socket.on('receive-message', msg => {
      messages.push(msg)
      this.setState({
        messages
      })
    })
  }
  handleSubmit = (e) => {
    console.log('halooo')
    this.props.socket.emit('send-message', this.state.message);
    e.preventDefault()
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <form onSubmit={this.handleSubmit}>
          <input type="text"  value={this.state.message} onChange={({target}) => this.setState({message: target.value})} />
          <button type="submit">Kirim</button>
        </form>
        <table>
          {
            this.state.messages.map(message => {
              return (
                <tr>
                  <td>
                    {
                      message
                    }
                </td>
                </tr>
              )
            })
          }
        </table>
      </div>
    );
  }
}
export default socketConnect(App)
