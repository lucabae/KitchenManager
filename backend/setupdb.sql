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