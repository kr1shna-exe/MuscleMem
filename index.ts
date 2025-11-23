import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth";
import todoRoutes from "./routes/todo";

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/todo", todoRoutes);

app.listen(3000, () => {
  console.log("Server Running PORT: 3000");
});
