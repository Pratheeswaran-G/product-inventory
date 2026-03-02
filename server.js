// backend/server.js
const express = require("express");
const cors = require("cors");
 
const app = express();
app.use(cors());
app.use(express.json());
 
let products = [];
 
// CREATE
app.post("/products", (req, res) => {
  const newProduct = {
    id: Date.now(),
    ...req.body
  };
  products.push(newProduct);
  res.json(newProduct);
});
 
// SEARCH (must be before :id)
app.get("/products/search", (req, res) => {
  const q = req.query.q?.toLowerCase() || "";
 
  const result = products.filter(product =>
    Object.values(product).some(value =>
      String(value).toLowerCase().includes(q)
    )
  );
 
  res.json(result);
});
 
// READ ALL
app.get("/products", (req, res) => {
  res.json(products);
});
 
// READ ONE
app.get("/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find(p => p.id === id);
 
  if (!product) return res.status(404).json({ message: "Not found" });
 
  res.json(product);
});
 
// UPDATE
app.put("/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
 
  products = products.map(product =>
    product.id === id ? { ...product, ...req.body } : product
  );
 
  res.json({ message: "Updated successfully" });
});
 
// DELETE
app.delete("/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
 
  products = products.filter(product => product.id !== id);
 
  res.json({ message: "Deleted successfully" });
});
 
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});