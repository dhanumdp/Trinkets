import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import axios from 'axios';
import {
  saveProduct,
  listProducts,
  deleteProdcut,
} from '../actions/productActions';

function CustomOrderScreen(props) {
//   const [modalVisible, setModalVisible] = useState(false);
//   const [headerVisible, setHeaderVisible] = useState(true);
//   const [id, setId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState('');
  const [message, setMessage]=useState('');

//   const [category, setCategory] = useState('');
//   const [countInStock, setCountInStock] = useState('');
//   const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);
//   const productList = useSelector((state) => state.productList);
//   const { loading, products, error } = productList;

//   const productSave = useSelector((state) => state.productSave);
//   const {
//     loading: loadingSave,
//     success: successSave,
//     error: errorSave,
//   } = productSave;

//   const productDelete = useSelector((state) => state.productDelete);
//   const {
//     loading: loadingDelete,
//     success: successDelete,
//     error: errorDelete,
//   } = productDelete;
  const dispatch = useDispatch();

  useEffect(() => {
  
   // dispatch(listProducts());
    return () => {
      //
    };
  }, []);


  const submitHandler = (e) => {
    e.preventDefault();
    console.log(email,password,image)
    axios.post('/api/customOrder/makeRequest',{email,password,image,message})
    alert('Request Sent successfully.');
    props.history.push('/');
  };
 
  const uploadFileHandler = (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('image', file);
    setUploading(true);
    axios
      .post('/api/uploads', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        setImage(response.data);
        setUploading(false);
      })
      .catch((err) => {
        console.log(err);
        setUploading(false);
      });
  };
  return (
    <div className="content content-margined">
        <div className="form">
          <form onSubmit={submitHandler}>
            <ul className="form-container">
              <li>
                <h2> Send Request</h2>
              </li>
              <li>
              </li>

              <li>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Mail Id"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                 placeholder="Your Mail Password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="image">Image</label>
                <input
                  type="text"
                  name="image"
                  value ={image}
                  id="image"
                  placeholder="Upload Image"
                  onChange={(e) => setImage(e.target.value)}
                ></input>
                <input type="file" onChange={uploadFileHandler}></input>
              </li>
              <li>
                <label htmlFor="text">Message</label>
                <input
                  type="message"
                  name="message"
                 placeholder="Add your message"
                  id="message"
                  onChange={(e) => setMessage(e.target.value)}
                ></input>
              </li>
              <li>
                <button type="submit" className="button primary">
                Send 
                </button>
              </li>
              <li>
              <Link type="button" style={{textAlign:"center"}} to="/" className="button secondary">Back</Link>
              </li>
            </ul>
          </form>
        </div>
    </div>
  );
}
export default CustomOrderScreen;
