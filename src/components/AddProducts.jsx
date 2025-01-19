import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Input, Select, Typography, Divider, Row, Col, Card } from "antd";
import './style.css';

const { Title, Text } = Typography;
const { Option } = Select;

const AddProducts = () => {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:5000/products")
      .then((response) => {
        console.log("Fetched products:", response.data);
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const handleAddProduct = () => {
    setSelectedProducts([...selectedProducts, { name: "", quantity: 1, price: 0 }]);
  };

  const handleProductChange = (index, field, value) => {
    const updatedProducts = [...selectedProducts];
    if (field === "name") {
      const selectedProduct = products.find((product) => product.name === value);
      updatedProducts[index] = {
        ...updatedProducts[index],
        name: value,
        price: selectedProduct ? selectedProduct.price : 0,
      };
    } else if (field === "quantity") {
      updatedProducts[index] = {
        ...updatedProducts[index],
        quantity: Number(value),
      };
    }
    setSelectedProducts(updatedProducts);
  };

  const calculateTotal = () => {
    const total = selectedProducts.reduce(
      (sum, product) => sum + product.price * product.quantity,
      0
    );
    setTotalAmount(total);
  };

  return (
    <div className="page-background">
    <Card className="card-background"
      style={{ maxWidth: 800, margin: "50px auto", padding: "0px", borderRadius: "10px" }}
      bordered
    >
      <Title level={1} style={{ textAlign: "center", marginTop: "0px", }}>
        Electric Shop
      </Title>
      <Divider />

      <Button type="primary" onClick={handleAddProduct} style={{ marginBottom: "20px" }}>
        Add Product
      </Button>

      {selectedProducts.map((product, index) => (
        <Row gutter={16} key={index} style={{ marginBottom: "10px" }}>
          <Col span={10}>
            <Select
              style={{ width: "100%" }}
              placeholder="Select a product"
              value={product.name}
              onChange={(value) => handleProductChange(index, "name", value)}
            >
              {products.map((p) => (
                <Option key={p._id} value={p.name}>
                  {p.name}
                </Option>
              ))}
            </Select>
          </Col>
          <Col span={6}>
            <Input
              type="number"
              min="1"
              value={product.quantity}
              onChange={(e) => handleProductChange(index, "quantity", e.target.value)}
              placeholder="Quantity"
            />
          </Col>
          <Col span={8}>
            <Text>Price: {product.price * product.quantity} Rs</Text>
          </Col>
        </Row>
      ))}

      <Divider />

      <Button type="primary" onClick={calculateTotal} style={{ marginRight: "10px" }}>
        Calculate Total
      </Button>

      <Text strong>Total Amount: {totalAmount} Rs</Text>
    </Card>
    </div>
  );
};

export default AddProducts;
