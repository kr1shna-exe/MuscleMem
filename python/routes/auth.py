import jwt
from fastapi import APIRouter, Depends, Header, HTTPException, Response

from controllers.auth import (addUser, compare_password, findByEmail,
                              hash_password)
from utils.types import User

router = APIRouter()

JWT_SECRET = "123"

async def authenticateToken(authorization: str = Header(None)):
    token = authorization.split(" ")[1]
    if not token:
        raise HTTPException(status_code=404, detail="Token Expired")
    decodedToken = jwt.decode({token, JWT_SECRET})
    user = await findByEmail(decodedToken.email)
    if not user:
        raise HTTPException(status_code=404, detail="Invalid Token")
    return user

@router.post("/signup")
async def register(user: User, response: Response):
    email, password = user.email, user.password
    existing_user = await findByEmail(email)
    if (existing_user):
        raise HTTPException(status_code=404, detail="User Already Registered!")
    hashed_password = hash_password(password)
    await addUser(email, hashed_password)
    token = jwt.encode({"email": email}, JWT_SECRET)
    response.set_cookie(
        key="token",
        value=token,
        httponly=True,
        max_age=10 * 24 * 60 * 60 ,
        samesite="strict"
    )
    print("User added Successfully")
    return {
        "message": "User Registered Successfully",
        "user": {
            "email": email,
        }
    }

@router.post("/signin")
async def login(user: User, response: Response):
    email, password = user.email, user.password
    existing_user = await findByEmail(email)
    if not existing_user:
        raise HTTPException(status_code=404, detail="Please Register To Login")
    compared_password = compare_password(password, existing_user.password)
    if not compared_password:
        raise HTTPException(status_code=404, detail="Incorrect Password")
    token = jwt.encode({"email": email}, JWT_SECRET)
    response.set_cookie(
        key="token",
        value=token,
        httponly=True,
        max_age=10 * 24 * 60 * 60,
        samesite="strict"
    )
    print("User Login Successfully")
    return {
        "message": "User Login Successfully",
        "user": {
            "user": email
        } 
    }
