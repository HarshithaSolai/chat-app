# Bunq Assignment - A Chat Application in React 

## Objective : 
  Create a simple react chat application where a user must be able to login, view one-to-one conversations with other users, send a new message in a conversation and new messages appear automatically in the conversation

## Table of contents:
- [Requirement Analysis](#requirement-analysis)
- [Tech Stack](#tech-stack)
- [Design](#design)
- [API Endpoints](#api-endpoints)
- [Live Demo](#live-demo)
- [Running Scripts](#running-scripts)
- [Improvements](#improvements)

## Requirement Analysis
1. Login using username and password (There is no auth service so checking if username is present in the list of users from API, if valid user, take to landing page else show error message)
2. Create a personal chat 
3. Create a group chat
4. View all conversations for a given user
5. On click of each conversation (personal or group), view one-to-one conversation with that user or group
6. Send new messages to users (personal or group)
7. Show realtime data using Polling ( Poll every 5 seconds)
8. Logging out of the current user and login as another user

## Tech Stack
- **UI Framework** :  React

- **Routing** : React Router DOM 

- **CSS Framework** : Tailwind CSS

- **Http Client** : Axios

- **Data/State Management** : React in-built techniques like Props drilling, lifting up state, hooks and Context API for sharing data (props) between components.

- **Hosting** : Netlify 

## Design
### UX
- Simple design & easy to understand 
- Responsive 
- Real-time chat experience

## API Endpoints 
Using Bunq Assignment API https://assignment.bunq.com/api for data. Maintaining all dynamic data (API url, data fetching, constant values) in a separate file so that changes can be easily made in future.

## Live Demo
Please check https://chat-app.netlify.app/ for live demo.
If you want to run the app in local, please check next section.

## Running Scripts
After cloning the project, you can run the following in the project directory.

### `yarn install or npm install`

Installs the required packages.

### `yarn start or npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `yarn test or npm test`

Launches the test runner in the interactive watch mode.\

### `yarn build or npm build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

## Improvements

Due to time constraints and keeping the chat app simple, I purposefully skipped few things like 

- I did not implement Testing (Unit testing - Jest / React Testing library) currently. 
- Websockets will be used in realtime chat applications, I used polling here and it is continuously polling for every 5 secs, which could make lot of API calls to server. 
- Authentication service was not available so just did some validation on teh front end for assignment purpose.
- I used Context API for data management purpose, and did not cache the messages. I could have used redux in that case
- Infinite scrolling of chat and conversation list. Since there were limited users and chats, I did not implement it.

