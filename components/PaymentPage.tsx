"use client";

import Script from "next/script";
import { useState } from "react";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export const PaymentPage = () => {
  const AMOUNT = 100;
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    setIsProcessing(true);
    try {
      const responseFromRazorPay = await fetch("/api/razorpay", {
        method: "POST",
      });

      const dataFromRazorPay = await responseFromRazorPay.json();

      const options = {
        key: process.env.RAZORPAY_PAY_KEY,
        amount: AMOUNT * 100,
        currency: "INR",
        order_id: dataFromRazorPay.orderId,
        name: "Shreyas Technologies",
        description: "Testing Razorpay",
        handler: function (response: any) {
          console.log("Payment Successfull", response);
          //Handle Update UI
        },
        prefill: {
          name: "Shreyas Technologies",
          email: "test@email.com",
          conatact: "+910000000000",
        },
        theme: {
          color: "#3399cc",
        },
      };
      const razorPay = new window.Razorpay(options);
      razorPay.open();
    } catch (error) {
      console.log("Payment Failed", error);
    } finally {
      setIsProcessing(false);
    }
  };
  return (
    <div>
      <Script src="http://checkout.razorpay.com/v1/checkout.js" />
      <div>
        <h1>PAYMENT PAGE</h1>
        <p>Amount to be Paid: {AMOUNT}</p>
        <button onClick={handlePayment} disabled={isProcessing}>
          {isProcessing ? "Processing" : "PAY NOW"}
        </button>
      </div>
    </div>
  );
};
