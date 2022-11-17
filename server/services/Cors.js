import cors from 'cors'

export default () => cors({
  origin: '*',
  exposedHeaders: 'Authorization',
})
