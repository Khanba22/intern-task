# Multiplayer Whiteboard App

## Overview

This project is a real-time multiplayer whiteboard application built with ReactJS. It includes a chat component and user authentication through Keycloak. The app leverages several libraries and tools:

- *ReactJS*: A JavaScript library for building user interfaces.
- *React-Redux*: A predictable state container for managing application state.
- *KonvaJS*: A canvas library for creating interactive graphics and animations.
- *Bootstrap*: A CSS framework for designing responsive and modern interfaces.
- *Socket.io*: A library for real-time, bidirectional event-based communication.
- *Docker*: Used for containerizing the application.

## Features

- *Real-time Collaboration*: Users can draw and interact with the whiteboard in real-time.
- *Chat Component*: Communicate with other users while working on the whiteboard.
- *User Authentication*: Secure login via Keycloak.
- *Responsive Design*: Built with Bootstrap to ensure compatibility across devices.

## Prerequisites

Before running the application, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [Docker](https://www.docker.com/get-started)

## Getting Started

### Clone the Repository

bash
git clone https://github.com/yourusername/multiplayer-whiteboard.git
cd multiplayer-whiteboard


### Install Dependencies

Install the required Node.js packages:

bash
npm install


### Configuration

Before running the app, configure the Keycloak authentication settings. Create a .env file in the root directory with the following environment variables:


REACT_APP_KEYCLOAK_URL=<your_keycloak_url>
REACT_APP_KEYCLOAK_REALM=<your_keycloak_realm>
REACT_APP_KEYCLOAK_CLIENT_ID=<your_keycloak_client_id>


### Running the Application Locally

To start the development server:

bash
npm start


Visit http://localhost:3000 in your browser to access the application.

### Docker Setup

To build and run the application using Docker:

1. *Build the Docker Image:*

   bash
   docker build -t multiplayer-whiteboard .
   

2. *Run the Docker Container:*

   bash
   docker compose up
   

   Visit http://localhost:3000 in your browser to access the application running inside the Docker container.

## Usage

1. *Drawing on the Whiteboard*: Use your mouse or touchscreen to draw. The drawing will be synchronized in real-time with other users.
2. *Chat*: Use the chat component to communicate with other users.
3. *Authentication*: Log in with your Keycloak credentials to access the whiteboard.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request if you have suggestions or improvements.


## Contact

For any questions or feedback, please reach out to [khanba2222khan@gmail.com](mailto:khanba2222khan@gmail.com).

---

Feel free to adjust any sections according to the specifics of your project or personal preferences!
