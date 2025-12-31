import { useRef, useState } from "react";

export default function InventoryMinimum(props:{
            code:string,
            current:number,
            unit:string,
        })
    {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [saving, setSaving] = useState(false);
    
    async function handleClick(){
        if(!inputRef.current) return;
        setSaving(true);
        const url = `${import.meta.env.VITE_BACKEND_URL}/product/${props.code}`
        const res = await fetch(url, {
            method:'PUT',
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                minimum:inputRef.current.value
            })
        })
        setSaving(false)
        if(res.ok){
            console.info("Successful change!")
        } else {
            alert("Error")
        }
        
    }



    return (
        <>
            <label>Minimum inventory quantity</label>
            <input min={1} className="text-right w-20" ref={inputRef} defaultValue={props.current} type="number"/>{props.unit}
            <button className="bg-black text-white rounded p-1 ml-5 cursor-pointer" disabled={saving} onClick={handleClick}>Save</button>
        </>
    )
}