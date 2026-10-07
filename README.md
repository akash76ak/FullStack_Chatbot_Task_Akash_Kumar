# FullStack Chatbot Task - Akash Kumar

## Project Description

**FullStack AI Support & Lead Assistant** is a responsive full-stack web application developed for the Full Stack Developer Internship practical assignment.

The application provides a rule-based chatbot for common customer questions, collects enquiries, stores them in SQLite, and provides an Admin Dashboard for managing enquiries.

## Technologies Used

- **Frontend:** React.js, TypeScript, Vite, CSS, Lucide React
- **Backend:** Node.js, Express.js, TypeScript
- **Database:** SQLite3
- **API:** REST API
- **Tools:** VS Code, npm, Git/GitHub

## Features

### Chatbot

- Welcome message
- Predefined/rule-based responses
- Services information
- Pricing information
- Contact information
- User question input
- Book / Enquire option

### Enquiry Collection

The enquiry form collects:

- Full Name
- Email Address
- Phone Number
- Service
- Query / Requirement

Submitted enquiries are stored in the SQLite database.

### Admin Dashboard

- View enquiries
- Search by name, email or phone
- Filter by status
- Change status: Pending, In Progress, Resolved
- Delete enquiries

### Database

SQLite is initialized automatically by the backend. The `enquiries` table contains:

| Field     | Description        |
| --------- | ------------------ |
| id        | Unique enquiry ID  |
| name      | Customer name      |
| email     | Customer email     |
| phone     | Customer phone     |
| service   | Selected service   |
| message   | Customer query     |
| status    | Enquiry status     |
| createdAt | Creation date/time |

## Project Structure

```text
FullStack_Chatbot_Task_Mohd_Junaid/
├── backend/
│   ├── src/
│   │   ├── config/database.ts
│   │   ├── controllers/enquiryController.ts
│   │   ├── routes/enquiryRoutes.ts
│   │   └── index.ts
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Chatbot.tsx
│   │   │   └── EnquiryDashboard.tsx
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
└── README.md
```

## Requirements

Install **Node.js and npm** before running the project.

Check installation:

```bash
node --version
npm --version
```

## Backend Setup

Open a terminal:

```bash
cd backend
npm install
```

Create `backend/.env`:

```env
PORT=5000
```

Start the backend:

```bash
npm run dev
```

Backend URL:

```text
http://localhost:5000
```

The SQLite database is created automatically when the backend starts.

## Frontend Setup

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the Vite URL shown in the terminal, normally:

```text
http://localhost:5173
```

## API Documentation

Base URL:

```text
http://localhost:5000/api
```

### Create Enquiry

**POST** `/api/enquiries`

Example body:

```json
{
  "name": "Mohd Junaid",
  "email": "junaid@example.com",
  "phone": "9876543210",
  "service": "Drone Filming",
  "message": "I need information about drone filming."
}
```

### Get Enquiries

**GET** `/api/enquiries`

Search:

```text
/api/enquiries?search=Junaid
```

Status filter:

```text
/api/enquiries?status=Pending
```

### Update Status

**PATCH** `/api/enquiries/:id`

Example body:

```json
{
  "status": "Resolved"
}
```

### Delete Enquiry

**DELETE** `/api/enquiries/:id`

## Application Workflow

```text
User
  -> React Chatbot
  -> FAQ response OR Enquiry Form
  -> REST API
  -> Express Backend
  -> SQLite Database
  -> Admin Dashboard
```

## Testing Checklist

Before submission, verify:

- [ ] Frontend opens
- [ ] Backend starts
- [ ] Chatbot loads
- [ ] Services response works
- [ ] Pricing response works
- [ ] Contact response works
- [ ] User can type a question
- [ ] Enquiry form works
- [ ] Form validation works
- [ ] Enquiry is saved
- [ ] Admin Dashboard loads
- [ ] Search works
- [ ] Status filtering works
- [ ] Status update works
- [ ] Delete works
- [ ] No errors in browser console or backend terminal

## Screenshots

Recommended screenshots for the submission:

1. Chatbot home screen
2. FAQ response
3. Enquiry form
4. Successful enquiry submission
5. Admin Dashboard
6. Search/filtering
7. Status update
8. Database/schema

## Security Notes

Do not upload secrets to GitHub.

Do not commit:

```text
.env
node_modules/
database.sqlite
dist/
```

Use `.env.example` for environment variable documentation.

## GitHub

Recommended repository name:

```text
FullStack_Chatbot_Task_Mohd_Junaid
```

Upload the frontend source, backend source, package files, configuration files and this README.

## Google Drive Submission Structure

```text
FullStack_Chatbot_Task_Mohd_Junaid/
├── 01_Source_Code/
├── 02_Screenshots/
├── 03_API_Documentation/
├── 04_Database/
├── 05_Video_Walkthrough/
├── 06_GitHub/
└── 07_Resume/
```

- **01_Source_Code:** Complete source code
- **02_Screenshots:** Application screenshots
- **03_API_Documentation:** API documentation/Postman collection
- **04_Database:** Database schema/setup information
- **05_Video_Walkthrough:** 5-10 minute project demonstration
- **06_GitHub:** GitHub repository URL
- **07_Resume:** Updated PDF resume

## Important

The chatbot is intentionally **rule-based** and does not require an external AI/LLM API. The project demonstrates React.js/TypeScript frontend development, REST API development, database integration, CRUD operations, form validation, search/filtering and an admin dashboard.

## Author

**Akash Kumar**

Full Stack Developer Internship Assignment
