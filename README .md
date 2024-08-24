
# Simple Fullsatck Finance App

This is a fullstack finance management application built with FastAPI (backend) and React (frontend). The application allows users to manage their financial transactions by creating, updating, deleting, and viewing transactions.


## Features
- **Add Transaction**: Create a new transaction with details such as amount, category, description, date, and whether it's an income or expense.
- **View Transactions**: View a list of all transactions with details.
- **Edit Transaction**: Update the details of an existing transaction.
- **Delete Transaction**: Remove a transaction from the list.
## Technologies Used


- **Backend**: FastAPI, SQLAlchemy, PostgreSQL
- **Frontend**: React, Axios
- **Middleware**: CORS (Cross-Origin Resource Sharing)
## Setup Intruction
### Backend (FastAPI)

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Maybe-Dave/simple-finance-app.git
   cd simple-finance-app/backend
   ```
2. **Install Dependencies**:
    ```bash
    pip install -r requirements.txt
    ```
3. **Setup the database**:
    Make sure you have PostgreSQL installed and configured. Update the DATABASE_URL in your environment variables.
4. **Run the FastAPI server**
    ```bash
    uvicorn main:app --reload
    ```
    The backend will be accessible at http://127.0.0.1:8000.
### Frontend (React)
1. **Navigate to the frontend directory**:

    ```bash
    cd ../frontend
    ```

2. Install dependencies:


    ```bash
    npm install
    ```

3. Start the React development server:

    ```bash
    npm start
    ```
    The frontend will be accessible at http://localhost:3000.

### CORS Configuration
The backend is configured to allow requests from any domain. If you want to restrict access, modify the **'allow_origins'** in the **'main.py'** file as needed.

    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],  # Change "*" to your specific domain
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )


## Setup Intruction
### Backend (FastAPI)

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Maybe-Dave/simple-finance-app.git
   cd simple-finance-app/backend
   ```
2. **Install Dependencies**:
    ```bash
    pip install -r requirements.txt
    ```
3. **Setup the database**:
    Make sure you have PostgreSQL installed and configured. Update the DATABASE_URL in your environment variables.
4. **Run the FastAPI server**
    ```bash
    uvicorn main:app --reload
    ```
    The backend will be accessible at http://127.0.0.1:8000.
### Frontend (React)
1. **Navigate to the frontend directory**:

    ```bash
    cd ../frontend
    ```

2. Install dependencies:


    ```bash
    npm install
    ```

3. Start the React development server:

    ```bash
    npm start
    ```
    The frontend will be accessible at http://localhost:3000.

### CORS Configuration
The backend is configured to allow requests from any domain. If you want to restrict access, modify the **'allow_origins'** in the **'main.py'** file as needed.

    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],  # Change "*" to your specific domain
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )


## Usage
1. Adding Transactions:
- Use the form to input transaction details.
- Submit the form to add a transaction.

2. Viewing Transactions:
- All transactions are displayed in a table format.

3. Editing Transactions:

- Click the "Edit" button next to a transaction to modify its details.
4. Deleting Transactions:

- Click the "Delete" button next to a transaction to remove it.
## Logging
The backend uses Python's **'logging'** module to log important information, including transaction creation, updates, and deletions.
## Deployment
To deploy the backend and frontend to separate hosting services, ensure that the CORS settings and API request URLs are properly configured for your production environment.
## Contributing
Feel free to open issues or submit pull requests for improvements or bug fixes.
## License
This project is licensed under the MIT Licens**e. See the LICENSE file for more details.
    
This `README.md` provides an overview of your application, setup instructions, and important details for running and deploying the app. Adjust any URLs or specific commands based on your actual setup and deployment environment.
