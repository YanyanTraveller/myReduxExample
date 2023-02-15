import React from "react";
import { Link } from "react-router-dom";
import { sendRequest } from "./gptApi";

const GptPage = () => {
  sendRequest();
  return (
  <div className="jumbotron">
    hello world
  </div>
)};


export default GptPage;