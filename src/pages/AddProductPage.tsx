import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addProduct } from '../slices/productsSlice';
import { v4 as uuidv4 } from 'uuid';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const AddProductPage: React.FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [price, setPrice] = useState('');
  const [status, setStatus] = useState<'active' | 'archived'>('active');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !images.length || !price) {
      alert('Заполните все поля');
      return;
    }

    const newProduct = {
      id: uuidv4(),
      name,
      description,
      images: images.map(file => URL.createObjectURL(file)),
      price: parseFloat(price),
      status
    };

    dispatch(addProduct(newProduct));
    navigate('/products');
  };

  return (
    <div className="container">
      <h1>Add Product</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Название:</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Описание:</label>
          <ReactQuill value={description} onChange={setDescription} />
        </div>
        <div className="mb-3">
          <label className="form-label">Images:</label>
          <input type="file" className="form-control" multiple onChange={handleImageChange} required />
          <div className="mt-2">
            {images.map((image, index) => (
              <div key={index} className="d-flex align-items-center mb-2">
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Product ${index + 1}`}
                  width="100"
                  className="me-2"
                />
                <button type="button" className="btn btn-sm btn-danger" onClick={() => handleRemoveImage(index)}>Remove</button>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Цена:</label>
          <input
            type="number"
            className="form-control"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Статус:</label>
          <select
            className="form-select"
            value={status}
            onChange={(e) => setStatus(e.target.value as 'active' | 'archived')}
          >
            <option value="active">Active</option>
            <option value="archived">Archived</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary me-2">Сохранить</button>
        <button type="button" className="btn btn-secondary" onClick={() => navigate('/products')}>Отмена</button>
      </form>
    </div>
  );
};

export default AddProductPage;
