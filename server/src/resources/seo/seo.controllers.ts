import { NextFunction, Response } from 'express'
import { Request } from 'express-jwt'
import seoServices from './seo.services'
import seoModel from './seo.model'


// получение всех seo
async function seoGet(req: Request, res: Response, next: NextFunction) {
  try {
    const seos = await seoServices.seoGetPrisma()
    if (!seos) return res.sendStatus(404)
    const seoView = seoModel(seos)

    return res.status(200).json(seoView)
  } catch (error) {
    return next(error)
  }
}


// обновление seo
async function updateSeo(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const id = req.params.id;
    const { name, title, description, keyword } = req.body;
  
    try {
      const seo = await seoServices.seoUpdatePrisma(id, name, title, description, keyword);
      if (!seo) return res.sendStatus(404);
  
      const noteView = seoModel(seo);
      return res.status(201).json(noteView);
    } catch (error) {
      return next(error);
    }
  }

export default {seoGet, updateSeo }
