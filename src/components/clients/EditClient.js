import React, { Component } from "react";
import Spinner from "../layout/Spinner";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import PropTypes from "prop-types";

class EditClient extends Component {
  constructor(props) {
    super(props);
    //Create refs
    this.firstNameInput = React.createRef();
    this.lastNameInput = React.createRef();
    this.emailInput = React.createRef();
    this.phoneInput = React.createRef();
    this.balanceInput = React.createRef();
  }
  onSubmit = (e) => {
    e.preventDefault();

    const { client, firestore, history } = this.props;

    //Update client
    const updClient = {
      firstName: this.firstNameInput.current.value,
      lastName: this.lastNameInput.current.value,
      email: this.emailInput.current.value,
      phone: this.phoneInput.current.value,
      balance:
        this.balanceInput.current.value === ""
          ? 0
          : this.balanceInput.current.value,
    };
    //Update in firestore

    firestore
      .update({ collection: "clients", doc: client.id }, updClient)
      .then(history.push("/"));
  };

  render() {
    const { client } = this.props;
    const { disableBalanceOnEdit } = this.props.settings;
    if (client) {
      return (
        <div className="card">
          <h2 className="card-header">Edit Contact</h2>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <input
                  name="firstName"
                  type="text"
                  placeholder="Enter firstname"
                  className="form-control"
                  onChange={this.onChange}
                  defaultValue={client.firstName}
                  ref={this.firstNameInput}
                />
              </div>
              <div className="form-group">
                <input
                  name="lastName"
                  type="text"
                  placeholder="Enter lastName"
                  className="form-control"
                  onChange={this.onChange}
                  defaultValue={client.lastName}
                  ref={this.lastNameInput}
                />
              </div>
              <div className="form-group">
                <input
                  name="email"
                  type="email"
                  placeholder="Enter email"
                  className="form-control"
                  onChange={this.onChange}
                  defaultValue={client.email}
                  ref={this.emailInput}
                />
              </div>
              <div className="form-group">
                <input
                  name="phone"
                  type="text"
                  placeholder="Enter phone"
                  className="form-control"
                  onChange={this.onChange}
                  defaultValue={client.phone}
                  ref={this.phoneInput}
                />
              </div>
              <div className="form-group">
                <input
                  name="balance"
                  type="text"
                  placeholder="Enter balance"
                  className="form-control"
                  onChange={this.onChange}
                  defaultValue={client.balance}
                  ref={this.balanceInput}
                  disabled={disableBalanceOnEdit}
                />
              </div>
              <input
                type="submit"
                value="Edit Client"
                className="btn btn-block bg-primary"
              />
            </form>
          </div>
        </div>
      );
    } else {
      return <Spinner />;
    }
  }
}

EditClient.propTypes = {
  firestore: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
};

export default compose(
  firestoreConnect((props) => [
    { collection: "clients", storeAs: "client", doc: props.match.params.id },
  ]),
  connect(({ firestore: { ordered }, settings }, props) => ({
    client: ordered.client && ordered.client[0],
    settings,
  }))
)(EditClient);
