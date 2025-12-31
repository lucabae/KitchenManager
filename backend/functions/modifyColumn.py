import os
import sqlite3
from pathlib import Path


def modifyColumn(code, column, new_value) -> None:
    path = os.path.join(Path(__file__).parent.parent, "sqlite3.db")
    con = sqlite3.connect(path)
    cur = con.cursor()

    cur.execute(f"UPDATE products SET {column} = '{new_value}' WHERE code = '{code}'")
    con.commit()
    con.close()