import {Html5QrcodeSupportedFormats, Html5QrcodeScanner } from "html5-qrcode";
import { memo, useEffect, useState } from "react";
import type ProductInterface from "../types/ProductInterface";
import Product from "../components/Product";


function Scanner(){
    const [currentProduct, setCurrentProduct] = useState<ProductInterface|null>(null);
    

    const config = {
            fps: 30, 
            qrbox: {width: 250, height: 250},
            formatsToSupport:[
                Html5QrcodeSupportedFormats.CODE_39,
                Html5QrcodeSupportedFormats.CODE_128,
                Html5QrcodeSupportedFormats.EAN_13,
                Html5QrcodeSupportedFormats.UPC_A,
            ],
            disableFlip:false,
        }

    async function getProduct(code:string):Promise<boolean>{
        console.log(code);
        console.log(`${import.meta.env.VITE_BACKEND_URL}/product/${code}`)
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/product/${code}`, {
            method:"GET"
        })

        if(res.ok){
            console.log(res)
            let json = await res.json()
            setCurrentProduct({
                ...json,
                code:code
            });
            
            return true;
        } else {
            alert("Product not found. Please try again.")
            return false;
        }

    }

    useEffect(()=>{
        function onScanFailure(error:string) {
            console.error(`Error while scanning: ${error}`);
        }

        let html5QrcodeScanner = new Html5QrcodeScanner(
        "reader",
        config,
        false);
        html5QrcodeScanner.render(async (decodedText)=>{
            const success = await getProduct(decodedText);
            if(success){
                html5QrcodeScanner.clear();
            }
        }, onScanFailure);
    }, [])

    return ( 
        <>
            <h1>Scanner</h1>
            <div id="reader" className="w-600px"></div>

            {
                currentProduct && (
                    <>
                        <Product
                            product={currentProduct}
                            modifiable={true}
                        />

                    </>
                )
            }
        </>
    )
}

export default memo(Scanner);