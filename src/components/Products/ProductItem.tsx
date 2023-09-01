import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router";

import { product } from "../../types/product";
import { DELETE_PRODUCT } from "../../graphql/product";

import classes from "./Product.module.css";

const ProductItem: React.FC<{ item: product }> = (props) => {
  const [deleteProduct] = useMutation(DELETE_PRODUCT);
  const navigate = useNavigate();

  const deleteHandler = () => {
    deleteProduct({
      variables: {
        id: props.item.id,
      },
    }).then(({ data }) => {
      console.log(data);

      navigate("/products");
      navigate(0);
    });
  };

  const editHandler = () => {
    console.log("edit");
  };

  return (
    <li className={classes.product}>
      <div>
        <h3>
          {" "}
          {props.item.name}
          {props.item.hazardous ? ", Hazardous" : ""}
        </h3>
        <div className={classes.description}>
          {props.item.description}, size: {props.item.size}
        </div>
        <div className={classes.actions}>
          <button className={classes["button--alt"]} onClick={editHandler}>
            Edit
          </button>
          <button className={classes.button} onClick={deleteHandler}>
            Delete
          </button>
        </div>
      </div>
    </li>
  );
};
export default ProductItem;
