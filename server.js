require('dotenv').config()


const express = require('express');
const privatekey= 'sk_test_51IrW83H6Eled2mMIAhMwKYEtg6ePf8ZPB7dgagrppaoKCFg1wL43FbKHJcVDbTEexURgCqv9ZRDPbuYMTIgQGIiV00WeIXgMnx'

const stripe = require('stripe')(process.env.SECRET_KEY)






const app = express();
const PORT = process.env.PORT || 3005;

app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'))


app.get('/store',(req,res)=>{
    res.json({code:publickey})
})


app.post("/purchase",(req,res)=>{
    console.log("purchase request received",req.body.token);

    stripe.charges.create({
        amount:parseInt(req.body.total) * 100,
        source:req.body.token,
        currency:'usd'
    })
    .then(response=>{
        console.log('Charge was successful',response);
        res.json({msg:"Charge was successful"})
    })
    .catch(err=>{
        console.log(err)
        console.log("Payment error")
        res.json({msg:"There was a payment error! :("})
    })

})





app.listen(PORT,console.log(`Logged onto port ${PORT}`))
