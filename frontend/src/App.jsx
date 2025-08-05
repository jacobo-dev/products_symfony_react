import { useEffect, useState } from 'react';
import productService from './services/products';
import ProductForm from './components/ProductForm';
import Product from './components/Product';

function App() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    productService.getAll().then(products =>
      setProducts(products))
  }, [])

  const adProduct = async (productObj) => {

    if (products.find(p => p.name === productObj.name)) {
      const idProduct = products.find(p => p.name === productObj.name)
      const res = await productService.update(idProduct.id, productObj)
      setProducts(products.map(product => product.id !== idProduct.id ? product : res))
      ;
    } else {
      const res = await productService.create(productObj)
      setProducts(products.concat(res))
    }


  }

  const handleDelete = async (productObj) => {

   const delBlog = await productService.remove(productObj.id)
    setProducts(products.filter(p => p.id !== productObj.id));

  }

  const handleEdit = async (productObj) => {
    setSelectedProduct(productObj);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Productos</h1>

      <ProductForm  createProduct ={adProduct} selectedProduct={selectedProduct}/>

      {products
      .map(product=>
          <Product key={product.id} product={product} edit={handleEdit} remove={handleDelete} />
       )
      }
    
      
    </div>
  );
}

export default App;
