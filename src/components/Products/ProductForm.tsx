import React, { useRef, useState } from "react";
import { useMutation } from "@apollo/client";
import { Form, useNavigate } from "react-router-dom";

import Input from "../UI/Input";
import { isEmpty } from "../../utils/validation";
import { ADD_PRODUCT } from "../../graphql/product";

import "../Form.css";
import { graphQLError } from "../../types/graphQLError";

const ProductForm = () => {
  const navigate = useNavigate();
  const [displayError, setDisplayError] = useState<JSX.Element[]>([]);
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    size: true,
  });

  const nameInput = useRef<HTMLInputElement>(null);
  const descrpiptionInput = useRef<HTMLInputElement>(null);
  const sizeInput = useRef<HTMLInputElement>(null);
  const hazardousInput = useRef<HTMLInputElement>(null);

  const [createProduct] = useMutation(ADD_PRODUCT);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const name = nameInput.current?.value || "";
    const size = +(sizeInput.current?.value || "0");
    const hazardous = hazardousInput.current?.checked ? false : true;
    const description = descrpiptionInput.current?.value || "";

    const nameIsValid = !isEmpty(name);
    const sizeIsValid = size > 0;

    setFormInputsValidity({
      name: nameIsValid,
      size: sizeIsValid,
    });

    const formIsValid = nameIsValid && sizeIsValid;

    if (!formIsValid) {
      return;
    }
    
    createProduct({
      variables: {
        name: name,
        description: description,
        size: size,
        hazardous: hazardous
      },
    })
      .then(({ data }) => {
        console.log(data);

        navigate("/products");
        navigate(0);
      })
      .catch((error) => {
        const originalError = error.graphQLErrors[0].extensions
          .originalError as graphQLError;
        console.log(originalError);
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

  const nameControlClasses = `input ${
    formInputsValidity.name ? "" : "invalid"
  }`;
  const sizeControlClasses = `input ${
    formInputsValidity.size ? "" : "invalid"
  }`;

  return (
    <Form onSubmit={submitHandler} className="form">
      {displayError && <p className="error-text">{displayError}</p>}
      <Input
        class={nameControlClasses}
        title="Name"
        isValid={formInputsValidity.name}
        ref={nameInput}
        id="name"
        type="text"
        name="name"
        required={true}
        message="Please enter a valid product name!"
      ></Input>
      <Input
        class="input"
        title="Descriptipn"
        id="descrpiption"
        type="text"
        name="descrpiption"
        ref={descrpiptionInput}
        required={false}
        isValid={true}
        message=""
      ></Input>
      <Input
        class={sizeControlClasses}
        title="Size"
        id="size"
        type="number"
        name="size"
        ref={sizeInput}
        required={true}
        isValid={formInputsValidity.size}
        message="Please enter a size!"
      ></Input>
      <Input
        class="input"
        title="Hazardous"
        id="hazardous"
        type="checkbox"
        name="hazardous"
        ref={hazardousInput}
        required={false}
        isValid={true}
        message=""
      ></Input>
      <div className="actions">
        <button type="submit">Save</button>
      </div>
    </Form>
  );
};

export default ProductForm;
