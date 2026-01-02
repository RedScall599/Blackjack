// Authentication utilities
import { prisma } from './db'
import { hashPassword, verifyPassword } from './password'

/**
 * TODO: Register a new user
 * @param {Object} userData - User registration data
 * @returns {Promise<Object>} Created user object
 */
export async function register(userData) {
  const { email, password } = userData || {}
  if (!email || !password) {
    throw new Error('Email and password are required')
  }
  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    throw new Error('Email already registered')
  }
  const hashed = await hashPassword(password)
  const user = await prisma.user.create({
    data: { email, password: hashed },
    select: { id: true, email: true, coins: true, createdAt: true }
  })
  return user
}

/**
 * TODO: Authenticate user login
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<Object|null>} User object or null if invalid
 */
export async function login(email, password) {
  if (!email || !password) return null
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) return null
  const ok = await verifyPassword(password, user.password)
  if (!ok) return null
  const { id, coins, createdAt } = user
  return { id, email, coins, createdAt }
}

/**
 * TODO: Get user by ID
 * @param {string} userId - User ID
 * @returns {Promise<Object|null>} User object or null
 */
export async function getUserById(userId) {
  if (!userId) return null
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, email: true, coins: true, createdAt: true }
  })
  return user
}