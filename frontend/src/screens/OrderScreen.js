import Axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createOrder, detailsOrder, payOrder } from '../actions/orderActions';
import PaypalButton from '../components/PaypalButton';
function OrderScreen(props) {

  const orderPay = useSelector(state => state.orderPay);
  const { loading: loadingPay, success: successPay, error: errorPay } = orderPay;
  const dispatch = useDispatch();
  useEffect(() => {
    if (successPay) {
      props.history.push("/profile");
    } else {
      dispatch(detailsOrder(props.match.params.id));
    }
    return () => {
    };
  }, [successPay]);

  const handleSuccessPayment = (paymentResult) => {
    dispatch(payOrder(order, paymentResult));
  }

  const orderDetails = useSelector(state => state.orderDetails);
  const { loading, order, error } = orderDetails;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const setDelivered=()=>{
    
    Axios.put('/api/orders/'+props.match.params.id+'/setDelivered').then((res)=>{
      console.log(res);  
     props.history.push('/order/'+props.match.params.id)
    })
    window.location.reload(false); 
  }

  const setPaid=()=>{
    Axios.put('/api/orders/'+props.match.params.id+'/setPaid').then((res)=>{
      console.log(res); 
   
    })
    window.location.reload(false); 
  }

  return loading ? <div>Loading ...</div> : error ? <div>{error}</div> :

    <div>
      <div className="placeorder">
        <div className="placeorder-info">
          <div>
            <h3>
              Shipping
          </h3>
            <div>
              {order.shipping.address}, {order.shipping.city},
          {order.shipping.postalCode}, {order.shipping.country},
          </div>
            <div>
              {order.isDelivered ? "Delivered at "+ order.updatedAt+"" : "Not Delivered."}
            </div>
          </div>
          <div>
            <h3>Payment</h3>
            <div>
              Payment Method: {order.payment.paymentMethod}
            </div>
            <div>
            {order.isPaid ? "Paid at "+ order.updatedAt+"" : "Not Paid."}
            </div>
            <div>
            {userInfo && userInfo.isAdmin && !order.isPaid &&(
              <button className="button" style={{marginLeft:"50rem", background:"green", color:"white"}} onClick={setPaid}>
                Pay Order
              </button>
            )}
            </div>
          </div>
          <div>
            <ul className="cart-list-container">
              <li>
                <h3>
                  Shopping Cart
          </h3>
                <div>
                  Price
          </div>
              </li>
              {
                order.orderItems.length === 0 ?
                  <div>
                    Cart is empty
          </div>
                  :
                  order.orderItems.map(item =>
                    <li key={item._id}>
                      <div className="cart-image">
                        <img src={item.image} alt="product" />
                      </div>
                      <div className="cart-name">
                        <div>
                          <Link to={"/product/" + item.product}>
                            {item.name}
                          </Link>

                        </div>
                        <div>
                          Qty: {item.qty}
                        </div>
                      </div>
                      <div className="cart-price">
                        Rs.{item.price}
                      </div>
                    </li>
                  )
              }
            </ul>
          </div>


        </div>
        <div className="placeorder-action">
          <ul>
            <li className="placeorder-actions-payment">
              {loadingPay && <div>Finishing Payment...</div>}
              {/* {order.payment.paymentMethod ==='Paypal' && 
                <PaypalButton
                  amount={order.totalPrice}
                  onSuccess={handleSuccessPayment} />
              } */}
              {/* {!order.isPaid && 
                <PaypalButton
                  amount={order.totalPrice}
                  onSuccess={handleSuccessPayment} />
              } */}
            </li>
            <li>
              <h3>Order Summary</h3>
            </li>
            <li>
              <div>Items</div>
              <div>Rs.{order.itemsPrice}</div>
            </li>
            <li>
              <div>Shipping</div>
              <div>Rs.{order.shippingPrice}</div>
            </li>
            {/* <li>
              <div>Tax</div>
              <div>Rs.{order.taxPrice}</div>
            </li> */}
            <li>
              <div>Order Total</div>
              <div>Rs.{order.totalPrice}</div>
            </li>

            {userInfo && userInfo.isAdmin && !order.isDelivered && order.isPaid&&(
              <button className="button primary full-width" onClick={setDelivered}>
                Deliver Order
              </button>
            )}
          </ul>

        </div>

      </div>
    </div>

}

export default OrderScreen;