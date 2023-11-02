import './paths'
import express from 'express';
import cors from 'cors'
import JSONspb from './data/spb/output.json'
import JSONmsk from './data/msk/output.json'
import http from 'http'
import userControllers from '@/resources/user/user.controllers';
import { authenticate } from './middleware/authenticator';
import noteRouter from './routes/note';
import seoRouter from './routes/seo'
import { Server } from 'socket.io';
import ParserFunc from './parserFunc';

const port = process.env.PORT ? parseInt(process.env.PORT) : 5000

const app = express();

app.use(cors())

app.use(express.json())

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: ['http://localhost:3001'],
    methods: ['GET', 'POST'],
  },
})


const url1 = 'https://vodochet.ru'
const path1 = 'msk'

const url2 = 'https://spb.vodochet.ru'
const path2 = 'spb'


app.post('/api/login', userControllers.userLogin)

app.use('/api/note', noteRouter)

app.use('/api', seoRouter)

app.get('/api/user', authenticate, userControllers.userGet)

app.get('/api/company/:id', (req, res) => {
  if(req.params.id === 'spb') {
    res.send(JSONspb) 
  } else {
    res.send(JSONmsk)
  }
})

app.post('/api/toparsing', async () => {
  Promise.allSettled([
    await ParserFunc(url1, path1),
    await ParserFunc(url2, path2)
  ])
}
)

app.use('/static', express.static('src/files'))

server.listen(port, () => { console.log('server listening', port) });