# Contact Management Backend

A Spring Boot REST API for managing contacts with photo upload capabilities, built with Java 21 and PostgreSQL.

## 🚀 Features

- **Contact CRUD Operations**: Create, read, update, and delete contacts
- **Photo Upload**: Upload and serve contact profile photos
- **Pagination**: Efficient contact listing with pagination support
- **Database Integration**: PostgreSQL with JPA/Hibernate
- **CORS Support**: Cross-origin resource sharing enabled for frontend integration
- **File Storage**: Local file system storage for contact photos

## 🛠️ Tech Stack

- **Java 21**
- **Spring Boot 3.5.6**
- **Spring Data JPA**
- **PostgreSQL**
- **Lombok**
- **Maven**

## 📋 Prerequisites

- Java 21 or higher
- Maven 3.6+
- PostgreSQL 12+
- Git

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <repository-url>
cd contact/backend
```

### 2. Database Setup
Create a PostgreSQL database and update the connection details in `application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/contactdb
spring.datasource.username=your_username
spring.datasource.password=your_password
```

### 3. Environment Variables
Create a `.env` file in the backend directory with your database credentials:

```env
URL=jdbc:postgresql://localhost:5432/contactdb
USERNAME=your_username
PASSWORD=your_password
```

### 4. Build and Run
```bash
# Using Maven wrapper
./mvnw spring-boot:run

# Or using Maven directly
mvn spring-boot:run
```

The API will be available at `http://localhost:8080`

## 📁 Project Structure

```
backend/
├── src/main/java/com/example/contact/
│   ├── Application.java              # Main Spring Boot application
│   ├── controller/
│   │   └── ContactController.java    # REST API endpoints
│   ├── model/
│   │   └── Contact.java              # Contact entity
│   ├── repository/
│   │   └── ContactRepo.java          # Data access layer
│   ├── service/
│   │   └── ContactService.java       # Business logic
│   ├── constant/
│   │   └── Constant.java             # Application constants
│   └── config/
│       └── CorsConfig.java           # CORS configuration
├── src/main/resources/
│   └── application.properties        # Application configuration
└── pom.xml                          # Maven dependencies
```

## 🔌 API Endpoints

### Contacts
- `POST /contacts` - Create a new contact
- `GET /contacts` - Get all contacts (paginated)
- `GET /contacts/{id}` - Get contact by ID
- `DELETE /contacts` - Delete a contact

### Photo Management
- `POST /contacts/photo` - Upload contact photo
- `GET /contacts/image/{filename}` - Get contact photo

### Query Parameters
- `page` (default: 0) - Page number for pagination
- `size` (default: 10) - Number of contacts per page

## 📊 Data Model

### Contact Entity
```java
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

## 📝 Configuration

### Database Configuration
The application uses PostgreSQL with the following default settings:
- Hibernate DDL: `update` (auto-updates schema)
- Dialect: `PostgreSQLDialect`
- Connection pooling enabled

### File Upload Configuration
- Maximum file size: 1000MB
- Maximum request size: 1000MB
- Photo storage directory: `PHOTO_DIRECTORY` (configurable)

### CORS Configuration
Cross-origin requests are enabled for frontend integration. Configure allowed origins in `CorsConfig.java` if needed.

## 🧪 Testing

Run the test suite:
```bash
./mvnw test
```

## 🚀 Deployment

### Production Build
```bash
./mvnw clean package
```

### Docker Deployment
```dockerfile
FROM openjdk:21-jdk-slim
COPY target/contact-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app.jar"]
```

## 🔧 Development

### Adding New Features
1. Create entity models in `model/` package
2. Add repository interfaces in `repository/` package  
3. Implement business logic in `service/` package
4. Create REST controllers in `controller/` package
5. Add appropriate tests

### Code Style
- Follow Spring Boot conventions
- Use Lombok annotations for boilerplate code
- Implement proper error handling
- Add comprehensive logging

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Issues**
   - Verify PostgreSQL is running
   - Check connection credentials in `.env` file
   - Ensure database exists

2. **File Upload Issues**
   - Check file size limits
   - Verify photo directory permissions
   - Ensure proper multipart configuration

3. **CORS Issues**
   - Verify CORS configuration
   - Check frontend URL in allowed origins

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📞 Support

For support and questions, please open an issue in the repository.