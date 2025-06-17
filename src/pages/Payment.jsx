import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const icons = {
  visa: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 40" width="40" height="25" fill="#1a1f71">
      <rect width="64" height="40" rx="6" ry="6" fill="#1a1f71" />
      <text x="32" y="27" fontSize="20" fill="white" fontWeight="bold" fontFamily="Arial" textAnchor="middle">
        VISA
      </text>
    </svg>
  ),
  mastercard: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 40" width="40" height="25">
      <circle cx="24" cy="20" r="16" fill="#eb001b" />
      <circle cx="40" cy="20" r="16" fill="#f79e1b" />
    </svg>
  ),
  paypal: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 40" width="40" height="25" fill="#003087">
      <rect width="64" height="40" rx="6" ry="6" fill="#003087" />
      <text x="32" y="27" fontSize="18" fill="white" fontWeight="bold" fontFamily="Arial" textAnchor="middle">
        PayPal
      </text>
    </svg>
  ),
  alipay: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 40" width="40" height="25" fill="#0090ff">
      <rect width="64" height="40" rx="6" ry="6" fill="#0090ff" />
      <text x="32" y="27" fontSize="18" fill="white" fontWeight="bold" fontFamily="Arial" textAnchor="middle">
        Alipay
      </text>
    </svg>
  ),
  koko: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 40" width="40" height="25" fill="#5b2e97">
      <rect width="64" height="40" rx="6" ry="6" fill="#5b2e97" />
      <text x="32" y="27" fontSize="18" fill="white" fontWeight="bold" fontFamily="Arial" textAnchor="middle">
        Koko
      </text>
    </svg>
  ),
};

const dummyCards = {
  visa: {
    cardNumber: '4485275742308327',
    expiry: '09/27',
    cvv: '789',
    name: 'Isuru Warnakula',
  },
  mastercard: {
    cardNumber: '5301250070000193',
    expiry: '08/24',
    cvv: '321',
    name: 'Isuru Warnakula',
  },
  paypal: {
    email: 'isuru.warnakula@example.com',
  },
  alipay: {
    userId: 'isuru_alipay_987',
  },
  koko: {
    account: 'koko_acc_789',
  },
};

const methodNames = {
  visa: 'Visa',
  mastercard: 'MasterCard',
  paypal: 'PayPal',
  alipay: 'Alipay',
  koko: 'Koko',
};

