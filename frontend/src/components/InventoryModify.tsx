import type { Dispatch, SetStateAction } from "react";
import type ProductInterface from "../types/ProductInterface";

export default function InventoryModify(props:{
    product:ProductInterface,
    sum:boolean,
    setInventoryQuantity:Dispatch<SetStateAction<number>>,
    inventoryQuantity:number
}) {


    async function modify(){
        if(!props.sum && props.inventoryQuantity - props.product.quantity_per_item < 0){
            return;
        }
        const url = `${import.meta.env.VITE_BACKEND_URL}/product/${props.product.code}`
        const res = await fetch(
            url, {
                method: props.sum ? "POST" : "DELETE"
            }
        )

        if(res.ok){
            props.setInventoryQuantity(
                (prev) => {
                    if(props.sum){
                        return prev + props.product.quantity_per_item
                    } else {
                        return prev - props.product.quantity_per_item
                    }
                }
            )
        } else {
            alert("Error")
        }
    }

    return (
        <>
        
            <button onClick={modify} className="bg-black text-white p-1 rounded m-1 cursor-pointer">
                {props.sum ? "Add" : "Remove"} {props.product.quantity_per_item}{props.product.unit} {props.sum ? "to" : "from"} inventory
            </button>
        </>
    )
}