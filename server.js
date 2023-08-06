import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from './routes/authRoute.js';
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cors from 'cors';
import axios from "axios";



dotenv.config();

connectDB();

//rest object
const app = express();

 app.use(cors()); // CORS middleware should be used before other middleware
app.use(express.json());
app.use(morgan('dev'));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.get('/',(req,res)=> {
    res.send("<h1>Wearables</h1>");
    
});

app.post("/khalti-api", async (req, res) => {
    const payload = req.body;
    const khaltiResponse = await axios.post(
      "https://a.khalti.com/api/v2/epayment/initiate/",
      payload,
      {
        headers: {
          Authorization: `key 0d852f9a28c742a7b37ea6349ba9bb84`,
        },
      }
    );
  
    if (khaltiResponse) {
      res.json({
        success: true,
        data: khaltiResponse?.data,
      });
    } else {
      res.json({
        success: false,
        message: "something went wrong!",
      });
    }
  });

  app.get("/test", (req, res) => {
    res.send({
      status: 200,
      message: "Test successful",
    });
  });

// app.use(cors());
// app.use(express.json());
// app.use(morgan('dev'));

//routes

app.use('/api/v1/auth', authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes
);


//PORT
const PORT =  8080;

const server = app.listen(PORT, () => {
    console.log(
        `Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white);
});

server.on('error',(err) =>{
    console.log('Server error:', err);
    server.close();
});

