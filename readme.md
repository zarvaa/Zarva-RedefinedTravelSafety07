# Zarva Travel Safety App

Zarva is a travel safety application that provides users with features like safest route calculation and danger speech recognition to enhance their personal security while traveling.

## Live Demos

You can access the live application at the following URLs:

-   [https://zarva-redefined-travel-safety07.vercel.app/](https://zarva-redefined-travel-safety07.vercel.app/)
-   [www.zarva.site](http://www.zarva.site)

## Key Features

-   **Safest Route Calculation:** Determines the safest route for your journey.
-   **Danger Speech Recognition:** Monitors for and alerts you to dangerous situations.
-   **Google Authentication:** Securely log in with your Google account.

## Technologies Used

### Frontend

-   React
-   Vite
-   TypeScript
-   Tailwind CSS
-   Appwrite (for Google Authentication)

### Backend

-   Node.js
-   Express.js
-   MongoDB
-   Mongoose

## Setup and Installation

To get the application up and running on your local machine, follow these steps:

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/zarva-travel-safety.git
    cd zarva-travel-safety
    ```

2.  **Set up environment variables:**

    Create a `.env` file in the root of the project and add the following environment variables. You can use the `.env.example` file as a template.

    ```
    PORT=8000
    MONGODB_URI=your_mongodb_connection_string

    # Appwrite configuration
    VITE_APPWRITE_PROJECT_ID=your_appwrite_project_id
    VITE_APPWRITE_ENDPOINT=your_appwrite_endpoint
    ```

3.  **Install server dependencies:**

    ```bash
    cd Server
    npm install
    ```

4.  **Install client dependencies:**

    ```bash
    cd ../Client
    npm install
    ```

## Running the Application

1.  **Start the server:**

    ```bash
    cd Server
    npm start
    ```

    The server will start on the port specified in your `.env` file (defaulting to 8000).

2.  **Start the client:**

    ```bash
    cd Client
    npm run dev
    ```

    The client will start on `http://localhost:5173`.
