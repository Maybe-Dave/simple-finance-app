import logging
from fastapi import FastAPI, HTTPException, Depends
from typing import List
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from .models import Transaction
from .database import engine, SessionLocal, Base

# Initialize FastAPI application
app = FastAPI()

# Setup CORS middleware to allow requests from the React frontend
origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all Domains for this project
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create database tables
Base.metadata.create_all(bind=engine)

# Setup logging configuration
logging.basicConfig(
    level=logging.INFO,  # Set the logging level
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",  # Log format
)

logger = logging.getLogger(__name__)

# Pydantic models for data validation
class TransactionBase(BaseModel):
    amount: float
    category: str
    description: str
    is_income: bool
    date: str

class TransactionModel(TransactionBase):
    id: int

    class Config:
        orm_mode = True

# Dependency to get the database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Endpoint to create a new transaction
@app.post("/transactions/", response_model=TransactionModel)
async def create_transaction(transaction: TransactionBase, db: Session = Depends(get_db)):
    logger.info(f"Creating a new transaction with data: {transaction.dict()}")
    db_transaction = Transaction(**transaction.model_dump())
    db.add(db_transaction)
    db.commit()
    db.refresh(db_transaction)
    logger.info(f"Transaction created with ID: {db_transaction.id}")
    return db_transaction

# Endpoint to retrieve all transactions
@app.get("/transactions/", response_model=List[TransactionModel])
def get_transactions(db: Session = Depends(get_db)):
    logger.info("Fetching all transactions")
    transactions = db.query(Transaction).all()
    logger.info(f"Retrieved {len(transactions)} transactions")
    return transactions

# Endpoint to update a specific transaction by ID
@app.put("/transactions/{transaction_id}", response_model=TransactionModel)
async def update_transaction(transaction_id: int, transaction: TransactionBase, db: Session = Depends(get_db)):
    logger.info(f"Updating transaction with ID: {transaction_id}")
    db_transaction = db.query(Transaction).filter(Transaction.id == transaction_id).first()
    if db_transaction is None:
        logger.error(f"Transaction with ID {transaction_id} not found")
        raise HTTPException(status_code=404, detail="Transaction not found")
    
    db_transaction.amount = transaction.amount
    db_transaction.category = transaction.category
    db_transaction.description = transaction.description
    db_transaction.is_income = transaction.is_income
    db_transaction.date = transaction.date
    db.commit()
    db.refresh(db_transaction)
    logger.info(f"Transaction with ID {transaction_id} updated successfully")
    return db_transaction

# Endpoint to delete a specific transaction by ID
@app.delete("/transactions/{transaction_id}")
async def delete_transaction(transaction_id: int, db: Session = Depends(get_db)):
    logger.info(f"Deleting transaction with ID: {transaction_id}")
    db_transaction = db.query(Transaction).filter(Transaction.id == transaction_id).first()
    if db_transaction is None:
        logger.error(f"Transaction with ID {transaction_id} not found")
        raise HTTPException(status_code=404, detail="Transaction not found")
    
    db.delete(db_transaction)
    db.commit()
    logger.info(f"Transaction with ID {transaction_id} deleted successfully")
    return {"message": "Transaction deleted successfully"}
