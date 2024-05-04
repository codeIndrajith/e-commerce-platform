import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { DotLoader } from 'react-spinners';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import {
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPayPalClientIdQuery,
} from '../slices/ordersApiSlice';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Alert } from '@material-tailwind/react';

const OrderScreen = () => {
  const { id: orderId } = useParams();
  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();

  const queryResult = useGetPayPalClientIdQuery();
  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = typeof queryResult === 'object' ? queryResult : {};

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal.clientId) {
      const loadPaypalScript = async () => {
        paypalDispatch({
          type: 'resetOptions',
          value: {
            'client-id': paypal.clientId,
            currency: 'USD',
          },
        });
        paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
      };
      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPaypalScript();
        }
      }
    }
  }, [errorPayPal, loadingPayPal, order, paypal, paypalDispatch]);

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details });
        refetch();
        toast.success('Payment successfull');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    });
  }

  async function onApproveTest() {
    await payOrder({ orderId, details: { payer: {} } });
    refetch();
    toast.success('Payment successfull');
  }

  function onError(err) {
    toast.error(err.message);
  }

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: order.totalPrice },
          },
        ],
      })
      .then((orderId) => {
        return orderId;
      });
  }

  return isLoading ? (
    <DotLoader />
  ) : error ? (
    <Alert color="blue">{error?.data?.message || error.error}</Alert>
  ) : (
    <div className="w-full h-screen">
      <h1>Order ID {order._id}</h1>

      <div className="max-w-full flex items-center flex-col md:flex-row gap-3 p-3 justify-between">
        {/* One column */}
        <div className="max-w-full flex items-center flex-col md:flex-row gap-3 p-3 justify-between">
          <div className="flex flex-col w-full">
            <div>
              <h2 className="font-bold uppercase text-center bg-orange-400 p-2 rounded-md">
                Shipping
              </h2>
              <p className="text-[18px]">
                <strong>Name</strong> {order.user.name}
              </p>
              <p className="text-[18px]">
                <strong>Email</strong> {order.user.email}
              </p>
              <p className="text-[18px]">
                <strong>Address</strong> {order.shippingAddress.address}{' '}
                {order.shippingAddress.city} {order.shippingAddress.postalCode},
                {order.shippingAddress.country}{' '}
              </p>
              {order.isDelivered ? (
                <Alert color="green">Delivered on {order.deliveredAt}</Alert>
              ) : (
                <Alert color="red">Not Delivered</Alert>
              )}
            </div>

            <div>
              <h2>Payment Method</h2>
              <p>
                <strong>Method</strong> {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Alert color="blue">Paid on {order.paidAt}</Alert>
              ) : (
                <Alert color="blue">Not Paid</Alert>
              )}
            </div>

            <div>
              <h2>Order Items</h2>
              {order.orderItems.map((item, index) => (
                <div>
                  <div>
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                    <div>
                      {item.qty} x {item.price} = ${item.qty * item.price}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Two column */}
        <div className=" w-full md:w-1/4 h-screen">
          <div>
            <div class="bg-gray-900 text-white p-4 rounded-lg shadow-lg">
              <h2 class="text-2xl font-bold text-center mb-4">Order Summary</h2>
              <div class="flex flex-col gap-2">
                <div class="flex justify-between">
                  <h5>Item</h5>
                  <div>${order.itemPrice}</div>
                </div>

                <div class="flex justify-between">
                  <h5>Shipping</h5>
                  <div>${order.shippingPrice}</div>
                </div>

                <div class="flex justify-between">
                  <h5>Tax</h5>
                  <div>${order.taxPrice}</div>
                </div>

                <div class="flex justify-between">
                  <h5>Total</h5>
                  <div>${order.totalPrice}</div>
                </div>

                <div>
                  {!order.isPaid && (
                    <div>
                      {loadingPay && <DotLoader />}

                      {isPending ? (
                        <DotLoader />
                      ) : (
                        <div>
                          <button onClick={onApproveTest}>
                            Test Pay Order
                          </button>
                          <div>
                            <PayPalButtons
                              createOrder={createOrder}
                              onApprove={onApprove}
                              onError={onError}
                            ></PayPalButtons>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div class="text-red-500">{error && <p>{error}</p>}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderScreen;
