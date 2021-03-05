## [Heroku Link](https://tt-33-use-my-tech.herokuapp.com/)

<br>
<br>

## **Endpoints**

| REST Method |      Endpoint      | Description                          |
| :---------: | :----------------: | :----------------------------------- |
|   **GET**   |     api/users      | with valid token, view list of users |
|  **POST**   | api/users/register | register new user                    |
|  **POST**   |  api/users/login   | login as a user                      |
|   **GET**   |   api/users/:id    | get user by id                       |
|   **PUT**   |   api/users/:id    | update user by id                    |
| **DELETE**  |   api/users/:id    | delete user by id                    |
|   **GET**   |      api/tech      | get list of rentable tech hardware   |

<br>

| REST Method |   Endpoint   | Description                          |
| :---------: | :----------: | :----------------------------------- |
|   **GET**   |   api/tech   | with valid token, view list of users |
|  **POST**   |   api/tech   | post new tech                        |
|   **GET**   | api/tech/:id | get tech by id                       |
|   **PUT**   | api/tech/:id | update tech by id                    |
| **DELETE**  | api/tech/:id | delete tech by id                    |

<br>
<hr>

## [Notion Link](https://www.notion.so/Use-My-Tech-Stuff-4af21e428f964d13b1c469c555db70b4)

<br>
<br>

## ☝️**Pitch**

Use My Tech Stuff: like AirBnB, but for high end electronics. Are you tired of paying ridiculous fees for camera and other equipment rentals? Bypass the middleman and rent from a real person!

## ✅ **MVP**

1. Two user types: `owner`s and `renter`

2. `user` can login and create a profile

3. `user` can then setup items they have `for rent` such as cameras, TV's, party equipment such as speakers/fog machines, etc.

4. `user` will be able to create, read, update and delete rental data. A second `user` can login and see `items` that users have `for rent` and ask to `rent` an `item`

## 🏃‍♀️**Stretch**

1. Add a payment option into the application allowing a `user` to pay over Paypal / Stripe etc. to `rent` their `item`s

2. Be able to schedule a `time` and `place` for pick-up

3. Add a `review` system into the app so that the social aspect is there to ensure that `user`s are legitimate.

//TODO//

- [ ] fix frontend DELETE bug w/Paul
- [ ] add endpoints and models to filter out renters and find all the tech a renter has for rent (join statement in model?)
- [ ] build tests for user routes
- [ ] build tests for tech routes
- [ ] build tests for user models
- [ ] build tests for tech models
- [ ] build tests for middleware
- [ ] make a conditional so that a user can log in with either their username or email
