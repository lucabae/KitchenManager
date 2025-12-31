import os
import sqlite3
from pathlib import Path


def getProductColumn(code, column):
    path = os.path.join(Path(__file__).parent.parent, "sqlite3.db")
    con = sqlite3.connect(path)
    cur = con.cursor()

    cur.execute(f"SELECT {column} FROM products WHERE code = '{code}'")

    amount = cur.fetchone()[0]

    con.close()
    return amount