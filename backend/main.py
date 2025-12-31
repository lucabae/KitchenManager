import requests
from flask import Flask, Response, request, jsonify
from flask_cors import CORS

from functions.addQuantity import addQuantity
from functions.getAllProducts import getAllProducts
from functions.getProduct import getProduct
from functions.getShoppingList import getShoppingList
from functions.insertProduct import insertProduct
from functions.modifyColumn import modifyColumn

app = Flask(__name__)
CORS(app)

@app.route("/product/<int:code>", methods=['GET', 'POST', 'PUT', 'DELETE'])
def product(code):
    if request.method == 'GET':
        product_obj = getProduct(code)

        #if product is not in db, save it
        if product_obj is None:
            req = requests.get(f"https://world.openfoodfacts.org/api/v2/product/{code}.json")
            if not req.ok:
                return Response(status=404)
            json = req.json()

            if json['status'] != 1:
                return Response(status=404)

            product = json["product"]

            res = {
                "image": product["image_url"],
                "quantity_per_item": float(product["product_quantity"]),
                "category": product["categories"],
                "unit": product["product_quantity_unit"],
                "name": product["product_name"],
                "code":code,
            }

            insertProduct(res["name"], res["category"], code, res["unit"], 0, 0, res["quantity_per_item"], res["image"])
            res["inventory_quantity"] = 0
            res["inventory_minimum"] = 0
        # just return
        else:
            res = product_obj
        return jsonify(res)

    if request.method == 'POST':
        addQuantity(code)
        return Response(status=204)

    if request.method == 'DELETE':
        addQuantity(code, sum=False)
        return Response(status=204)
    if request.method == 'PUT':
        try:
            minimum = int(request.json["minimum"])
        except:
            return Response(status=400)

        if minimum < 0:
            return Response(status=400)

        modifyColumn(code, "inventory_minimum", minimum)
        return Response(status=204)

@app.route("/inventory", methods=['GET'])
def inventory():
    return getAllProducts()

@app.route("/shopping-list", methods=['GET'])
def shoppingList():
    return getShoppingList()

if __name__ == "__main__":
    app.run(debug=True)