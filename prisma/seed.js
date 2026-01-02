import prisma from './client.js'
import bcrypt from 'bcryptjs'

async function main() {
  console.log('🌱 Seeding Blackjack database...')

  // Clean existing data (order matters)
  await prisma.game.deleteMany()
  await prisma.session.deleteMany()
  await prisma.user.deleteMany()

  // Hash passwords
  const adminPass1 = await bcrypt.hash('lpuser1', 12)
  const adminPass2 = await bcrypt.hash('lpuser2', 12)
  const adminPass3 = await bcrypt.hash('lpuser3', 12)

  // Create admin users
  await prisma.user.createMany({
    data: [
      {
        email: 'rob@launchpadphilly.org',
        password: adminPass1,
        role: 'ADMIN',
        coins: 500
      },
      {
        email: 'sanaa@launchpadphilly.org',
        password: adminPass2,
        role: 'ADMIN',
        coins: 500
      },
      {
        email: 'taheera@launchpadphilly.org',
        password: adminPass3,
        role: 'ADMIN',
        coins: 500
      }
    ]
  })

  // Create normal test users
  const userPass = await bcrypt.hash('password123', 12)

  await prisma.user.createMany({
    data: [
      {
        email: 'player1@test.com',
        password: userPass,
        role: 'USER',
        coins: 100
      },
      {
        email: 'player2@test.com',
        password: userPass,
        role: 'USER',
        coins: 150
      }
    ]
  })

  console.log('✅ Users created')

  // Add sample game history for demo
  const user = await prisma.user.findFirst({
    where: { email: 'player1@test.com' }
  })

  if (user) {
    await prisma.game.createMany({
      data: [
        {
          userId: user.id,
          betAmount: 20,
          result: 'WIN',
          coinsChange: 20
        },
        {
          userId: user.id,
          betAmount: 10,
          result: 'LOSS',
          coinsChange: -10
        },
        {
          userId: user.id,
          betAmount: 15,
          result: 'PUSH',
          coinsChange: 0
        }
      ]
    })
  }

  console.log('🎉 Seed complete!')
  console.log('\n🔐 Admin Logins:')
  console.log('rob@launchpadphilly.org / lpuser1')
  console.log('sanaa@launchpadphilly.org / lpuser2')
  console.log('taheera@launchpadphilly.org / lpuser3')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
