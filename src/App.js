import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddAnimal from "./components/add-animal.component";
import Animal from "./components/animal.component";
import AnimalsList from "./components/animals-list.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/animals"} className="navbar-brand">
            sicmagg0t
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/animals"} className="nav-link">
                Animals
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<AnimalsList/>} />
            <Route path="/animals" element={<AnimalsList/>} />
            <Route path="/add" element={<AddAnimal/>} />
            <Route path="/animals/:id" element={<Animal/>} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;