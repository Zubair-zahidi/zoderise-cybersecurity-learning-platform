# Cybersecurity Learning Platform

A comprehensive cybersecurity training platform built with React, Node.js, Express, and MongoDB. Designed for professionals seeking hands-on security education with a focus on practical skills and modern dark UI.

## Features

- **Interactive Learning Modules**: Structured cybersecurity curriculum covering fundamentals to advanced topics
- **Hands-on Labs**: Real tool demonstrations and practical security exercises
- **Password Security Checker**: Advanced password strength analysis with visual feedback
- **Admin Dashboard**: User management, task monitoring, and system administration
- **Dark SOC-Inspired Interface**: Professional UI with glassmorphism effects
- **Role-Based Access**: User and admin roles with appropriate permissions
- **Credit System**: Track user progress and rewards
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Screenshots

### Landing Page
![Landing Page](./images/img1.png)

### Dashboard
![Dashboard](./images/img2.png)

### Password Checker
![Password Checker](./images/img3.png)

### Admin Panel
![Admin Panel](./images/img4.png)

### Additional Screenshots
![Screenshot 5](./images/img5.png)
![Screenshot 6](./images/img6.png)
![Screenshot 7](./images/img7.png)
![Screenshot 8](./images/img8.png)
![Screenshot 9](./images/img9.png)
![Screenshot 10](./images/img10.png)
![Screenshot 11](./images/img11.png)

## Installation

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- Git

### Clone the Repository

```bash
git clone https://github.com/Zubair-zahidi/cybersecurity.git
cd cybersecurity
```

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory with the following variables:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string_here
   JWT_SECRET=your_jwt_secret_here
   JWT_REFRESH_SECRET=your_jwt_refresh_secret_here
   CLIENT_URL=http://localhost:5173
   ```

   **Important**: Replace `your_mongodb_connection_string_here` with your actual MongoDB URI. For example:
   - Local MongoDB: `mongodb://localhost:27017/cybersecurity`
   - MongoDB Atlas: `mongodb+srv://username:password@cluster.mongodb.net/cybersecurity`

4. Seed the admin account:
   ```bash
   node seedAdmin.js
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd ../cybersecurity-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Admin Account

The platform comes with a pre-configured admin account for initial setup and management:

- **Email**: zahidizubair025@gmail.com
- **Password**: 123kings

You can use this account to access the admin panel and manage users. Alternatively, you can create your own admin account through the registration process and then update the role in the database.

## Running the Application

### Development Mode

1. Start the backend server:
   ```bash
   cd backend
   npm start
   ```

2. In a new terminal, start the frontend:
   ```bash
   cd cybersecurity-frontend
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`

### Production Build

1. Build the frontend:
   ```bash
   cd cybersecurity-frontend
   npm run build
   ```

2. The built files will be in the `dist` folder. Serve them using a web server or integrate with the backend.

## Project Structure

```
cybersecurity/
├── backend/                 # Node.js/Express backend
│   ├── controllers/         # Route controllers
│   ├── middleware/          # Authentication middleware
│   ├── models/             # MongoDB schemas
│   ├── routes/             # API routes
│   ├── utils/              # Utility functions
│   ├── server.js           # Main server file
│   └── package.json
├── cybersecurity-frontend/  # React frontend
│   ├── public/             # Static assets
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── store/          # State management
│   │   ├── utils/          # Utility functions
│   │   └── main.jsx        # App entry point
│   └── package.json
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user info

### Admin (Protected)
- `GET /api/admin/users` - Get all users
- `PUT /api/admin/users/:id` - Update user
- `DELETE /api/admin/users/:id` - Delete user

### Tasks
- `GET /api/tasks` - Get user tasks
- `POST /api/tasks` - Create task
- `PUT /api/tasks/:id` - Update task

## Technologies Used

- **Frontend**: React, Vite, Tailwind CSS, Lucide React
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Authentication**: JWT, bcrypt
- **State Management**: React Context
- **UI Components**: Custom components with glassmorphism

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support or questions, please open an issue on GitHub or contact the development team.

---

**Developed by Ahmad Zubair Zahidi**