import { useQuery } from "@apollo/client";
import { useNavigate } from "react-router";

import { product } from "../../types/product";
import ProductItem from "./ProductItem";
import { GET_PRODUCTS } from "../../graphql/product";

import classes from "./Product.module.css";

const PriductList = () => {
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_PRODUCTS, {
    variables: { limit: 10, currentPage: 1, total: true },
  });

  if (loading) return <p>"Loading..."</p>;
  if (error) return <p>`Error! ${error.message}`</p>;

  const products = data.productsList.data as product[];

  return (
    <>
      <ul>
        {products.map((product) => (
          <ProductItem key={product.id} item={product} />
        ))}
      </ul>
      <div className={classes.actions}>
        <button onClick={() => navigate("new")}>+ Add Product</button>
      </div>
    </>
  );
};

export default PriductList;
