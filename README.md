
# Marketplace Example - June

## Overview

This project provides a simple example of a **marketplace** implemented on the **Aptos blockchain** using Move. The module `marketplace::list_and_purchase` enables users to list digital assets for sale at a fixed price and allows buyers to purchase them securely.

## Features

-   **List an asset for sale**: A seller can list an object with a fixed price in a decentralized marketplace.
    
-   **Purchase an asset**: A buyer can purchase an object directly by paying the listed price.
    
-   **Secure Transactions**: Ensures proper ownership transfer and cleanup after the sale.
    

## Module: `marketplace::list_and_purchase`

### Data Structures

#### `Listing`

A struct that holds details of a listed object:

-   `object`: The asset being sold.
    
-   `seller`: The address of the seller.
    
-   `delete_ref`: Reference used for cleanup after the sale.
    
-   `extend_ref`: Reference used for creating a signer to facilitate the transfer.
    

#### `FixedPriceListing<CoinType>`

A struct that defines the price of the listed object:

-   `price`: The fixed price for the object.
    

### Functions

#### `list_with_fixed_price<CoinType>`

Allows a seller to list an object for sale at a fixed price.

**Parameters:**

-   `seller`: Signer of the seller.
    
-   `object`: The asset to be sold.
    
-   `price`: The selling price in the specified coin type.
    

**Process:**

1.  Creates a new object for the listing.
    
2.  Disables ungated transfers to prevent unauthorized transfers.
    
3.  Generates a signer for the listing.
    
4.  Stores the listing details and price information.
    
5.  Transfers the object to the listing address.
    

#### `purchase<CoinType>`

Allows a buyer to purchase a listed object by paying the fixed price.

**Parameters:**

-   `purchaser`: Signer of the buyer.
    
-   `object`: The asset being purchased.
    

**Process:**

1.  Verifies that the listing exists.
    
2.  Withdraws the required amount from the buyer.
    
3.  Transfers the object to the buyer.
    
4.  Deposits the payment into the seller's account.
    
5.  Cleans up the listing object to complete the transaction.
    

## Error Handling

-   **ENO_LISTING (1):** Raised if the listing does not exist.
    

## How to Deploy

1.  Ensure you have **Move CLI** and **Aptos CLI** installed.
    
2.  Compile the module:
    
    ```
    move build
    ```
    
3.  Deploy the module to the Aptos blockchain:
    
    ```
    aptos move publish --profile default
    ```
    

## How to Use

### Listing an Object for Sale

```
aptos move run --function-id 'marketplace::list_and_purchase::list_with_fixed_price' \
  --args <SELLER_ADDRESS> <OBJECT_ID> <PRICE>
```

### Purchasing an Object

```
aptos move run --function-id 'marketplace::list_and_purchase::purchase' \
  --args <BUYER_ADDRESS> <OBJECT_ID>
```

## License

This project is licensed under the MIT License.
