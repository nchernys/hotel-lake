const PaymentSuccess = () => {
  return (
    <div className="w-full flex flex-col items-center py-[10rem]">
      <h2 className="text-5xl">Thank you!</h2>
      <p className="text-2xl my-3 text-center">
        Your order has been submitted successfully!
      </p>
      <p>
        <img
          className="w-12 h-12"
          src="https://img.icons8.com/ios/100/checked--v1.png"
          alt="checked--v1"
        />{" "}
      </p>
    </div>
  );
};

export default PaymentSuccess;
