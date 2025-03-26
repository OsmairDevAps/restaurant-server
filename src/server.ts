import express from 'express'
import cors from 'cors'
import categoryRoutes from './routes/category';
import productRoutes from './routes/products';
import commandRoutes from './routes/commands';
import commandItemRoutes from './routes/commanditems';
import userRoutes from './routes/user';
import caixaRoutes from './routes/caixa';
import movCaixaRoutes from './routes/movcaixa';

const app = express()
app.use(express.json());
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use('/categories', categoryRoutes)
app.use('/produtos', productRoutes)
app.use('/mesas', commandRoutes)
app.use('/itensMesa', commandItemRoutes)
app.use('/usuarios', userRoutes)
app.use('/caixa', caixaRoutes)
app.use('/movimentacaocaixa', movCaixaRoutes)

app.listen(4444, () => {
  console.log('Server running on port http://192.168.1.93:4444')
})


