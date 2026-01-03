// Session management for authentication
import { cookies } from 'next/headers'
import { prisma } from './db'
import crypto from 'crypto'

/**
 * TODO: Create a new session for a user
 * @param {string} userId - User ID to create session for
 * @returns {Promise<string>} Session token
 */
export async function createSession(userId) {
  if (!userId) throw new Error('Missing userId')
  const token = crypto.randomBytes(32).toString('hex')
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
  await prisma.session.create({
    data: { token, userId, expiresAt }
  })
  const c = await cookies()
  c.set('session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    expires: expiresAt
  })
  return { token, expiresAt }
}

/**
 * TODO: Get session and user data from session token
 * @param {string} sessionToken - Session token to validate
 * @returns {Promise<Object|null>} Session with user data or null
 */
export async function getSession(sessionToken) {
  if (!sessionToken || typeof sessionToken !== 'string') return null
  const session = await prisma.session.findUnique({
    where: { token: sessionToken },
    include: { user: true }
  })
  if (!session) return null
  if (new Date(session.expiresAt).getTime() < Date.now()) {
    // Expired: clean up
    try {
      await prisma.session.delete({ where: { token: sessionToken } })
    } catch {}
    return null
  }
  return session
}

/**
 * TODO: Get current user from session (for server components)
 * @returns {Promise<Object|null>} User object or null
 */
export async function getSessionUser() {
  const c = await cookies()
  const token = c.get('session')?.value
  const session = await getSession(token)
  return session?.user ?? null
}

/**
 * TODO: Delete a session (logout)
 * @param {string} sessionToken - Session token to delete
 */
export async function deleteSession(sessionToken) {
  if (!sessionToken) return
  try {
    await prisma.session.delete({ where: { token: sessionToken } })
  } catch {}
  const c = await cookies()
  c.set('session', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    expires: new Date(0)
  })
}
