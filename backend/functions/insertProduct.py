import sqlite3
import os
from pathlib import Path
def insertProduct(name, category, code, unit, inventory_quantity, inventory_minimum, quantity_per_item, image) -> None:
    path = os.path.join(Path(__file__).parent.parent, "sqlite3.db")
    con = sqlite3.connect(path)
    cur = con.cursor()

    product_insertion_query = f"""
    INSERT INTO PRODUCTS (name, category, code, unit, inventory_quantity, inventory_minimum, quantity_per_item, image)
    VALUES ('{name}', '{category}', '{code}', '{unit}', '{inventory_quantity}', '{inventory_minimum}', '{quantity_per_item}', '{image}');
    """

    cur.execute(product_insertion_query)
    con.commit()
    con.close()

