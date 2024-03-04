import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let WhistlistContext= createContext() 

export default function WhistlistContextProvider(props){
    const [firstlen, setfirstlen] = useState([])
    let headers = {
        token : localStorage.getItem('userToken')
    }

    function deletefromlist(id){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,{
            headers
        }).then((response)=> response)
        .catch((err)=>err)
    }

    function addtowhish(productId){
        return axios.post('https://ecommerce.routemisr.com/api/v1/wishlist' ,{
            productId
        },{
            headers
        })
        .then((response) => response)
        .catch((err)=> err)

    }


    function GetItems(){
        return axios.get('https://ecommerce.routemisr.com/api/v1/wishlist',{
            headers
        })
        .then((response)=>{
            console.log(response);
            return response})
        .catch((err)=> err)
        // console.log("hello");
    }


    async function getnums(){
        const {data} = await GetItems()
        setfirstlen(data?.data.length)
    }


    useEffect(()=>{
        getnums()
    },[])




    return <WhistlistContext.Provider value={{addtowhish,GetItems,deletefromlist ,firstlen,setfirstlen , name:"abndallaj"}}>
            {props.children}
    </WhistlistContext.Provider>
}