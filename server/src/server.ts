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


const sb1 = 'https://spb.vodochet.ru'
const spbpath1 = 'home'

const sb2 = 'https://spb.vodochet.ru/zamena-schetchikov-vody-rating'
const spbpath2 = 'zamena-schetchikov-vody-rating'

const sb3 = 'https://spb.vodochet.ru/ustanovka-schetchikov-vody-rating'
const spbpath3 = 'ustanovka-schetchikov-vody-rating'

const sb4 = 'https://spb.vodochet.ru/poverka-teploschetchikov'
const spbpath4 = 'poverka-teploschetchikov'

const sb5 = 'https://spb.vodochet.ru/zamena-teploschetchikov-rating'
const spbpath5 = 'zamena-teploschetchikov-rating'

const sb6 = 'https://spb.vodochet.ru/ustanovka-teploschetchikov-rating'
const spbpath6 = 'ustanovka-teploschetchikov-rating'

const sb7 = 'https://spb.vodochet.ru/ustanovka-konditsionerov'
const spbpath7 = 'ustanovka-konditsionerov'

app.post('/api/login', userControllers.userLogin)

app.use('/api/note', noteRouter)

app.use('/api', seoRouter)

app.get('/api/user', authenticate, userControllers.userGet)

app.get('/api/company/msk/home', (req, res) => {
  res.send(require('./data/msk/home/output.json'))
})

app.get('/api/company/msk/poverkaJson', (req, res) => {
  res.send(require('./data/msk/poverka-teploschetchikov-v-moskve-raiting/output.json'))
})

app.get('/api/company/msk/ustanovkaJson', (req, res) => {
  res.send(require('./data/msk/ustanovka-schetchikov-tepla-v-moskve-raiting/output.json'))
})


app.get('/api/company/msk/schetchikovJson', (req, res) => {
  res.send(require('./data/msk/ustanovka-schetchikov-vody-v-moskve-raiting/output.json'))
})

app.get('/api/company/msk/zamenaJson', (req, res) => {
  res.send(require('./data/msk/zamena-schetchikov-vody-v-moskve-raiting/output.json'))
})


app.get('/api/company/msk/teploschetchikovJson', (req, res) => {
  res.send(require('./data/msk/zamena-teploschetchikov-v-moskve-raiting/output.json'))
})

app.get('/api/company/spb/home', (req, res) => {
  res.send(require('./data/spb/home/output.json'))
})
app.get('/api/company/spb/poverkaTepl', (req, res) => {
  res.send(require('./data/spb/poverka-teploschetchikov/output.json'))
})
app.get('/api/company/spb/ustanovkaVody', (req, res) => {
  res.send(require('./data/spb/ustanovka-schetchikov-vody-rating/output.json'))
})
app.get('/api/company/spb/ustanovkaTepl', (req, res) => {
  res.send(require('./data/spb/ustanovka-teploschetchikov-rating/output.json'))
})
app.get('/api/company/spb/ustanovkaKond', (req, res) => {
  res.send(require('./data/spb/ustanovka-konditsionerov/output.json'))
})
app.get('/api/company/spb/zamenaVody', (req, res) => {
  res.send(require('./data/spb/zamena-schetchikov-vody-rating/output.json'))
})
app.get('/api/company/spb/zamenaTepl', (req, res) => {
  res.send(require('./data/spb/zamena-teploschetchikov-rating/output.json'))
})


app.post('/api/rating-msk-1', async (req, res) => {
  await ParserFunc(msk1, mskpath1, 'msk')
    .finally(() => res.json({ message: 'Успешно' }))
}
)

app.post('/api/rating-msk-2', async (req, res) => {
  await ParserFunc(msk2, mskpath2, 'msk')
    .finally(() => res.json({ message: 'Успешно' }))
}
)

app.post('/api/rating-msk-3', async (req, res) => {
  await ParserFunc(msk3, mskpath3, 'msk')
    .finally(() => res.json({ message: 'Успешно' }))
}
)

app.post('/api/rating-msk-4', async (req, res) => {
  await ParserFunc(msk4, mskpath4, 'msk')
    .finally(() => res.json({ message: 'Успешно' }))
}
)

app.post('/api/rating-msk-5', async (req, res) => {
  await ParserFunc(msk5, mskpath5, 'msk')
    .finally(() => res.json({ message: 'Успешно' }))
}
)

app.post('/api/rating-msk-6', async (req, res) => {
  await ParserFunc(msk6, mskpath6, 'msk')
    .finally(() => res.json({ message: 'Успешно' }))
}
)

app.post('/api/rating-spb-1', async (req, res) => {
  await ParserFunc(sb1, spbpath1, 'spb')
    .finally(() => res.json({ message: 'Успешно' }))
}
)

app.post('/api/rating-spb-2', async (req, res) => {
  await ParserFunc(sb2, spbpath2, 'spb')
    .finally(() => res.json({ message: 'Успешно' }))
}
)


app.post('/api/rating-spb-3', async (req, res) => {
  await ParserFunc(sb3, spbpath3, 'spb')
    .finally(() => res.json({ message: 'Успешно' }))
}
)


app.post('/api/rating-spb-4', async (req, res) => {
  await ParserFunc(sb4, spbpath4, 'spb')
    .finally(() => res.json({ message: 'Успешно' }))
}
)


app.post('/api/rating-spb-5', async (req, res) => {
  await ParserFunc(sb5, spbpath5, 'spb')
    .finally(() => res.json({ message: 'Успешно' }))
}
)

app.post('/api/rating-spb-6', async (req, res) => {
  await ParserFunc(sb6, spbpath6, 'spb')
    .finally(() => res.json({ message: 'Успешно' }))
}
)


app.post('/api/rating-spb-7', async (req, res) => {
  await ParserFunc(sb7, spbpath7, 'spb')
    .finally(() => res.json({ message: 'Успешно' }))
}
)

app.use('/api/static', express.static('src/files'))

server.listen(port, () => { console.log('server listening', port) });