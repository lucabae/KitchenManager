from functions.getProduct import getProduct
from functions.modifyColumn import modifyColumn


def addQuantity(code, sum=True) -> None:
    product_obj = getProduct(code)
    if product_obj is None: return
    if sum:
        modifyColumn(code, "inventory_quantity", product_obj["inventory_quantity"] + product_obj["quantity_per_item"])
    else:
        if product_obj["inventory_quantity"] >= product_obj["quantity_per_item"]:
            modifyColumn(code, "inventory_quantity", product_obj["inventory_quantity"] - product_obj["quantity_per_item"])
