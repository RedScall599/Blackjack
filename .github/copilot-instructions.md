Blackjack Royale – Development & Explanation Guide
Project Overview

Blackjack Royale is a web-based Blackjack game that teaches probability, decision-making, and risk management.
Users create an account, play Blackjack, and have their coin balance saved and updated based on wins and losses.

Built as an MVP using Next.js (App Router), PostgreSQL (Neon), and Prisma, focusing on database persistence and authentication.

Core Problem (CCC.1.1)

Many online games do not save progress

Players lose data when refreshing or leaving

No accountability without user accounts

Coin systems feel fake if not persisted

Why This Matters

Users want progress to matter

Games need fair rules and tracking

Without a database:

Coins reset

Wins don’t count

No long-term engagement

Solution Overview (CCC.1.2)

Build a real Blackjack game

Use authentication to identify users

Use a database to store:

User accounts

Coin balances

Game results

Enforce real Blackjack rules

Tech Stack (Always Assume)

Frontend: Next.js App Router

Backend: Next.js API Routes

Database: PostgreSQL (Neon)

ORM: Prisma

Language: JavaScript

Auth: Email + password with sessions

Cookies: HTTP-only

Authentication System
Auth Rules

Users must log in to play

Each user has:

id

email

hashed password

coin balance

Sessions stored in database (not JWT)

Auth Flow (Explain Every Time)

User submits login/signup form

Password is hashed

User record is verified

Session is created

Session token stored in cookie

User stays logged in across refreshes

API Auth Pattern (REQUIRED)
export async function POST(request) {
  const sessionToken = request.cookies.get('session')?.value
  const session = await getSession(sessionToken)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
}

Database Schema (Blackjack-Focused)
User Table

Represents a real player

Fields:

id

email

password

coins

createdAt

Game Table

Stores each Blackjack round

Fields:

id

userId

betAmount

result (win / lose / push)

coinsChange

createdAt

Why This Exists

Users → identity + balance

Games → proof of play

Coins → persistent rewards

Blackjack Rules (MUST FOLLOW)

Deck of 52 cards

Dealer hits until 17

Face cards = 10

Ace = 1 or 11

Blackjack = Ace + 10

Bust = over 21

Win:

Player > dealer

Dealer busts

Lose:

Player busts

Dealer > player

Push:

Same total

Coin System

New users start with fixed coins (example: 100)

User places a bet before hand

On win:

Coins increase

On loss:

Coins decrease

On push:

Coins unchanged

Coin updates are saved in database after every game

API Responsibilities
/api/auth

Signup

Login

Logout

Session validation

/api/game/play

Validate session

Validate bet

Run Blackjack logic

Calculate win/loss

Update user coins

Save game result

Page Mapping to Requirements
Page 1 – Home

Explain what Blackjack Royale is

Who benefits:

Players

Students learning probability

Button to Play

Navigation

Page 2 – About (CCC.1.1)

Explain problem:

Games without persistence

Real-life example:

Losing progress after refresh

Why it’s hard:

Auth

Databases

Game logic

Existing solution comparison

Page 3 – Why Blackjack Royale? (CCC.1.2)

Why this solution

Features:

Login

Coin tracking

Real Blackjack rules

Challenges:

State management

Fair logic

Secure auth

Project plan / sprints

Page 4 – Features (CCC.1.3)

Play Blackjack

Bet coins

See coin balance update

AI explanation:

Odds

Dealer logic

Decision-making

Page 5 – Product

Main Blackjack game UI

User interaction:

Hit

Stand

Bet

Output:

Win/Loss

Coins updated

Page 6 – Rubric Evidence

CCC.1.1:

About Page

README section

CCC.1.2:

Architecture explanation

CCC.1.3:

Live game demo

Buttons linking directly to proof

Page 7 – Reflection

What worked

What failed

What changed

What you’d add next:

Leaderboard

Statistics

Multiplayer

How Copilot Should Respond

Bullet points only

Beginner-friendly

Always explain:

Why database is needed

Why auth is needed

Explicitly say:

“This supports CCC.1.1…”

“This is visible on Page X…”

No paragraphs

No skipping steps