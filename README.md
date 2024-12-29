# PrimeWheels Backend

This is the backend system for PrimeWheels, a platform for car hiring, event promotion, and user interactions. It manages users, cars, events, bookings, payments, and reviews. 

## Features:
- User management (registration, activation, deactivation)
- Cars rentals and  bookings
- Payment processing and history tracking
- Review and rating system for events

## Project Structure
PrimeWheels-Backend/ ├── prisma/ │ ├── schema.prisma # Prisma schema for database models ├── src/ │ ├── controllers/ # Controllers for handling API requests │ │ ├── admin.controller.ts # Admin controller │ │ ├── payment.controller.ts # Payment controller │ │ └── review.controller.ts # Review controller │ ├── services/ # Business logic services │ │ ├── admin.service.ts # Admin service │ │ ├── payment.service.ts # Payment service │ │ └── review.service.ts # Review service │ ├── routes/ # API routes │ │ ├── admin.router.ts # Admin routes │ │ ├── payment.router.ts # Payment routes │ │ └── review.router.ts # Review routes │ ├── server.ts # Main server file │ └── app.ts # App configuration ├── .env # Environment variables ├── package.json # Node dependencies and scripts ├── README.md # Project documentation └── tsconfig.json # TypeScript configuration

## Tech Stack:
- Typescript
- Node.js
- Express.js
- Prisma ORM
- PostgreSQL

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/marvinabir/PrimeWheels-.git