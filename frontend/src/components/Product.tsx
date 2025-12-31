import type ProductInterface from "../types/ProductInterface";
import InventoryModify from "./InventoryModify";
import InventoryMinimum from "./InventoryMinimum";
import { useState } from "react";


export default function Product(props:{product:ProductInterface, modifiable:boolean, shoppingListMode?:boolean}) {
    const [inventoryQuantity, setInventoryQuantity] = useState(props.product.inventory_quantity)
    
    return (
        <>
            <div className="text-center ">
                <h2 className="font-bold text-3xl">
                    {props.product.name} - {props.product.category}
                </h2>
                <p className="text-2xl">
                    {
                        `${props.product.quantity_per_item} ${props.product.unit}`
                    }
                </p>
                <img className="m-auto" src={props.product.image}/>
                

                <p>
                    You currently have {inventoryQuantity}{props.product.unit} of this product.
                </p>

                {
                    props.shoppingListMode && (
                        <>
                            You have to buy {props.product.inventory_minimum - props.product.inventory_quantity}{props.product.unit} of it
                        </>
                    )
                }

                {
                    props.modifiable && (
                        <>
                            <InventoryModify inventoryQuantity={inventoryQuantity} setInventoryQuantity={setInventoryQuantity} product={props.product} sum={true}/>
                            <br/>
                            <InventoryModify inventoryQuantity={inventoryQuantity} setInventoryQuantity={setInventoryQuantity} product={props.product} sum={false}/>
                            <br/>
                            <InventoryMinimum code={props.product.code} unit={props.product.unit} current={props.product.inventory_minimum}/>
                        </>
                    )
                }
            </div>

        </>
    )
}