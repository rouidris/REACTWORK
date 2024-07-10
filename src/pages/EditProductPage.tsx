import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { RootState } from '../store/store';
import { updateProduct } from '../slices/productsSlice';

const EditProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = useSelector((state: RootState) => state.products.products.find(p => p.id === id));
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [price, setPrice] = useState('');
  const [status, setStatus] = useState<'active' | 'archived'>('active');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setImages(product.images); 
      setPrice(product.price.toString());
      setStatus(product.status);
    }
  }, [product]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files);
      const urls = fileArray.map(file => URL.createObjectURL(file));
      setImages(urls);
    }
  };

  const handleRemoveImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && images.length && price) {
      const updatedProduct = {
        id: id as string,
        name,
        description,
        images,
        price: parseFloat(price),
        status
      };
      dispatch(updateProduct(updatedProduct));
      navigate('/products');
    } else {
      alert('Заполните все поля');
    }
  };

  return (
    <div className="container">
      <h1>Edit Product</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Название:</label>
          <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Описание:</label>
          <textarea className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Images:</label>
          <input type="file" className="form-control" multiple onChange={handleImageChange} />
          <div className="mt-2">
            {images.map((image, index) => (
              <div key={index} className="d-flex align-items-center mb-2">
                <img src={image} alt={`Product ${index + 1}`} width="50" className="img-thumbnail me-2" />
                <button type="button" className="btn btn-sm btn-danger" onClick={() => handleRemoveImage(index)}>Remove</button>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Цена:</label>
          <input type="number" className="form-control" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Статус:</label>
          <select className="form-select" value={status} onChange={(e) => setStatus(e.target.value as 'active' | 'archived')}>
            <option value="active">Active</option>
            <option value="archived">Archived</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary me-2">Save</button>
        <button type="button" className="btn btn-secondary" onClick={() => navigate('/products')}>Cancel</button>
      </form>
    </div>
  );
};

export default EditProductPage;
