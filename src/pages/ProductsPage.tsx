import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { deleteProduct } from '../slices/productsSlice';

const ProductsPage: React.FC = () => {
  const products = useSelector((state: RootState) => state.products.products);
  const dispatch = useDispatch();

  // Состояния для фильтра поиска
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;

  // Фильтрация 
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Логика пагинаци
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleDelete = (id: string) => {
    dispatch(deleteProduct(id));
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Products</h1>
      <div className="mb-3">
        <Link to="/products/create" className="btn btn-primary">Add Product</Link>
      </div>
      <div className="mb-3">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="form-control"
        />
      </div>
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Image</th>
            <th scope="col">Название</th>
            <th scope="col">Статус</th>
            <th scope="col">Цена</th>
            <th scope="col">Действие</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map(product => (
            <tr key={product.id}>
              <td>
                {product.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={product.name}
                    width="200"
                    className="img-thumbnail"
                  />
                ))}
              </td>
              <td>{product.name}</td>
              <td>{product.status}</td>
              <td>{product.price}</td>
              <td>
                <Link to={`/products/edit/${product.id}`} className="btn btn-secondary btn-sm m-1 w-50">Edit</Link>
                <button onClick={() => handleDelete(product.id)} className="btn btn-danger btn-sm m-1 w-50">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Пагинация */}
      <nav>
        <ul className="pagination">
          {Array.from({ length: Math.ceil(filteredProducts.length / productsPerPage) }, (_, index) => (
            <li key={index} className={`page-item ${index + 1 === currentPage ? 'active' : ''}`}>
              <button onClick={() => paginate(index + 1)} className="page-link">{index + 1}</button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default ProductsPage;
