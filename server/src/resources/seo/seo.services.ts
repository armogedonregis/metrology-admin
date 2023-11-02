import prisma from '@/utils/prisma'

// получение всех seo
async function seoGetPrisma() {
  const seo = await prisma.seo.findFirst()
  return seo
}

// обновление seo по name
async function seoUpdatePrisma(id: string, name: string, title: string, description: string, keyword: string) {
  const seo = await prisma.seo.update({
    where: { id },
    data: {
      name,
      title,
      description,
      keyword,
      updatedAt: new Date(),
    },
  })
  return seo
}

export default { seoGetPrisma, seoUpdatePrisma }
