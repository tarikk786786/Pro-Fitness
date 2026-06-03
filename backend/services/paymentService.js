exports.createCheckoutSession = async (req, res) => {
    // Mock Stripe checkout
    return { id: "cs_test_mock123", url: "https://checkout.stripe.com/mock" };
};
