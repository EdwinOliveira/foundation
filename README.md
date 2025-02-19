## Tech Stack

* Backend: Node (v23.6.0) | Express | Vitest | Zod
* Frontend: Angular | Jasmine | Karma

## Install Dependencies

* PNPM Workspaces should cover the dependencies. 
* Just run the following command on the project root.

> command: pnpm install

## Run

Navigate into the folder before running the commands.

> backend command: npm run dev
> frontend command: npm run start

## How It Works

* Basically, when you click on the GENERATE 2D GRID button the GRID will fill with random characters that are generated on the backend. 
* Each iteration will take 2 seconds.
* The interval is not immediate so it means the first time you click you will have to wait two seconds before the characters are generated.
* There is also a character selector (I guess it's more an input but yeah..).
* When you type a character the server will take that character and then generate 20% of the grid with that character.
* This will be allowed each 4 seconds. In order to do this the field will be disabled from the moment the request is made to update the priority character.
* There is also a live code that is generated at the same time as the grid and it is returned at the same time from the server.
* There is also some error handling on the frontend just to notify if the connection was closed or if there was an error doing an operation.

* The server has two endpoints, one for the priority character update and another for the stream of characters.
* The stream of characters is of event-stream content type and is kept alive until broken by either the client or the server.

## Backend Tests

* Both the providers and the schema are covered by tests.
* Navigate to the backend folder and run following command.

> command: pnpm run test

## Frontend Tests

* Almost all the components are fully covered or partially covered by tests.
* Navigate to the frontend folder and run following command.

> command: pnpm run test

## Screenshot

![image](https://github.com/user-attachments/assets/5ef2939c-8ef1-42f8-a91f-297856561f42)

