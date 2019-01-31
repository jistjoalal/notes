import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import PropTypes from 'prop-types';

export default PrivateHeader = props =>
  <div className="header">
    <div className="header__content">
      <h1 className="header__title">{props.title}</h1>
      <button className="button button--inline"
        onClick={() => Accounts.logout()}
      >
        Logout
      </button>
    </div>
  </div>

PrivateHeader.propTypes = {
  title: PropTypes.string.isRequired,
}
