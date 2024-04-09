import React, { useState, useEffect } from 'react'
import './NewCollections.css'
import new_collection from '../Assets/new_collections'
import Item from '../Item/Item'

const NewCollections = () => {

  const [newCollections, setNewCollections] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:4000/newcollections')
   .then((response) => response.json())
   .then((data) => setNewCollections(data));
  }, []);

  return (
    <div className='new-collections'>
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className="collections">
        {newCollections && newCollections.map((item, i) => {
          return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
        })}
      </div>
    </div>
  )
}

export default NewCollections