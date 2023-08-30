import React, { useRef, useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { GraphQLError } from "../../types/GraphQLError";
import Input from "../UI/Input";
import { LOGIN } from "../../graphql/login";

import "../Form.css";

function Login() {
  const navigate = useNavigate();
  const [displayError, setDisplayError] = useState("");
  const userNameInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);

  const [login, { error }] = useMutation(LOGIN);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("submitHandler");
    login({
      variables: {
        username: userNameInput.current?.value,
        password: passwordInput.current?.value,
      },
    })
      .then(({ data }) => {
        const token = data.login.token;

        localStorage.setItem("token", token);
        const expiration = new Date();
        expiration.setHours(expiration.getHours() + 1);
        localStorage.setItem("expiration", expiration.toISOString());

        navigate("/");
        navigate(0);
      })
      .catch((error) => {
        const originalError = error.graphQLErrors[0].extensions
          .originalError;
        setDisplayError(originalError.message);
      });
  };

  return (
    <Form onSubmit={submitHandler} className="form">
      {displayError && <p className="error-text">{displayError}</p>}
      <Input
        class="input"
        title="Username"
        id="username"
        type="text"
        name="username"
        ref={userNameInput}
        required={true}
        isValid={true}
        message={""}
      ></Input>
      <Input
        class="input"
        title="Password"
        id="password"
        type="password"
        name="password"
        ref={passwordInput}
        required={true}
        isValid={true}
        message={""}
      ></Input>
      <div className="actions">
        <button type="submit">Login</button>
      </div>
    </Form>
  );
}

export default Login;
