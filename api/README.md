## **Users Endpoints**
|REST Method | Endpoint | Description |
|:------:|:----------:|:---------------|
|**GET**|api/users|with valid token, view list of users|
|**POST**|api/users/register|register new user|
|**POST**|api/users/login|login as a user|
|**GET**|api/tech|get list of rentable tech hardwar|


<br>
<hr>

<br>
<br>

## ☝️**Pitch**

Use My Tech Stuff: like AirBnB, but for high end electronics. Are you tired of paying ridiculous fees for camera and other equipment rentals? Bypass the middleman and rent from a real person!

## ✅ **MVP**

1. Two user types: `owner`s  and `renter`

2. `user` can login and create a profile

3. `user` can then setup items they have `for rent` such as cameras, TV's, party equipment such as speakers/fog machines, etc.

4. `user` will be able to create, read, update and delete rental data. A second `user` can login and see `items` that users have `for rent` and ask to `rent` an `item`

## 🏃‍♀️**Stretch**

1. Add a payment option into the application allowing a `user` to pay over Paypal / Stripe etc. to `rent` their `item`s

2. Be able to schedule a `time` and `place` for pick-up

3. Add a `review` system into the app so that the social aspect is there to ensure that `user`s are legitimate.


//TODO//
- create role column in users table, renters and rentee's
- build out tech endpoints