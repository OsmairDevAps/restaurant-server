import express from 'express'
import categoryRoutes from './routes/category';
import commandRoutes from './routes/commands';

const app = express()
app.use(express.json());

app.use('/categories', categoryRoutes)
app.use('/mesas', commandRoutes)

app.listen(4444, () => {
  console.log('Server running on port 4444')
})


