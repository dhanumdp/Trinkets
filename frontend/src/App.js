import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import './App.css';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import { useSelector } from 'react-redux';
import RegisterScreen from './screens/RegisterScreen';
import ProductsScreen from './screens/ProductsScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import ProfileScreen from './screens/ProfileScreen';
import OrdersScreen from './screens/OrdersScreen';
import CustomOrderScreen from './screens/CustomOrderScreen'

function App() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const openMenu = () => {
    document.querySelector('.sidebar').classList.add('open');
  };
  const closeMenu = () => {
    document.querySelector('.sidebar').classList.remove('open');
  };
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="header">
          <div className="brand">
            <button onClick={openMenu}>&#9776;</button>
            <Link to="/">Trinkets</Link>
          </div>
          <div className="header-links">
          {
              userInfo && !userInfo.isAdmin &&(
                <Link to="/customOrder">Customize</Link>
              )
            }
            <Link to="/cart">Cart</Link>
          

            {userInfo ? (
              <Link to="/profile">{userInfo.name}</Link>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}
           
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <a href="#">Admin</a>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/orders">Orders</Link>
                    <Link to="/products">Products</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </header>
        <aside className="sidebar" style={{textAlign:"center"}}>
          <h3>Categories</h3>
          <button className="sidebar-close-button" onClick={closeMenu}>
            x
          </button>
          <ul className="categories">
            <li>
              <Link to="/category/Necklace" onClick={closeMenu}>Necklace</Link>
            </li>
            <li>
              <Link to="/category/Pendant" onClick={closeMenu}>Pendant</Link>
            </li>
            <li>
              <Link to="/category/Ring" onClick={closeMenu}>Ring</Link>
            </li>
            <li>
              <Link to="/category/Earring" onClick={closeMenu}>Earring</Link>
            </li>
            <li>
              <Link to="/category/Nose-Ring" onClick={closeMenu}>Nose-Ring</Link>
            </li>
            <li>
              <Link to="/category/Anklet" onClick={closeMenu}>Anklet</Link>
            </li>
            <li>
              <Link to="/category/Chain" onClick={closeMenu}>Chain</Link>
            </li>
            <li>
              <Link to="/category/Stud" onClick={closeMenu}>Stud</Link>
            </li>
            <li>
              <Link to="/category/Bracelet" onClick={closeMenu}>Bracelet</Link>
            </li>
            <li>
              <Link to="/category/Kada" onClick={closeMenu}>Kada</Link>
            </li>
          </ul>
        </aside>
        <main className="main">
          <div className="content">
            <Route path="/orders" component={OrdersScreen} />
            <Route path="/profile" component={ProfileScreen} />
            <Route path="/order/:id" component={OrderScreen} />
            <Route path="/products" component={ProductsScreen} />
            <Route path="/shipping" component={ShippingScreen} />
            <Route path="/payment" component={PaymentScreen} />
            <Route path="/placeorder" component={PlaceOrderScreen} />
            <Route path="/signin" component={SigninScreen} />
            <Route path="/register" component={RegisterScreen} />
            <Route path="/product/:id" component={ProductScreen} />
            <Route path="/cart/:id?" component={CartScreen} />
            <Route path="/category/:id" component={HomeScreen} />
            <Route path="/" exact={true} component={HomeScreen} />
            <Route path="/customOrder" component={CustomOrderScreen}/>
          </div>
        </main>
        <footer className="footer">All right reserved.</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
