import os
import sqlite3
from pathlib import Path
from serializer.ProductSerializer import ProductSerializer


def getAllProducts() -> dict:
    path = os.path.join(Path(__file__).parent.parent, "sqlite3.db")
    con = sqlite3.connect(path)
    cur = con.cursor()

    query = f"""
        SELECT * FROM products;
    """

    cur.execute(query)

    products = cur.fetchall()

    con.close()

    return ProductSerializer(products, many=True)