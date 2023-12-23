import React, { Component } from "react";
import AnimalDataService from "../services/animal.service";
import { withRouter } from '../common/with-router';

class Animal extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getAnimal = this.getAnimal.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateAnimal = this.updateAnimal.bind(this);
    this.deleteAnimal = this.deleteAnimal.bind(this);

    this.state = {
      currentAnimal: {
        id: null,
        title: "",
        description: "",
        published: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getAnimal(this.props.router.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function(prevState) {
      return {
        currentAnimal: {
          ...prevState.currentAnimal,
          title: title
        }
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;
    
    this.setState(prevState => ({
      currentAnimal: {
        ...prevState.currentAnimal,
        description: description
      }
    }));
  }

  getAnimal(id) {
    AnimalDataService.get(id)
      .then(response => {
        this.setState({
          currentAnimal: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentAnimal.id,
      title: this.state.currentAnimal.title,
      description: this.state.currentAnimal.description,
      published: status
    };

    AnimalDataService.update(this.state.currentAnimal.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentAnimal: {
            ...prevState.currentAnimal,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateAnimal() {
    AnimalDataService.update(
      this.state.currentAnimal.id,
      this.state.currentAnimal
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The animal was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteAnimal() {    
    AnimalDataService.delete(this.state.currentAnimal.id)
      .then(response => {
        console.log(response.data);
        this.props.router.navigate('/animals');
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentAnimal } = this.state;

    return (
      <div>
        {currentAnimal ? (
          <div className="edit-form">
            <h4>Animal</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentAnimal.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentAnimal.description}
                  onChange={this.onChangeDescription}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentAnimal.published ? "Published" : "Pending"}
              </div>
            </form>

            {currentAnimal.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteAnimal}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateAnimal}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on an Animal...</p>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Animal);