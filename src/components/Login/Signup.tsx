import React, { useRef, useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { SIGNUP } from "../../graphql/login";
import Input from "../UI/Input";
import { isEmpty, isMinLength, isEmail } from "../../utils/validation";
import { GraphQLError } from "../../types/GraphQLError";

import "../Form.css";

function Signup() {
  const [displayError, setDisplayError] = useState<JSX.Element[]>([]);
  const [formInputsValidity, setFormInputsValidity] = useState({
    username: true,
    password: true,
    retypedPassword: true,
    firstName: true,
    lastName: true,
    email: true,
  });
  const navigate = useNavigate();
  const userNameInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);
  const retypedPasswordInput = useRef<HTMLInputElement>(null);
  const firstNameInput = useRef<HTMLInputElement>(null);
  const lastNameInput = useRef<HTMLInputElement>(null);
  const emailInput = useRef<HTMLInputElement>(null);

  const [signUp] = useMutation(SIGNUP);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const username = userNameInput.current?.value || "";
    const password = passwordInput.current?.value || "";
    const retypedPassword = retypedPasswordInput.current?.value || "";
    const firstName = firstNameInput.current?.value || "";
    const lastName = lastNameInput.current?.value || "";
    const email = emailInput.current?.value || "";

    const usernameIsValid = !isEmpty(username) && isMinLength(password, 5);
    const passwordIsValid = !isEmpty(password) && isMinLength(password, 8);
    const retypedPasswordIsValid =
      !isEmpty(retypedPassword) &&
      isMinLength(password, 8) &&
      retypedPassword === password;
    const firstNameIsValid = !isEmpty(firstName);
    const lastNameIsValid = !isEmpty(lastName);
    const emailIsValid = !isEmpty(email) && isEmail(email);

    setFormInputsValidity({
      username: usernameIsValid,
      password: passwordIsValid,
      retypedPassword: retypedPasswordIsValid,
      firstName: firstNameIsValid,
      lastName: lastNameIsValid,
      email: emailIsValid,
    });

    const formIsValid =
      usernameIsValid &&
      passwordIsValid &&
      retypedPasswordIsValid &&
      firstNameIsValid &&
      lastNameIsValid &&
      emailIsValid;

    if (!formIsValid) {
      return;
    }

    signUp({
      variables: {
        username: username,
        password: password,
        retypedPassword: retypedPassword,
        firstName: firstNameInput.current?.value,
        lastName: lastNameInput.current?.value,
        email: emailInput.current?.value,
      },
    })
      .then(({ data }) => {
        console.log(data.register);

        navigate("/login");
      })
      .catch((error) => {
        const originalError = error.graphQLErrors[0].extensions
          .originalError as GraphQLError;

        let message = originalError.message.map((msg: any) => {
          return (
            <React.Fragment>
              {msg}
              <br />
            </React.Fragment>
          );
        });

        console.log(message);
        setDisplayError(message);
      });
  };

  const usernameControlClasses = `input ${
    formInputsValidity.username ? "" : "invalid"
  }`;
  const passwordControlClasses = `input ${
    formInputsValidity.password ? "" : "invalid"
  }`;
  const retypedPasswordControlClasses = `input ${
    formInputsValidity.retypedPassword ? "" : "invalid"
  }`;
  const firstNameControlClasses = `input ${
    formInputsValidity.firstName ? "" : "invalid"
  }`;
  const lastNameControlClasses = `input ${
    formInputsValidity.lastName ? "" : "invalid"
  }`;
  const emailControlClasses = `input ${
    formInputsValidity.email ? "" : "invalid"
  }`;

  return (
    <Form onSubmit={submitHandler} className="form">
      {displayError && <p className="error-text">{displayError}</p>}
      <Input
        class={usernameControlClasses}
        title="Username"
        isValid={formInputsValidity.username}
        ref={userNameInput}
        id="username"
        type="text"
        name="username"
        required={true}
        message="Please enter a valid username!"
      ></Input>
      <Input
        class={passwordControlClasses}
        title="Password"
        id="password"
        type="password"
        name="password"
        ref={passwordInput}
        required={true}
        isValid={formInputsValidity.password}
        message="Please enter a valid password!"
      ></Input>
      <Input
        class={retypedPasswordControlClasses}
        title="Retype Password"
        id="retypedPassword"
        type="password"
        name="retypedPassword"
        ref={retypedPasswordInput}
        required={true}
        isValid={formInputsValidity.retypedPassword}
        message="Please enter a password same as the first one!"
      ></Input>
      <Input
        class={firstNameControlClasses}
        title="First Name"
        id="firstName"
        type="text"
        name="firstName"
        ref={firstNameInput}
        required={true}
        isValid={formInputsValidity.firstName}
        message="Please enter a valid first name!"
      ></Input>
      <Input
        class={lastNameControlClasses}
        title="Last Name"
        id="lastName"
        type="text"
        name="lastName"
        ref={lastNameInput}
        required={true}
        isValid={formInputsValidity.lastName}
        message="Please enter a valid last name!"
      ></Input>
      <Input
        class={emailControlClasses}
        title="Email"
        id="email"
        type="email"
        name="email"
        ref={emailInput}
        required={true}
        isValid={formInputsValidity.email}
        message="Please enter a valid email!"
      ></Input>

      <div className="actions">
        <button type="submit">Sign Up</button>
      </div>
    </Form>
  );
}

export default Signup;
