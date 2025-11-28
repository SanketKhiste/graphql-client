import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_PRODUCT, GET_PRODUCTS } from "../graphql/productQueries";

const AddProductForm: React.FC = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const [addProduct] = useMutation(ADD_PRODUCT, {
    refetchQueries: [{ query: GET_PRODUCTS }],
  });

  const handleSubmit = () => {
    if (!name || !price) return alert("Please enter details");

    addProduct({
      variables: {
        name,
        price: parseFloat(price),
      },
    });

    setName("");
    setPrice("");
  };

  return (
    <div style={{ marginBottom: 20 }}>
      <h3>Add Product</h3>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ marginRight: 10 }}
      />
      <input
        placeholder="Price"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        style={{ marginRight: 10 }}
      />

      <button onClick={handleSubmit}>Add</button>
    </div>
  );
};

export default AddProductForm;
