import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import classnames from "classnames";

import { firestoreConnect } from "react-redux-firebase";
import PropTypes from "prop-types";

class AddClient extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    balance: "",
  };
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = (e) => {
    e.preventDefault();

    const { firestore, history } = this.props;
    const newClient = this.state;

    //if no balance make 0
    if (newClient.balance === "") {
      newClient.balance = 0;
    }

    firestore.add({ collection: "clients" }, newClient).then(history.push("/"));
  };
  render() {
    const { disableBalanceOnAdd } = this.props.settings;

    return (
      <div className="card">
        <h2 className="card-header">Add Contact</h2>
        <div className="card-body">
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <input
                name="firstName"
                type="text"
                placeholder="Enter firstname"
                className="form-control"
                onChange={this.onChange}
                value={this.state.firstName}
              />
            </div>
            <div className="form-group">
              <input
                name="lastName"
                type="text"
                placeholder="Enter lastName"
                className="form-control"
                onChange={this.onChange}
                value={this.state.lastName}
              />
            </div>
            <div className="form-group">
              <input
                name="email"
                type="email"
                placeholder="Enter email"
                className="form-control"
                onChange={this.onChange}
                value={this.state.email}
              />
            </div>
            <div className="form-group">
              <input
                name="phone"
                type="text"
                placeholder="Enter phone"
                className="form-control"
                onChange={this.onChange}
                value={this.state.phone}
              />
            </div>
            <div className="form-group">
              <input
                name="balance"
                type="text"
                placeholder="Enter balance"
                className="form-control"
                onChange={this.onChange}
                value={this.state.balance}
                disabled={disableBalanceOnAdd}
              />
            </div>
            <input
              type="submit"
              value="Add Client"
              className="btn btn-block bg-primary"
            />
          </form>
        </div>
      </div>
    );
  }
}

AddClient.propTypes = {
  firestore: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
};

export default compose(
  firestoreConnect(),
  connect((state, props) => ({
    settings: state.settings,
  }))
)(AddClient);
