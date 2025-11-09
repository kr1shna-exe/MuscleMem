from typing import List
from uuid import uuid4

import bcrypt

from utils.types import User

users: List[User] = []

async def addUser(email: str, password: str):
    newUser = User(
        id=uuid4(),
        email=email,
        password=password
    )
    users.append(newUser)
    return {
        "email": email,
        "password": password
    }

async def findByEmail(email: str):
    return next((user for user in users if user.email == email), None)

def hash_password(password: str):
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode()

def compare_password(password:str, hashed_password: str):
    return bcrypt.checkpw(password.encode('utf-8'), hashed_password.encode('utf-8'))
