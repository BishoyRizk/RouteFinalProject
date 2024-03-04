import axios from "axios";
import { useEffect } from "react";
import { createContext, useState } from "react";

export let CartContext = createContext()


export default function CartContextProvider (props){
    let [numberOfCartItems,setnumberOfCartItems]=useState();

    async function getnums(){
        const {data} = await GetCartItems()
        setnumberOfCartItems(data?.numOfCartItems)
    }
    
    useEffect(()=>{
        getnums()
    },[])
    
    let headers = {
        token : localStorage.getItem('userToken')
    }
    function addtocart(productId){
        return axios.post('https://ecommerce.routemisr.com/api/v1/cart',{
            productId
        },{
            headers
        })
        .then((response) => response)
        .catch((err)=> err)
    }
    function CheckOutSession(cartId,shippingAddress){
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,{
            shippingAddress
        },{
            headers
        })
        .then((response) => response)
        .catch((err)=> err)
    }



    function GetCartItems(){
        return axios.get('https://ecommerce.routemisr.com/api/v1/cart',{
            headers
        })
        .then((response) => response)
        .catch((err)=> err)
    }



    function deleteCartItems(productId){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
            headers
        })
        .then((response) => response)
        .catch((err)=> err)
    }


    function updateCartItems(productId,count){
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
             count   
        },{
            headers
        })
        .then((response) => response)
        .catch((err)=> err)
    }


  


    return <CartContext.Provider value={{addtocart,GetCartItems,deleteCartItems,updateCartItems,CheckOutSession,numberOfCartItems ,setnumberOfCartItems}}>
        {props.children}
    </CartContext.Provider>
}