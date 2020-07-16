import React, { Component } from "react";
import Spinner from "../layout/Spinner";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";

import { firestoreConnect } from "react-redux-firebase";
import PropTypes from "prop-types";

class Clients extends Component {
  state = {
    totalOwed: null,
  };
  static getDerivedStateFromProps(props, state) {
    const { clients } = props;
    if (clients) {
      //Add balances
      const total = clients.reduce((total, client) => {
        return total + parseFloat(client.balance.toString());
      }, 0);
      return { totalOwed: total };
    }
    return null;
  }
  render() {
    const { clients } = this.props;
    const { totalOwed } = this.state;
    if (clients) {
      return (
        <div>
          <div className="row">
            <div className="col-md-6">
              <h2>
                <i className="fa fa-users"></i> Clients
              </h2>
            </div>
            <div className="col-md-6">
              <h5 className="text-right text-secondary">
                Total Owed: ${totalOwed.toFixed(2)}
              </h5>
            </div>
          </div>
          <table className="table table-striped">
            <thead className="inverse">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Balance</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client.id}>
                  <th>
                    {client.firstName} {client.lastName}
                  </th>
                  <th>{client.email}</th>
                  <th>${parseFloat(client.balance).toFixed(2)}</th>
                  <th>
                    <Link
                      to={`/client/${client.id}`}
                      className="btn btn-secondary"
                    >
                      <i className="fa fa-arrow-circle-right"></i> Details
                    </Link>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } else {
      return <Spinner />;
    }
  }
}

Clients.propTypes = {
  firestore: PropTypes.object.isRequired,
  clients: PropTypes.array,
};

export default compose(
  firestoreConnect([
    {
      collection: "clients",
    },
  ]),
  connect((state, props) => ({
    clients: state.firestore.ordered.clients,
  }))
)(Clients);
