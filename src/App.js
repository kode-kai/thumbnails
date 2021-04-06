import React from "react";

import "./App.css";
import { Thumbnail } from "./components/Thumbnail";

import Jumbotron from "react-bootstrap/Jumbotron";
import Toast from "react-bootstrap/Toast";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

export const App = () => (
  <Container>
    <Thumbnail />
  </Container>
);
