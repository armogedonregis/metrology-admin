import './paths'
import express from 'express';
import cors from 'cors'
import http from 'http'
import userControllers from '@/resources/user/user.controllers';
import { authenticate } from './middleware/authenticator';
import noteRouter from './routes/note';
import seoRouter from './routes/seo'
import { Server } from 'socket.io';
import ParserFunc from './parserFunc';

import HomeJson from './data/msk/home/output.json'
import poverkaJson from './data/msk/poverka-teploschetchikov-v-moskve-raiting/output.json'
import ustanovkaJson from './data/msk/ustanovka-schetchikov-tepla-v-moskve-raiting/output.json'
import schetchikovJson from './data/msk/ustanovka-schetchikov-vody-v-moskve-raiting/output.json'
import zamenaJson from './data/msk/zamena-schetchikov-vody-v-moskve-raiting/output.json'
import teploschetchikovJson from './data/msk/zamena-teploschetchikov-v-moskve-raiting/output.json'



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

// links
const msk1 = 'https://vodochet.ru'
const mskpath1 = 'home'

const msk2 = 'https://vodochet.ru/zamena-schetchikov-vody-v-moskve-raiting'
const mskpath2 = 'zamena-schetchikov-vody-v-moskve-raiting'

const msk3 = 'https://vodochet.ru/ustanovka-schetchikov-vody-v-moskve-raiting'
const mskpath3 = 'ustanovka-schetchikov-vody-v-moskve-raiting'

const msk4 = 'https://vodochet.ru/poverka-teploschetchikov-v-moskve-raiting'
const mskpath4 = 'poverka-teploschetchikov-v-moskve-raiting'

const msk5 = 'https://vodochet.ru/zamena-teploschetchikov-v-moskve-raiting'
const mskpath5 = 'zamena-teploschetchikov-v-moskve-raiting'

const msk6 = 'https://vodochet.ru/ustanovka-schetchikov-tepla-v-moskve-raiting'
const mskpath6 = 'ustanovka-schetchikov-tepla-v-moskve-raiting'


const url2 = 'https://spb.vodochet.ru'
const path2 = 'spb'


app.post('/api/login', userControllers.userLogin)

app.use('/api/note', noteRouter)

app.use('/api', seoRouter)

app.get('/api/user', authenticate, userControllers.userGet)

app.get('/api/company/msk/home', (req, res) => {
  res.send(HomeJson)
})

app.get('/api/company/msk/poverkaJson', (req, res) => {
  res.send(poverkaJson)
})

app.get('/api/company/msk/ustanovkaJson', (req, res) => {
  res.send(ustanovkaJson)
})


app.get('/api/company/msk/schetchikovJson', (req, res) => {
  res.send(schetchikovJson)
})

app.get('/api/company/msk/zamenaJson', (req, res) => {
  res.send(zamenaJson)
})


app.get('/api/company/msk/teploschetchikovJson', (req, res) => {
  res.send(teploschetchikovJson)
})




app.post('/api/toparsing', async () => {
  await Promise.allSettled([
    await ParserFunc(msk1, mskpath1, 'msk'),
    await ParserFunc(msk2, mskpath2, 'msk'),
    await ParserFunc(msk3, mskpath3, 'msk'),
    await ParserFunc(msk4, mskpath4, 'msk'),
    await ParserFunc(msk5, mskpath5, 'msk'),
    await ParserFunc(msk6, mskpath6, 'msk'),
  ])
}
)

app.use('/static', express.static('src/files'))

server.listen(port, () => { console.log('server listening', port) });