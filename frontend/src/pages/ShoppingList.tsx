import { useEffect, useState } from "react"
import type ProductInterface from "../types/ProductInterface"
import Product from "../components/Product"

export default function ShoppingList(){
    const [shoppingList, setShoppingList] = useState<Array<ProductInterface>|null>(null)

    async function getShoppingList(){
        const url = `${import.meta.env.VITE_BACKEND_URL}/shopping-list`
        const res = await fetch(url,
            {
                method:"GET"
            }
        )

        if(res.ok){
            const json:Array<ProductInterface> = await res.json()
            console.log(json)
            setShoppingList(json)
        } else {
            alert("Error")
        }
    }

    useEffect(()=>{
        getShoppingList()
    }, [])


    return (
        <>
            <h1>Shopping List</h1>
            {
                shoppingList?.map(product => (
                    <Product product={product} modifiable={false} shoppingListMode={true}/>
                ))
            }
        </>
    )
}