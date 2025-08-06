import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductForm.css';

const ProductForm: React.FC = () => {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/products');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setFeedbackMessage('');

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: productName,
          price: parseFloat(price),
          description: description,
        }),
      });

      setSubmitting(false);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Server did not return a valid JSON error.' }));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      setFeedbackMessage('Product added successfully!');
      setProductName('');
      setPrice('');
      setDescription('');
      
      setTimeout(() => setFeedbackMessage(''), 3000);

    } catch (error) {
      setSubmitting(false);
      if (error instanceof Error) {
        setFeedbackMessage(`Error: ${error.message}`);
      } else {
        setFeedbackMessage('An unknown error occurred.');
      }
    }
  };

  return (
    <div className="product-form-container">
      <form onSubmit={handleSubmit} className="product-form">
        <h2>Add New Product</h2>
        <div className="form-group">
          <input
            type="text"
            id="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
          <label htmlFor="productName">Product Name</label>
        </div>
        <div className="form-group">
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <label htmlFor="price">Price</label>
        </div>
        <div className="form-group">
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
          <label htmlFor="description">Description</label>
        </div>
        <div className="form-buttons-container">
          <button type="submit" disabled={submitting}>
              {submitting ? 'Adding...' : 'Add Product'}
          </button>
          <button type="button" onClick={handleNavigate} className="view-products-btn">
            View Products
          </button>
        </div>
        {feedbackMessage && <p className={`feedback-message ${feedbackMessage.startsWith('Error') ? 'error' : 'success'}`}>{feedbackMessage}</p>}
      </form>
    </div>
  );
};

export default ProductForm; 