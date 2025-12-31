import os
import sqlite3
from pathlib import Path

from serializer.ProductSerializer import ProductSerializer

def getProduct(code) -> dict:
    path = os.path.join(Path(__file__).parent.parent, "sqlite3.db")
    con = sqlite3.connect(path)
    cur = con.cursor()

    query = f"""
        SELECT * FROM products WHERE code = '{code}';
    """

    cur.execute(query)

    product = cur.fetchone()

    con.close()

    return ProductSerializer(product)