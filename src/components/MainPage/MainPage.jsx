import "./MainPage.css";
import axios from "axios";
import { useEffect, useState } from "react";

const MainPage = () => {
  const [amount, setAmount] = useState(0);
  const [purchases, setPurchases] = useState([]);

  function buyNow() {
    // Logic for buying the product
    console.log(`Buying ${amount} Zamzam 100ml bottles`);
    console.log("Total cost: £" + amount * 1.0); // Assuming each bottle costs £1.00
  }

  useEffect(() => {
    // Fetching product data from the backend (if needed)
    const fetchRecentPurchases = async () => {
      try {
        const response = await axios.get(
          "https://e-commerce-stripe-backend.onrender.com/purchases"
        );
        // Assuming the response contains an array of purchases
        setPurchases(response.data);
        console.log("Purchases data:", response.data);
      } catch (error) {
        console.error("Error fetching purchases data:", error);
      }
    };
    fetchRecentPurchases();
  }, []);

  return (
    <>
      <div className="main-page">
        <img
          className="zamzam-image"
          src="/images/zamzam_100ml.jpg"
          alt="ZamZam Logo"
        />
        <div>
          <h1>Zamzam 100ml</h1>
          <p>
            Zamzam water is a sacred water from the Zamzam well in Mecca, Saudi
            Arabia. It is known for its purity and spiritual significance in
            Islamic tradition. The well has been a source of water for over
            2,000 years and is believed to have miraculous properties.
          </p>
          <input
            type="number"
            className="quantity-input"
            placeholder="Enter quantity"
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
            min="0"
          />
          <p className="price">Price: £1.00 each</p>
          <button className="buy-button" onClick={buyNow}>
            Buy Now
          </button>
        </div>
      </div>
      <div>
        <h2>Recent Purchases</h2>
        {purchases.length > 0 ? (
          <ol className="purchases-list">
            {purchases.map((purchase, index) => (
              <li key={index} className="purchase-item">
                <p>
                  <strong>Quantity:</strong> {purchase.quantity} bottle{" "}
                  {purchase.quantity === 1 ? "" : "s"}
                </p>
                <p>
                  <strong>Total Cost:</strong> £{purchase.quantity * 1.0}.00
                </p>
                <p>
                  <strong>Date of Purchase:</strong>{" "}
                  {new Date(purchase.created_at).toLocaleString()}
                </p>
              </li>
            ))}
          </ol>
        ) : (
          <p>No purchases made yet.</p>
        )}
      </div>
    </>
  );
};

export default MainPage;
