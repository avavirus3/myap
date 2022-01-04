import React from "react";
import axios from "axios";
import Loading from "./Loading";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      loaded: true,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  getUsers() {
    this.setState({
      loaded: false,
    });
    axios("https://random-data-api.com/api/users/random_user?size=5").then(
      (response) =>
        this.setState({
          users: [...this.state.users, ...response.data],
          loaded: true,
        })
    );
  }
  handleSubmit() {
    this.getUsers();
    console.log("pick a pick");
  }
  componentDidMount() {
    this.getUsers();
  }
  render() {
    return (
      <div className="App">
        {this.state.loaded ? (
          this.state.users.map((user) => (
            <div key={user.id}>
              <h1>{user.first_name}</h1>
              <h3>{user.email}</h3>

              <hr />
            </div>
          ))
        ) : (
          <Loading message="Wait it's" />
        )}
        <form>
          <input type="button" onClick={this.handleSubmit} value="load users" />
        </form>
      </div>
    );
  }
}

export default App;
