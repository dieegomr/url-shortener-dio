import { Request, Response } from 'express'
import shortId from 'shortid'
import { config } from '../config/Constants'

export class URLController {
    public async shorten(req: Request, res: Response): Promise<void>{
        //ver se a url nao existe
        //criar o hash para essa url
        const { oringinURL } = req.body
        const hash = shortId.generate()
        const shortURL = `${config.API_URL}/${hash}`
        //salvar a url no banco
        //retornar a url que salvamos
        res.json({ oringinURL, hash, shortURL})
    }

    public async redirect(req: Request, res: Response): Promise<void> {
        //pegar hash url
        const { hash } = req.params
        //encontrar a url original pelo hash
        const url = {
            originURL: "https://www.youtube.com/watch?v=-ZuAxenJBLA",
            shortURL: "http://localhost:4000/43gMTVN1J",
        }
        //redirecionar para a url original a partir do que encontramos no DB
        res.redirect(url.originURL)
    }
}