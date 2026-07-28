"use client";

import { useState } from "react";


export default function PurchaseButton({
sku
}:{
sku:string
}){


const [loading,setLoading]=useState(false);


async function buy(){


setLoading(true);


const response = await fetch(
"/api/checkout",
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
product_sku:sku
})
}
);


const data = await response.json();


if(data.url){

window.location.href=data.url;

}


}


return(

<button

onClick={buy}

className="
bg-[#E8002D]
hover:bg-red-700
px-6
py-3
rounded-lg
font-bold
"

>

{
loading
?
"Loading..."
:
"Buy Now"
}

</button>


)

}