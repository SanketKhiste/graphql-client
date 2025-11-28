import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  GET_PRODUCTS,
  ADD_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
} from "./graphql/productQueries";

const App: React.FC = () => {
  const { data, loading, error } = useQuery(GET_PRODUCTS);

  const [addProduct] = useMutation(ADD_PRODUCT, {
    refetchQueries: [{ query: GET_PRODUCTS }],
  });

  const [updateProduct] = useMutation(UPDATE_PRODUCT, {
    refetchQueries: [{ query: GET_PRODUCTS }],
  });

  const [deleteProduct] = useMutation(DELETE_PRODUCT, {
    refetchQueries: [{ query: GET_PRODUCTS }],
  });

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong!</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Products List</h2>

      {/* Add Product */}
      <div>
        <input
          placeholder="Product Name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Price"
          type="number"
          onChange={(e) => setPrice(e.target.value)}
        />

        <button
          onClick={() =>
            addProduct({
              variables: {
                name,
                price: parseFloat(price),
              },
            })
          }
        >
          Add Product
        </button>
      </div>

      {/* Product List */}
      <ul>
        {data.products.map((p: any) => (
          <li key={p.id}>
            {p.name} - ₹{p.price}
            <button
              onClick={() =>
                updateProduct({
                  variables: {
                    id: p.id,
                    name: p.name + " Updated",
                    price: p.price + 1000,
                  },
                })
              }
            >
              Update
            </button>

            <button
              onClick={() =>
                deleteProduct({
                  variables: { id: p.id },
                })
              }
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
