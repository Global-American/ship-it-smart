# Ship It Smart - Backend

A minimal Express.js API for the Ship It Smart app.

Base URL: http://localhost:4000/api/v1

Endpoints:

- GET /health
- GET /carriers
- POST /quotes
- GET /shipments
- POST /shipments
- GET /shipments/:id
- POST /shipments/:id/status
- POST /contact

## Contact endpoint

POST /contact
Body:
{
"name": "Jane Doe",
"email": "jane@example.com",
"phone": "",
"company": "ACME",
"message": "I'd like to learn more...",
"selectedBrands": ["usDomestic", "ukExports"]
}

Returns: { ok: true }

## SMTP Setup

1. Copy .env.example to .env
2. Set SMTP\_\* vars for your provider (e.g., SendGrid, Mailgun, SES, your SMTP server)
3. Set MAIL_FROM to the sender address and MAIL_TO to the destination inbox
4. Start the server and test: curl -X POST http://localhost:4000/api/v1/contact -H 'Content-Type: application/json' -d '{"name":"Test","email":"test@example.com","message":"Hello"}'

Development tip: if email is not configured, the API will return a 500 with an explanatory message.

Setup:

1. cd server
2. Copy .env.example to .env and adjust as needed
3. npm install
4. npm run dev

Example request bodies:

POST /quotes
{
"originPostal": "94107",
"destinationPostal": "10001",
"weightKg": 2.5,
"dimensionsCm": { "length": 30, "width": 20, "height": 10 },
"speed": "express",
"carrier": "ups"
}

POST /shipments
{
"toName": "Jane Doe",
"toAddress": "123 Main St",
"toPostal": "10001",
"fromName": "ACME",
"fromAddress": "500 Howard St",
"fromPostal": "94105",
"parcel": {
"weightKg": 2.5,
"dimensionsCm": { "length": 30, "width": 20, "height": 10 }
},
"carrier": "ups"
}
