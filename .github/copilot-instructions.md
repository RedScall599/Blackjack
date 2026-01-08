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

CCC.1.1

Understand and identify a problem
I can identify and understand a relevant problem within my field of study, its implications, and the context surrounding the problem.

I can plan for constraints and potential impacts related to the problem.

I can proactively recognize future challenges connected to the problem. 

I can evaluate solutions that have previously been attempted and describe their successes and failures.

I can evaluate solution options and assess which solution best addresses factors such as urgency, complexity, available resources, and potential impact.


About Page

README section

 
 	
CCC.1.2

Identify and plan a solution
 	
I can identify a solution that solves the problem and identifies potential challenges including technical resource requirements (e.g., database limitations, cloud resources, technical skill or time constraint for the project etc.) 

I can create a detailed project plan that outlines implementation of my solution and uses project management tools that embrace Sprints and Agile methodologies.


Architecture explanation

 
 	
CCC.1.3

Implement a solution
 	
I can implement a solution using the most appropriate industry-accepted method (e.g., Agile, DevOps, Interface, Constructor, Implementation) that leads to effective implementation of the solution.

I can implement a solution that applies at least two appropriate tools and/or best practices that relates to the problem I aim to solve.

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
Artifact:
README
A clear README.md


Project overview
Problem summary
Features (include what your AI integration is doing)
Tech stack (Next.js, tools used)
How to run the project
Reflection: what worked, what didn’t, what you’d improve
Website: 
Page 1 - Home
Explain what your app is and how it helps users solve the problem. 



App name + short “who will benefit the most from the product” 
Button/link to your solution (the main app feature)
Navigation to all pages
Website: 
Page 2 - About
Problem Overview prove you understand the problem (CCC.1.1)
What the problem is (in your own words) 
Explain how this problem shows up in real life, especially for young people like yourself
Share why this problem is difficult to solve and what constraints exist (time, tech, skills, resources)
Explain what happens if the problem is not solved
Include at least one personal or realistic example that shows the problem in action
One solution that already exists + what worked / what didn’t
Website: 
Page 3 - Why your product_name? 
Show your plan and explain your solution. (CCC.1.2)
Your solution idea (what you’re building and why)
Features list (what your app will do)
Challenges you expect (and how you’ll handle them)
Your project plan summary/link (sprints/tasks)
Website: 
Page 4 - Features
This is the actual working tool users interact with. (CCC.1.3)
Your core feature(s) working
Why would I buy your solution over others? 
How does AI help solve my problem?
Website: 
Page 5 - Product 


Core Product. This is where we can interact with your MVP or complete product. 


A result/output (ex: saved list, schedule, summary, progress, feedback)
A way for a user to input something OR interact (ex: tracker, form, checklist, planner)
Website: 
Page 6 - Rubric Evidence Page
[RBA for LP Staff Only] Help instructors rate you easily and fairly

rob@launchpadphilly.org -> lpuser1
sanaa@launchpadphilly.org -> lpuser2
taheera@launchpadphilly.org -> lpuser3



CCC.1.1, CCC.1.2, CCC.1.3 listed clearly
For each one: “Where to see it in my project”
Example: “CCC.1.1 is shown on the Problem Page + in README section 2”
Example:   CCC.1.2 is shown in the uploaded/linked wire frames 
Links/buttons to the exact pages/sections that prove it
Website: 
Page 7 - Reflection Page
[RBA for LP Staff Only] Helps you reach higher levels by showing future challenges, constraints, and smart decisions.
Must include:
What went well
What didn’t go well
What you changed during the project and why
What you’d build next if you had more time 

