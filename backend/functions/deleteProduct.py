import os
import sqlite3
from pathlib import Path

def deleteProduct(code) -> None:
    path = os.path.join(Path(__file__).parent.parent, "sqlite3.db")
    con = sqlite3.connect(path)
    cur = con.cursor()

    query = f"""
        DELETE FROM products WHERE code = '{code}';
    """

    cur.execute(query)
    con.commit()

    con.close()