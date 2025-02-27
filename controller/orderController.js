// import userModel from "../models/userModel";
import  { Stripe } from "stripe";


const stripe= new Stripe(process.env.STRIPE_SECRET);
// ('sk_test_51QvH3CG0tAv7rrd7rjhcpXewzG0aPpRSewaUP70NO9wzWinOAv7XFWDi0PUpcK0w0UxmZ86dWMdVRvqLckbTrCF600noyF0IU5')
const placeOrder=async (req,res)=>{
    console.log('place order function is working')
    const product=await stripe.products.create({
        name:"Product1"
    })
    if(product){
        var price=await stripe.prices.create({
            product:`${product.id}`,
            unit_amount: 100 * 100,
            currency:'Rs',
        })
    }
    if(price.id){
        var session=await stripe.checkout.sessions.create({
            line_items: [
                {
                    price: `${price.id}`,
                    quantity:1,

                }
            ],
            mode:'payment',
            success_url: 'http://localhost:4000/success',
            cancel_url: 'http://localhost:4000/cancel',
            customer_email:'demo@gmail.com'

        })
    }
    res.json(session)
}

export  default placeOrder
