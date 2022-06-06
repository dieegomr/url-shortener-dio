import { URLModel } from '../database/model/URL'
import { Request, Response } from 'express'
import shortId from 'shortid'
import { config } from '../config/Constants'

export class URLController {
    public async shorten(req: Request, res: Response): Promise<void>{
        // ver se a url nao existe
        const { originURL } = req.body
        const url = await URLModel.findOne({ originURL })
        if (url) {
            res.json(url)
            return
        }
        //criar o hash para essa url
        const hash = shortId.generate()
        const shortURL = `${config.API_URL}/${hash}`
        //salvar a url no banco
        const newURL = await URLModel.create({ hash, shortURL, originURL })
        //retornar a url que salvamos
        res.json({newURL})
    }

    public async redirect(req: Request, res: Response): Promise<void> {
        //pegar hash url
        const { hash } = req.params
        const url = await URLModel.findOne({ hash })
        if (url) {
            res.redirect(url.originURL)
            return
        }
        res.status(400).json({ error: 'URL not found '})
    }
}