const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

exports.createCheckoutSession = async (req, res) => {
    try{
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                  price_data: {
                    currency: 'usd',
                    product_data: {
                      name: 'Stubborn Attachments',
                      images: ['https://i.imgur.com/EHyR2nP.png'],
                    },
                    unit_amount: 2000,
                  },
                  quantity: 1,
                },
            ],
            mode: "payment",
            success_url: `http://localhost:8080/api/v1/checkout?success=true`,
            cancel_url: `http://localhost:8080/api/v1/checkout?canceled=true`,
          });
          res.json({ id: session.id });
    } catch(err){
        res.send("ERROR ",err)
    }
  
};
