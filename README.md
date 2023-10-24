  # ekreb
  This repository contains the source code for the word unscrambling game ekreb.

## Getting Started

### Prerequisites
-   [Node.js](https://nodejs.org/en/)
-   A RapidAPI key (You can obtain a key [here](https://rapidapi.com/dpventures/api/wordsapi))

### Installation

1. Clone this repository.
    ```bash
    git clone https://github.com/stevenysy/ekreb.git
    ```
2. Navigate to the project directory
    ```bash
    cd change-coding-challenge-2023-stevenysy
    ```
3. Navigate to the backend directory and install the backend Node dependencies
    ```bash
    cd ekreb-backend
    npm install
    ```
4. Navigate to the `src` folder in the backend directory and open `config.js`. Replace the value of the `API_KEY` variable with your own RapidAPI key.
5. Start the backend development server
    ```bash
    npm run dev
    ```
6. In a NEW terminal, navigate to the frontend directory and install the frontend Node dependencies
    ```bash
    cd change-coding-challenge-2023-stevenysy
	  cd ekreb-frontend
	  npm install
    ```
7. Start the frontend development server
    ```bash
    npm run start
    ```
8. Navigate to http://localhost:3000 in your browser
9. Happy unscrambling!
