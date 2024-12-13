# SmartFolio

SmartFolio is a web application designed for cryptocurrency investors, offering real-time sentiment analysis to help users make informed investment decisions. At the core of SmartFolio is a powerful sentiment analysis engine that evaluates market sentiment for various cryptocurrencies, providing valuable insights into price trends and investor sentiment. Additionally, the platform includes a personal wallet system that allows users to securely track and manage their cryptocurrency portfolios.

![ezgif com-video-to-gif-converter](https://github.com/user-attachments/assets/53ace8c7-ae0f-4c37-a974-e8a3a454ae4f)

## Features

- **Sentiment Analysis**: Real-time sentiment analysis of various cryptocurrencies, providing insights into market trends.
- **Portfolio Management**: Personal wallet system to track and manage cryptocurrency portfolios.
- **Basic Coin Information**: Information about each coin, including price trends and investor sentiment.
- **Comments and News**: Display of news articles and user comments related to each cryptocurrency.

## Technologies Used

- **Frontend**: React, TailwindCSS, ShadCN
- **Backend**: Express.js
- **Database**: PostgreSQL
- **Sentiment Analysis**: TensorFlow (BERT)
- **Other**: Docker, psycopg2

## Installation Instructions

To set up SmartFolio locally, follow these steps:

1. Ensure that you have **Node.js** and **PostgreSQL** installed on your system.
2. Create a new PostgreSQL database and update the connection data in dataSource\DB_queries accordingly.
3. Clone the repository and navigate to the project directory.
4. In the `dataSource` directory, run the following command:

   ```bash
   python main.py
5. Install the required dependencies for the project:
    
    ```bash
   npm install
6. Next, navigate to the server directory and run the following command to start the backend server:
    ```bash
   npm run dev
7. After that, navigate to the client directory and run the following command to start the frontend:
    ```bash
   npm run dev
8. Open your browser and go to the following URL to view the application:
    ```url
   http://localhost:5173/

