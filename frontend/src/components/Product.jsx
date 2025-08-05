const Product =({product, edit, remove})=>{
    
    const handleEdit= ()=>{
        
        edit({
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
        })
    }
    const handleDelete= ()=>{
        remove({
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
        })
    }
    
    return(
        <ul>

          <li key={product.id}>{product.name} -{product.description}- ${product.price}
            <button onClick={() => handleEdit()}>Edit</button>
            <button onClick={() => handleDelete()}>Delete</button>
          </li>


      </ul>
    )
}

export default Product