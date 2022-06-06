import express, { Request, Response} from 'express'
import { URLController } from './controller/URLcontroller'

const api = express()
api.use(express.json())

const urlController = new URLController() 
api.post('/shorten', urlController.shorten)
api.get('/:hash', urlController.redirect)


api.listen(4000, () => console.log('Express listening'));