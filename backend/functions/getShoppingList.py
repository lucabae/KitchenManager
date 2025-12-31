import os
import sqlite3
from pathlib import Path

from serializer.ProductSerializer import ProductSerializer


def getShoppingList() -> dict:
    path = os.path.join(Path(__file__).parent.parent, "sqlite3.db")
    con = sqlite3.connect(path)
    cur = con.cursor()

    cur.execute("select * from products where inventory_minimum > inventory_quantity;")

    items = cur.fetchall()

    con.commit()
    con.close()

    return ProductSerializer(items, many=True)