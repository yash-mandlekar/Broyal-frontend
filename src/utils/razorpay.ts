// Razorpay SDK Utilities

/**
 * Load Razorpay SDK script dynamically
 * @returns Promise that resolves when script is loaded
 */
export const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    // Check if script is already loaded
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

/**
 * Display Razorpay payment modal
 * @param options Razorpay payment options
 * @returns Razorpay instance
 */
export const displayRazorpay = async (options: any): Promise<any> => {
  const isLoaded = await loadRazorpayScript();

  if (!isLoaded) {
    throw new Error("Razorpay SDK failed to load");
  }

  const razorpay = new window.Razorpay(options);
  razorpay.open();
  return razorpay;
};
