import { Seo } from '@prisma/client'

export default function seoModel(seo: Seo) {
  const seoView = {
    id: seo.id,
    name: seo.name,
    title: seo.title,
    description: seo.description,
    keyword: seo.keyword,
    createdAt: seo.createdAt,
    updatedAt: seo.updatedAt,
  }
  return seoView
}
