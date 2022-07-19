import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddelware.js";
import path from "path";
import morgan from "morgan";
import colors from "colors"

import productRoutes from "./routes/productRouctes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

dotenv.config();

connectDB();

const app = express();

if(process.env.NODE_ENV === "development") {
    app.use(morgan("dev"))
}

app.use(express.json())

app.use((request, response, next) => {
    console.log(request.originalUrl.bgBlue.underline);
    next();
})


app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);


const __dirname = path.resolve()
app.use("/uploads", express.static(path.join(__dirname, "/uploads")))

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/build")));

    app.get("*", (request, response) => response.sendFile(path.resolve(__dirname, "frontend", "build", "index.html")));
} else {
    app.get("/", (request, response) => {
        response.send("API is running....")
    })
    
}

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000 

app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.underline.bgYellow));