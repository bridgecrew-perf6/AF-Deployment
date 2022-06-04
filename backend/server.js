import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import cors from "cors";
import path from "path";

// Routes
import userRoutes from "./routes/userRoutes.js";
import markingRoutes from "./routes/markingRoutes.js";
import panelRoutes from "./routes/panelRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import subtypeRoutes from "./routes/subTypeRoutes.js";

import documentSaveRoutes from "./routes/documentRoute.js";

import documentRoutes from "./routes/documentRoutes.js";
import apannelRoutes from "./routes/allocatePanelRoutes.js";

import fileUploadController from "./controllers/fileuploadController.js";
import documentUploadController from "./controllers/documentUploadController.js";

import SupEvaluation from "./routes/SupEvaluation.js";
import getTopic from "./routes/getTopic.js";

dotenv.config();

//connect database
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Calling Routes
app.use("/api/user", userRoutes);
app.use("/api/marking", markingRoutes);
app.use("/api/panel", panelRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/subtype", subtypeRoutes);

app.use("/api/documents/", documentSaveRoutes);

app.use("/api/document", documentRoutes);
app.use("/api/APannel", apannelRoutes);

app.use("/api/files/", fileUploadController);
app.use("/api/documents/", documentUploadController);

app.use("/api/supEve", SupEvaluation);
app.use("/api/SupTopic", getTopic);

const __dirname = path.resolve();
//set upload folder
app.use(express.static("/uploads/"));
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// if (process.env.NODE_ENV === "development") {
//   app.use(morgan("dev"));
// }
if (process.env.NODE_ENV == "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("Api is working");
  });
}

//create port
const PORT = process.env.PORT || 6500;

app.listen(
  PORT,
  console.log(`server running in ${process.env.NODE_ENV} port ${PORT}`)
);
