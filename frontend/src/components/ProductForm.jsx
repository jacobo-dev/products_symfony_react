import { useEffect, useState } from 'react';

const ProductForm= ({createProduct, selectedProduct})=>{
    const [form, setForm] = useState({ name: '', description: '', price: '' });

     useEffect(() => {
    if (selectedProduct) {
      setForm({
        name: selectedProduct.name,
        description: selectedProduct.description,
        price: selectedProduct.price
      });
    }
  }, [selectedProduct]);

    const addProduct=(e)=>{
        e.preventDefault()
        createProduct({
            name: form.name,
            description: form.description,
            price: form.price,
        })
        setForm({ name: '', description: '', price: '' })
    }


    return(
        <form onSubmit={addProduct} style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Nombre"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Precio"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
        />
        <button type="submit">Create</button>
      </form>
    )
}

export default ProductForm