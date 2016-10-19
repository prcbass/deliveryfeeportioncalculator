# Delivery Fee Portion Calculator

A lightweight [Electron](http://electron.atom.io/) application that calculates total price portions of items in a delivery order. 

### Why?

I have my food delivered fairly often. Most of the time I order food along with someone else. Subsequently, delivery fees should be split between every individual ordering an item to be delivered. 

### How does the math work?

Main delivery fee: Fee charged by delivery service, this should be split evenly amongst all individuals ordering food* 

Order Tip: Tip amount agreed upon by individuals involved in an order. This amount should be split evenly amongst all individuals ordering food*

Tax and Extra fees: Delivery companies will occasionally add extra fees and include them as part of the “tax due” amount. To mitigate this, the delivery fee portion calculator calculates how much more money than the total tax (6% in Florida) is being charged and splits that “extra amount” evenly amongst all individuals ordering food*. An example is shown below:

Item 1 Price: $5
Item 2 Price: $3
Tax and Extra fees: $2

5 * .06 = .3 (tax for item 1)
3 * .06 = .18 (tax for item 2)

2 - (.3 + .18) = 1.52 (“extra fee amount”)

1.52/2 = .76 (where the 2 in the divisor is the number of items) 

Total Price Item 1: 5 + .3 + .76 = $6.06
Total Price Item 2: 3 + .18 + .76 = $3.94

Note that the delivery fee portion calculator takes into account the case where there is no “extra fee” added to the tax amount.

*(currently split per item) 

### Where can I find the logic? 

Relevant code for validating user input and calculating delivery fee portions can be found in `main.js` and `index.html` 

### To-do/Planned Features:
1. Unit tests
2. Create desktop application executables (Mac OSX, Windows, Linux) to install and run on other machines
3. Allow creation of “users”/”customers” that can have multiple food items attributed to themselves. Display total price portions on a “per user” basis instead of a “per item” basis
4. Write less javascript in “index.html”, move code to separate file? 
5. Allow users to set tax percentage (currently uses 6%, hard-coded for Florida) 
6. More input validation (invalid price amounts like entering characters instead of numbers, etc.) 


