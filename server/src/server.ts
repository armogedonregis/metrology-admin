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


const url1 = 'https://spb.vodochet.ru'
const path1 = 'home'

const url2 = 'https://spb.vodochet.ru/zamena-schetchikov-vody-rating'
const path2 = 'home'

const url3 = 'https://spb.vodochet.ru/ustanovka-schetchikov-vody-rating'
const path3 = 'home'

const url4 = 'https://spb.vodochet.ru/poverka-teploschetchikov'
const path4 = 'home'

const url5 = 'https://spb.vodochet.ru/zamena-teploschetchikov-rating'
const path5 = 'home'

const url6 = 'https://spb.vodochet.ru/ustanovka-teploschetchikov-rating'
const path6 = 'home'

const url7 = 'https://spb.vodochet.ru/ustanovka-konditsionerov'
const path7 = 'home'

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


app.post('/api/rating-msk-1', async () => {
    await ParserFunc(msk1, mskpath1, 'msk')
}
)

app.post('/api/rating-msk-2', async () => {
    await ParserFunc(msk2, mskpath2, 'msk')
}
)

app.post('/api/rating-msk-3', async () => {
  await ParserFunc(msk3, mskpath3, 'msk')
}
)

app.post('/api/rating-msk-4', async () => {
  await ParserFunc(msk4, mskpath4, 'msk')
}
)

app.post('/api/rating-msk-5', async () => {
  await ParserFunc(msk5, mskpath5, 'msk')
}
)

app.post('/api/rating-msk-6', async () => {
  await ParserFunc(msk6, mskpath6, 'msk')
}
)

app.use('/static', express.static('src/files'))

server.listen(port, () => { console.log('server listening', port) });