function PaymentPage() {
  const { id: bookingId } = useParams();
  const [paymentMethod, setPaymentMethod] = useState('visa');
  const [cardDetails, setCardDetails] = useState(dummyCards.visa);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const amount = 150.0;

  useEffect(() => {
    setCardDetails(dummyCards[paymentMethod]);
  }, [paymentMethod]);

  const handleChange = (e) => {
    setPaymentMethod(e.target.value);
    setMessage(null);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setCardDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setMessage(null);

    if (!bookingId) {
      setMessage({ type: 'error', text: 'Missing Booking ID. Cannot proceed with payment.' });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/api/payment/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          razorpay_order_id: 'dummy_order_id',
          razorpay_payment_id: 'dummy_payment_id_' + Date.now(),
          razorpay_signature: 'dummy_signature',
          bookingId,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: '✅ Payment Verified & Booking Updated!' });
      } else {
        setMessage({ type: 'error', text: '❌ Payment Failed: ' + (data.message || 'Unknown error') });
      }
    } catch (error) {
      console.error('Payment error:', error);
      setMessage({ type: 'error', text: '❌ Network Error. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

   return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 flex items-start justify-center p-8 font-sans">
      <div className="bg-white w-full max-w-md rounded-xl shadow-2xl p-8
                      ring-1 ring-gray-300
                      hover:shadow-3xl
                      transition-shadow duration-500 ease-in-out">
        <h2 className="text-3xl font-extrabold mb-8 text-gray-900 tracking-wide text-center">
          Payment
        </h2>

        <div className="mb-6">
          <p className="font-semibold mb-4 text-gray-900 text-lg">Select Payment Method:</p>
          <div className="flex gap-8 flex-wrap justify-center">
            {Object.keys(icons).map((method) => (
              <label
                key={method}
                className={`
                  relative flex flex-col items-center gap-2 cursor-pointer
                  px-4 py-3 rounded-lg
                  transition-colors duration-300
                  ${paymentMethod === method ? 'bg-green-50 ring-2 ring-green-500' : 'hover:bg-gray-100'}
                `}
              >
                <input
                  type="radio"
                  name="method"
                  value={method}
                  checked={paymentMethod === method}
                  onChange={handleChange}
                  className="sr-only"
                />
                <div className="w-12 h-8">{icons[method]}</div>
                <span
                  className={`text-sm font-semibold 
                    ${paymentMethod === method ? 'text-green-700' : 'text-gray-700'}
                  `}
                >
                  {methodNames[method]}
                </span>
                {/* Custom circle indicator */}
                <span
                  className={`
                    absolute top-2 right-2 w-4 h-4 rounded-full border-2
                    ${paymentMethod === method ? 'bg-green-500 border-green-500' : 'border-gray-300'}
                    transition-colors duration-300
                  `}
                />
              </label>
            ))}
          </div>
        </div>

        {/* CARD FIELDS */}
        {(paymentMethod === 'visa' || paymentMethod === 'mastercard') && (
          <div className="space-y-5 mb-6 text-gray-900 text-sm">
            <div>
              <label className="block font-medium mb-2">Card Number</label>
              <input
                type="text"
                name="cardNumber"
                maxLength={16}
                value={cardDetails.cardNumber || ''}
                onChange={handleInput}
                placeholder="Enter card number"
                className="w-full p-3 border border-gray-300 rounded-lg
                           shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500
                           transition duration-300"
              />
            </div>

            <div className="flex gap-5">
              <div className="w-1/2">
                <label className="block font-medium mb-2">Expiration</label>
                <input
                  type="text"
                  name="expiry"
                  maxLength={5}
                  value={cardDetails.expiry || ''}
                  onChange={handleInput}
                  placeholder="MM/YY"
                  className="w-full p-3 border border-gray-300 rounded-lg
                             shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500
                             transition duration-300"
                />
              </div>
              <div className="w-1/2">
                <label className="block font-medium mb-2">CVV</label>
                <input
                  type="password"
                  name="cvv"
                  maxLength={3}
                  value={cardDetails.cvv || ''}
                  onChange={handleInput}
                  placeholder="***"
                  className="w-full p-3 border border-gray-300 rounded-lg
                             shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500
                             transition duration-300"
                />
              </div>
            </div>

            <div>
              <label className="block font-medium mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={cardDetails.name || ''}
                onChange={handleInput}
                placeholder="Cardholder name"
                className="w-full p-3 border border-gray-300 rounded-lg
                           shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500
                           transition duration-300"
              />
            </div>
          </div>
        )}

        {/* Other Method Inputs */}
        {paymentMethod === 'paypal' && (
          <div className="mb-6">
            <label className="block font-medium mb-2 text-sm">PayPal Email</label>
            <input
              type="email"
              name="email"
              value={cardDetails.email || ''}
              onChange={handleInput}
              placeholder="you@example.com"
              className="w-full p-3 border border-gray-300 rounded-lg
                         shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500
                         transition duration-300"
            />
          </div>
        )}

        {paymentMethod === 'alipay' && (
          <div className="mb-6">
            <label className="block font-medium mb-2 text-sm">Alipay User ID</label>
            <input
              type="text"
              name="userId"
              value={cardDetails.userId || ''}
              onChange={handleInput}
              placeholder="Alipay ID"
              className="w-full p-3 border border-gray-300 rounded-lg
                         shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500
                         transition duration-300"
            />
          </div>
        )}

        {paymentMethod === 'koko' && (
          <div className="mb-6">
            <label className="block font-medium mb-2 text-sm">Koko Account</label>
            <input
              type="text"
              name="account"
              value={cardDetails.account || ''}
              onChange={handleInput}
              placeholder="Koko account ID"
              className="w-full p-3 border border-gray-300 rounded-lg
                         shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500
                         transition duration-300"
            />
          </div>
        )}

        <p className="mb-6 font-semibold text-gray-900 text-lg text-center">
          Amount to Pay ($): <span className="text-green-700">{amount.toFixed(2)}</span>
        </p>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`
            w-full py-3 rounded-xl text-white font-extrabold text-lg
            bg-green-600 hover:bg-green-700 active:scale-95
            shadow-lg hover:shadow-xl
            transition-transform duration-200 ease-in-out
            ${loading ? 'bg-gray-400 cursor-not-allowed shadow-none hover:shadow-none' : ''}
          `}
        >
          {loading ? 'Processing...' : 'Pay Now'}
        </button>

        {message && (
          <p
            className={`mt-6 font-semibold text-center text-lg
              ${message.type === 'success' ? 'text-green-600' : 'text-red-600'}`}
          >
            {message.text}
          </p>
        )}
      </div>
    </div>
  );
}

export default PaymentPage;
