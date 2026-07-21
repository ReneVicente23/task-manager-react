const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
 
async function main() {
  await prisma.tarea.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      titulo: 'Tarea de ejemplo para pruebas',
      completada: false,
    },
  })
}
 
main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
