# Node Farm 🌽🥦

## Project Overview

Node Farm is a web application project that simulates an online marketplace for fresh produce. It's designed to showcase server-side rendering with Node.js. Key features include:

- **Product Overview Page:** Displays a collection of available produce items using a card-based layout. Each card provides a snapshot of the product (image, name, quantity, price) and a link to a detailed view.
- **Product Detail Page:** Offers comprehensive information about a single product, including its origin, nutritional details, available quantity, price, and a detailed description.
- **Dynamic Content:** The website content is not static; it's generated on the server by populating HTML templates with data.

The project emphasizes a clean, modern, and engaging user interface with custom fonts, gradients, and emoji icons.

## How it's Built (Node.js Implementation)

This project is built using **Node.js** and demonstrates fundamental concepts of back-end web development, specifically server-side rendering:

1.  **HTTP Server:** A core Node.js `http` module (or a framework like Express.js, though this project might use the core module for learning purposes) is used to create an HTTP server. This server listens for incoming requests from users' web browsers.
2.  **Routing:** The Node.js application defines routes to handle different URLs:
    - `/` or `/overview`: Serves the main product overview page.
    - `/product?id=<PRODUCT_ID>`: Serves the detail page for a specific product, identified by its ID.
3.  **Data Source:** Product information (name, image, price, description, etc.) is typically stored in a local JSON file (e.g., `data.json`) which the Node.js application reads and parses.
4.  **Templating Engine (Manual):**
    - HTML template files (`template-overview.html`, `template-product.html`, `template-card.html`) are used. These files contain placeholders (e.g., `{%PRODUCT_NAME%}`, `{%IMAGE%}`, `{%PRICE%}`, `{%PRODUCT_ID%}`).
    - Node.js's `fs` (File System) module is used to read these template files.
5.  **Dynamic Content Generation (Server-Side Rendering):**
    - When a request is received, the server reads the appropriate HTML template(s).
    - It then fetches the necessary product data (either all products for the overview or a specific product for the detail page).
    - A custom function is typically implemented to replace the placeholders in the template strings with the actual data.
      - For the overview page, `template-card.html` is filled for each product, and the resulting HTML strings are combined and injected into the `{%PRODUCTS%}` placeholder in `template-overview.html`.
      - For the product detail page, placeholders in `template-product.html` are replaced with the specific product's details.
6.  **Sending the Response:** The fully rendered HTML page (with all data dynamically inserted) is then sent back to the client's browser.

This architecture allows for dynamic web pages where the content can be easily updated by modifying the data source, without needing to change the core HTML structure manually.

## Acknowledgements

This "Node Farm" project is part of the curriculum from **Jonas Schmedtmann's course on Node.js, Express, MongoDB & More: The Complete Bootcamp**.
A big thank you to **Jonas Schmedtmann** for the excellent instruction and engaging project ideas that helped in understanding these Node.js concepts.
