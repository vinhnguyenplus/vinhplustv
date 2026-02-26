# Travel Bill Split App

Fullstack web app for splitting travel expenses (Splitwise style) with bill image upload, summary (+/-), optimized settlement transactions, and export to PDF/Excel.

## Project Structure

```text
backend/
  controllers/
  middleware/
  models/
  routes/
  scripts/
  utils/
  server.js
frontend/
  src/
    api/
    components/
    pages/
    store/
    types/
    utils/
```

## Features

- Create trip with members
- Add expenses with:
  - who paid
  - equal/custom split
  - category/date/notes
  - bill image upload (Multer local storage)
- Auto settlement report:
  - paid/share/balance per member
  - optimized transfer instructions
- Final report export to PDF and Excel
- Responsive dashboard UI using Tailwind

## Setup

### 1) Backend

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

Optional seed:

```bash
npm run seed
```

### 2) Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Frontend: http://localhost:5173
Backend: http://localhost:5000

## API Endpoints

- `POST /api/trips` create trip
- `GET /api/trips` list trips
- `GET /api/trips/:tripId/report` fetch expenses + summary + settlements
- `POST /api/expenses` create expense (multipart/form-data)
- `GET /api/expenses/trip/:tripId` list expenses by trip

## Notes

- Settlement logic is in `backend/utils/settlement.js`
- Bill images are served from `/uploads`
- Rounding is normalized to 2 decimals for consistent settlement
