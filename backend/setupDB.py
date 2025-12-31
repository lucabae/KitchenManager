import sqlite3

def main():
    con = sqlite3.connect('sqlite3.db')
    cur = con.cursor()
    cur.execute("DROP TABLE IF EXISTS PRODUCTS")

    table_creation_query = """
        CREATE TABLE PRODUCTS (
            name VARCHAR(255) NOT NULL,
            category VARCHAR(255) NOT NULL,
            code VARCHAR(20),
            unit VARCHAR(20),
            inventory_quantity INT,
            inventory_minimum INT,
            quantity_per_item INT,
            image VARCHAR(255)
        );
    """

    cur.execute(table_creation_query)
    con.commit()
    con.close()

if __name__ == "__main__":
    main()