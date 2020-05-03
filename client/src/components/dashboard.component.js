import React from "react";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";

class Dashboard extends React.Component {

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  }

  render () {
    const { user } = this.props.auth;

    return (
      <div>
        <p>{ user.name }</p>
        <p>{ user.password }</p>
        <p>{ user.email }</p>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(Dashboard);
