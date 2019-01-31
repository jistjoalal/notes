import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
    };
  }
  onSubmit = e => {
    e.preventDefault();

    const email = this.refs.email.value.trim();
    const password = this.refs.password.value.trim();

    Meteor.loginWithPassword({ email }, password, err => {
      if (err) {
        this.setState({
          error: 'Unable to login. Check email and password.',
        });
      }
      else {
        this.setState({
          error: '',
        });
      }
    });
  }
  render() {
    return (
      <div className="boxed-view">
        <div className="boxed-view__box">
          <h1>Login</h1>

          { !this.state.error ? null : <p>{this.state.error}</p> }

          <form className="boxed-view__form" onSubmit={this.onSubmit} noValidate>
            <input type="email" ref="email" name="email" placeholder="Email" />
            <input type="password" ref="password" name="password" placeholder="Password" />
            <button className="button">Login</button>
          </form>

          <Link to="/signup">Need an account?</Link>
        </div>
      </div>
    );
  }
}

export default Login;