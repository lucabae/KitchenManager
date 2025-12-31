import { useEffect, useState } from "react";
import type ProductInterface from "../types/ProductInterface";
import Product from "../components/Product";

export default function Inventory(){
    const [inventory, setInventory] = useState<Array<ProductInterface>|null>(null);
    

    async function getInventory(){
        const url = `${import.meta.env.VITE_BACKEND_URL}/inventory`;
        const res = await fetch(url);
        if(res.ok){
            let json:Array<ProductInterface> = await res.json();
            setInventory(json)
        }
    }

    useEffect(()=>{
        getInventory();
    }, [])
    
    return (
        <>
            <h1>Inventory</h1>
            {
                inventory ? (
                    <>
                        {
                            inventory.map((product)=>(
                                <>
                                    {
                                        product.inventory_quantity != 0 && (
                                            <>
                                                <Product product={product} modifiable={true}/>
                                            </>
                                        )
                                    }
                                </>
                            ))
                        }
                    </>
                ) : (
                    <>Loading...</>
                )
            }
        </>
    )
}