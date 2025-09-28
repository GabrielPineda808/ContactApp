# Contact Management System

A full-stack contact management application with photo upload capabilities, built with Spring Boot and React.

## 🏗️ Architecture

This project follows a modern full-stack architecture:

- **Backend**: Spring Boot REST API with PostgreSQL
- **Frontend**: React SPA with Vite
- **Database**: PostgreSQL with JPA/Hibernate
- **File Storage**: Local file system for photos

## 🚀 Quick Start

### Prerequisites
- Java 21+
- Node.js 18+
- PostgreSQL 12+
- Maven 3.6+

### 1. Clone the Repository
```bash
git clone <repository-url>
cd contact
```

### 2. Database Setup
Create a PostgreSQL database:
```sql
CREATE DATABASE contactdb;
```

### 3. Backend Setup
```bash
cd backend
cp .env.example .env  # Configure your database credentials
./mvnw spring-boot:run
```

### 4. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### 5. Access the Application
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:8080`

## 📁 Project Structure

```
contact/
├── backend/                    # Spring Boot REST API
│   ├── src/main/java/         # Java source code
│   ├── src/main/resources/    # Configuration files
│   ├── pom.xml               # Maven dependencies
│   └── README.md             # Backend documentation
├── frontend/                  # React SPA
│   ├── src/                  # React source code
│   ├── public/               # Static assets
│   ├── package.json          # Node dependencies
│   └── README.md             # Frontend documentation
└── README.md                 # This file
```

## 🛠️ Tech Stack

### Backend
- **Java 21** - Programming language
- **Spring Boot 3.5.6** - Application framework
- **Spring Data JPA** - Data persistence
- **PostgreSQL** - Database
- **Lombok** - Code generation
- **Maven** - Build tool

### Frontend
- **React 19.1.1** - UI library
- **Vite 7.1.7** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client
- **React Toastify** - Notifications

## 🎯 Features

### Core Functionality
- ✅ **Contact CRUD Operations**
- ✅ **Photo Upload & Management**
- ✅ **Pagination Support**
- ✅ **Responsive Design**
- ✅ **Real-time Updates**

### Technical Features
- ✅ **RESTful API Design**
- ✅ **CORS Configuration**
- ✅ **File Upload Handling**
- ✅ **Error Handling**
- ✅ **Input Validation**

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/contacts` | Create a new contact |
| `GET` | `/contacts` | Get paginated contacts |
| `GET` | `/contacts/{id}` | Get contact by ID |
| `DELETE` | `/contacts` | Delete a contact |
| `POST` | `/contacts/photo` | Upload contact photo |
| `GET` | `/contacts/image/{filename}` | Get contact photo |

## 📊 Data Model

### Contact Entity
```json
{
  "id": "uuid",
  "name": "string",
  "email": "string",
  "title": "string", 
  "phone": "string",
  "address": "string",
  "status": "string",
  "photoUrl": "string"
}
```

## 🚀 Deployment

### Development
```bash
# Start backend
cd backend && ./mvnw spring-boot:run

# Start frontend (in new terminal)
cd frontend && npm run dev
```

### Production
```bash
# Build backend
cd backend && ./mvnw clean package

# Build frontend
cd frontend && npm run build
```


## 🔧 Configuration

### Environment Variables
Create `.env` files in the backend directory:

```env
# Database Configuration
URL=jdbc:postgresql://localhost:5432/contactdb
USERNAME=your_username
PASSWORD=your_password
```

### API Configuration
Update the API base URL in `frontend/src/api/ContactService.jsx`:
```javascript
const API_BASE_URL = "http://localhost:8080/contacts";
```

## 🧪 Testing

### Backend Tests
```bash
cd backend
./mvnw test
```

### Frontend Tests
```bash
cd frontend
npm run test
```

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🔒 Security Features

- Input validation and sanitization
- CORS configuration
- File upload restrictions
- SQL injection prevention (JPA)
- XSS protection (React)

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection**
   - Verify PostgreSQL is running
   - Check connection credentials
   - Ensure database exists

2. **CORS Issues**
   - Verify backend CORS configuration
   - Check frontend API URL

3. **File Upload Issues**
   - Check file size limits
   - Verify directory permissions
   - Ensure multipart configuration

## 📈 Performance Considerations

- **Pagination**: Efficient data loading
- **Image Optimization**: Automatic image handling
- **Caching**: React state management
- **Database Indexing**: Optimized queries

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request



---

**Built with ❤️ using Spring Boot and React**
