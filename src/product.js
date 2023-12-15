const express = require("express");
const PORT = 8001;
const { RPCObserver, RPCRequest } = require("./rpc");
const app = express();
app.use(express.json());

const fakeProductResponse = {
  _id: "101",
  title: "Product 101",
  price: 100,
};

RPCObserver("PRODUCT_RPC", fakeProductResponse);

app.get("/customer", async (req, res) => {
  const requestPayload = {
    customerId: "s123wassws1117",
  };
  try {
    const responseData = await RPCRequest("CUSTOMER_RPC", requestPayload);
    console.log(responseData);
    return res.status(200).json(responseData);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

app.get("/", (req, res) => {
  return res.json("Product Service");
});

app.listen(PORT, () => {
  console.log(`Product is Running on ${PORT}`);
  console.clear();
});
