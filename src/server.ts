import express from 'express'
import cors from 'cors'
import categoryRoutes from './routes/category';
import productRoutes from './routes/products';
import commandRoutes from './routes/commands';
import commandItemRoutes from './routes/commanditems';

const app = express()
app.use(express.json());
app.use(cors({
  origin: ['192.168.1.93', 'localhost'], 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use('/categories', categoryRoutes)
app.use('/produtos', productRoutes)
app.use('/mesas', commandRoutes)
app.use('/itensMesa', commandItemRoutes)

app.listen(4444, () => {
  console.log('Server running on port 4444')
})


