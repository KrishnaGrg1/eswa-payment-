import jwt from "jsonwebtoken";

// const token=jwt.verify("yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b3RhbF9hbW91bnQiOjEwMDAsInRyYW5zYWN0aW9uX3V1aWQiOiI2NzkwZmE2MTFjMTgyMzQ2NGUzYzJhNmYiLCJwcm9kdWN0X2NvZGUiOiJFUEFZVEVTVCIsImlhdCI6MTczNzU1NDUyOX0.mt8wx1WrTjv26mYCpLeqO3cDAWHh1vcJs-mTmpeclyk","8gBm/:&EnhH.1/q");

// console.log(token)


let encodedData="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b3RhbF9hbW91bnQiOjEwMDAsInRyYW5zYWN0aW9uX3V1aWQiOiI2NzkwZmE2MTFjMTgyMzQ2NGUzYzJhNmYiLCJwcm9kdWN0X2NvZGUiOiJFUEFZVEVTVCIsImlhdCI6MTczNzU1NDUyOX0.mt8wx1WrTjv26mYCpLeqO3cDAWHh1vcJs-mTmpeclyk"

let secretKey="8gBm/:&EnhH.1/q"

const to=jwt.verify(encodedData, secretKey);

console.log(to)