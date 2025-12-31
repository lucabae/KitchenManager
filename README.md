<h1>KITCHEN MANAGER</h1>
<h2>Video demo:</h2> <URL>
<h2>Description</h2>
Kitchen manager is a web app searching to make your life easier when managing your day to day inventory.
<br>
It allows you to scan items you have in your kitchen and input the quantity of that item that you currently have, and also the minimum quantity of that product that you always want to have.
<i>
    Example: You always want to have at least 6 litters of milk, you will then scan your milk's barcode, indicate how much you currently have and say that you want at least to have 6 litters of milk.
</i>
<br>
Once all your items are scanned, you can continuously update your inventory, and when it's time to go shopping, an accurate shopping list will tell you what to buy and the quantities.
This is useful if you easily forget things when shopping (my case).
<hr>
<h2>Pages</h2>
The web has 3 pages
<ul>
    <li>
        <b>Inventory: </b> Check your stock on current items, change the stock quantities and modify the minimum stock required.
    </li>
    <li>
        <b>Scanner: </b> This page integrates a barcode scanner to add new items or check how much you have of some product.
    </li>
    <li>
        <b>Shopping List: </b> This page shows what's lacking in your inventory for your next shopping session.
    </li>
</ul>

<hr>
<h2>Stack</h2>
<ul>
    <li> 
        <b>Frontend: </b> React TS Framework, <a href="https://www.npmjs.com/package/html5-qrcode">html5-qrcode NPM package</a>.
    </li>
    <li> 
        <b>Backend: </b> Flask, <a href="https://openfoodfacts.github.io/openfoodfacts-server/api/">Open Food Facts API</a>, SQLite3 Database.
    </li>
</ul>
<hr>
<h2>Frontend</h2>
The frontend was made with React TS + React Router DOM.
<br>
It contains 3 main pages (already explained before).
<br>
It also contains 3 components. Product, Inventory Minimum and Inventory Modify, both of these last ones contained inside the first one.
<br>
<b>Product</b> is a component that shows the name, image and quantity per unit of a product, it also accepts props, toggling modification and shopping list view.
Modification is what makes InventoryMinimum and InventoryModify components show up, and shopping list view simply tells the user how much of this product they must buy.
<br>
<b>Inventory Minimum</b> is simply an input and a button that sends the modification of minimum requisites for an item to the backend.
<br>
<b>Inventory Modify</b> are two buttons which allow adding or removing inventory quantities to items. They update the main Product component to show correctly how much of that product the user has.

<hr>
<h2>Backend</h2>
The backend uses Django and an SQLite Database.
This choice was done to ensure the simplicity of the project, as a more complex database should not be required for this.
<br>
SQLite databases add a constraint which makes it impossible for two processes to connect to it at the same time, so proper connection opening and closing had to be done, to avoid getting concurrency errors.
<h3>Auxiliary functions</h3>
<ul>
    <li>
        <b>Add quantity: </b>
        This function accepts the item barcode and adds or removes quantity from the database inventory.
    </li>
    <li>
        <b>Delete product: </b>
        This function accepts the item barcode and removes a product from the database.
    </li>
    <li>
        <b>Get all products: </b>
        This function returns all items in the database, their quantities and information. This function is used for the inventory page.
    </li>
    <li>
        <b>Get product: </b>
        This function returns an items in the database, it's quantity and information.
    </li>
    <li>
        <b>Get product column: </b>
        This function returns an items specific column in the database.
    </li>
    <li>
        <b>Get shopping list: </b>
        This function returns all items who have less quantity then the one specified in inventory minimum. This function is used for the shopping list page.
    </li>
    <li>
        <b>Insert product: </b>
        This function accepts a name, category, barcode, image and more info to insert the item in the database. Products are automatically inserted once they are scanned.
    </li>
    <li>
        <b>Modify column: </b>
        This function accepts a barcode and modifies the specified column with a certain value.
    </li>
    <li>
        <b>Product is saved: </b>
        This function checks if a product is already in the database.
    </li>
    <li>
        <b>Product Serializer: </b>
        This function accepts one or many products and converts it from the SQLite library format to a dict. This function is used in almost the entirety of the project to facilitate reading.
    </li>
</ul>

<h3>Main function</h3>
The main function is the one that handles all of the requests, it specifically has 3 endpoints: <code>/inventory</code>, <code>/shopping-list</code>, <code>/product/&lt;code&gt;</code>
<ul>
    <li>
        <b>/inventory</b>
        This endpoint returns all items in the inventory, and its info. It uses the getAllProducts function.
    </li>
    <li>
        <b>/shopping-list</b>
        This endpoint returns all items in the inventory, which have less quantity than the one required by the inventory minimum specification. It uses the getShoppingList function.
    </li>
    <li>
        <b>/product</b>
        <ul>
            <li>
                <b>GET: </b>
                This method creates a new product by giving it the barcode. It accesses the <a href="https://openfoodfacts.github.io/openfoodfacts-server/api/">Open Food Facts API</a> and saves all the info inside the database. It then returns all the information. 
            </li>
            <li>
                <b>POST: </b>
                This method adds quantity to a product. It simply adds the quantity per unit every time this endpoint and method is hit.
            </li>
            <li>
                <b>DELETE: </b>
                This method remove quantity from a product. It does the inverse of the POST method. It makes sure no negative quantities are recorded in the database.
            </li>
            <li>
                <b>PUT: </b>
                This method allows you to modify the inventory minimum quantity.
            </li>
        </ul>
    </li>
</ul>