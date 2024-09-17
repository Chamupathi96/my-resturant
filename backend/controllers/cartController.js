import userModel from './../models/userModel.js';

// add items to user cart
const addToCart =async (req,res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId] = 1
        }
        else{
            cartData[req.body.itemId] += 1
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
           res.json({success:true,message: "Added To Cart"});
    } catch (error) {
          console.log(error);
          res.json({success:false,message:"Error"})

    }
}


//remove items from user cart
const removeFromCart = async(req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;

        // Check if the item exists in the cart
        if (cartData[req.body.itemId]) {
            // Decrease the quantity
            cartData[req.body.itemId] -= 1;

            // If the quantity reaches 0, remove the item from the cart
            if (cartData[req.body.itemId] <= 0) {
                delete cartData[req.body.itemId];
            }

            // Update the user's cart in the database
            await userModel.findByIdAndUpdate(req.body.userId, { cartData });
            res.json({ success: true, message: "Removed From Cart" });
        } else {
            res.json({ success: false, message: "Item not found in cart" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

//fetch user cart data
const getCart = async (req,res) => {
   try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        res.json({success:true,cartData})
   } catch (error) {
       console.log(error);
       res.json({success:false,message:"Error"})
   }
}

export {addToCart,removeFromCart,getCart}