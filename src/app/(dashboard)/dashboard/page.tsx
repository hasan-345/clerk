"use client";
import Cards from '@/components/Cards'
import React, { useState } from 'react'

const Dashboard = () => {

  const [productData, setProductData] = useState({
    name: "",
    price: "",
    discountPrice: "",
    description: "",
    stock: "",
    category: "",
    photos: [] as File[], // Array to hold the file input
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setProductData({
        ...productData,
        photos: Array.from(e.target.files), // Convert FileList to an array
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Create FormData to send the form data and files
    const formData = new FormData();
    formData.append("name", productData.name);
    formData.append("price", productData.price);
    formData.append("discountPrice", productData.discountPrice);
    formData.append("description", productData.description);
    formData.append("stock", productData.stock);
    formData.append("category", productData.category);

    // Append each file to the FormData object
    productData.photos.forEach((photo) => {
      formData.append("photos", photo); // "photos" matches the backend API
    });

    try {
      const response = await fetch("/api/product/create-product", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (result.success) {
        console.log("Product successfully created:", result.message);
      } else {
        console.error("Failed to create product:", result.message);
      }
    } catch (error) {
      console.error("Error uploading product:", error);
    }
  };



  return (
    <div>
         <form onSubmit={handleSubmit}>
      <div>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={productData.name}
          onChange={(e) =>
            setProductData({ ...productData, name: e.target.value })
          }
        />
      </div>
      <div>
        <label>Price</label>
        <input
          type="number"
          name="price"
          value={productData.price}
          onChange={(e) =>
            setProductData({ ...productData, price: e.target.value })
          }
        />
      </div>
      <div>
        <label>Discount Price</label>
        <input
          type="number"
          name="discountPrice"
          value={productData.discountPrice}
          onChange={(e) =>
            setProductData({
              ...productData,
              discountPrice: e.target.value,
            })
          }
        />
      </div>
      <div>
        <label>Description</label>
        <textarea
          name="description"
          value={productData.description}
          onChange={(e) =>
            setProductData({ ...productData, description: e.target.value })
          }
        />
      </div>
      <div>
        <label>Stock</label>
        <input
          type="number"
          name="stock"
          value={productData.stock}
          onChange={(e) =>
            setProductData({ ...productData, stock: e.target.value })
          }
        />
      </div>
      <div>
        <label>Category</label>
        <input
          type="text"
          name="category"
          value={productData.category}
          onChange={(e) =>
            setProductData({ ...productData, category: e.target.value })
          }
        />
      </div>
      <div>
        <label>Product Images</label>
        <input
          type="file"
          multiple
          onChange={handleFileChange} // Handle multiple file selection
        />
      </div>
      <button type="submit">Upload Product</button>
    </form>
    </div>
  )
}

export default Dashboard