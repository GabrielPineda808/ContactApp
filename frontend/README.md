# Contact Management Frontend

A modern React application for managing contacts with photo upload capabilities, built with Vite and React 19.

## 🚀 Features

- **Contact Management**: View, create, edit, and delete contacts
- **Photo Upload**: Upload and display contact profile photos
- **Responsive Design**: Mobile-friendly interface
- **Pagination**: Efficient contact listing with pagination
- **Real-time Updates**: Dynamic UI updates without page refresh
- **Toast Notifications**: User feedback for actions
- **Routing**: Single-page application with React Router

## 🛠️ Tech Stack

- **React 19.1.1**
- **Vite 7.1.7**
- **React Router DOM 7.9.2**
- **Axios 1.12.2**
- **React Toastify 11.0.5**
- **ESLint 9.36.0**

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Backend API running on `http://localhost:8080`

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### 3. Build for Production
```bash
npm run build
```

### 4. Preview Production Build
```bash
npm run preview
```

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Contact.jsx              # Individual contact component
│   │   ├── ContactDetail.jsx        # Contact detail view
│   │   ├── ContactList.jsx          # Contact list with pagination
│   │   └── Header.jsx               # Application header
│   ├── api/
│   │   ├── ContactService.jsx       # API service layer
│   │   └── ToastService.jsx         # Toast notification service
│   ├── App.jsx                      # Main application component
│   ├── main.jsx                     # Application entry point
│   └── index.css                    # Global styles
├── public/                          # Static assets
├── package.json                     # Dependencies and scripts
├── vite.config.js                   # Vite configuration
└── eslint.config.js                 # ESLint configuration
```

## 🎨 Components Overview

### App.jsx
Main application component that manages:
- Global state for contacts and pagination
- Modal for creating new contacts
- File upload handling
- API integration

### ContactList.jsx
Displays paginated list of contacts with:
- Contact cards in grid layout
- Pagination controls
- Empty state handling

### ContactDetail.jsx
Individual contact view with:
- Contact information display
- Photo upload functionality
- Edit and delete capabilities

### ContactService.jsx
API service layer providing:
- HTTP client configuration
- CRUD operations for contacts
- Photo upload handling
- Error handling

## 🔌 API Integration

The frontend communicates with the backend through REST API calls:

```javascript
// Example API calls
import { getContacts, saveContact, deleteContact } from './api/ContactService'

// Get paginated contacts
const { data } = await getContacts(page, size)

// Create new contact
const { data } = await saveContact(contactData)

// Delete contact
await deleteContact(contact)
```

## 🎯 Key Features

### Contact Management
- **Create**: Modal form with validation
- **Read**: Paginated list and detail views
- **Update**: Inline editing capabilities
- **Delete**: Confirmation and removal

### Photo Upload
- File selection and preview
- Automatic upload after contact creation
- Image display and management

### State Management
- React hooks for local state
- API response caching
- Optimistic updates

## 🎨 Styling

The application uses custom CSS with:
- Responsive grid layouts
- Modern card-based design
- Smooth animations and transitions
- Mobile-first approach

## 🧪 Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Code Style
- ESLint configuration for code quality
- React hooks best practices
- Component composition patterns
- Error boundary implementation

## 🔧 Configuration

### Vite Configuration
```javascript
// vite.config.js
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': 'http://localhost:8080'
    }
  }
})
```

### API Base URL
Update the API base URL in `ContactService.jsx`:
```javascript
const API_BASE_URL = "http://localhost:8080/contacts";
```

## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Static Hosting
The built files in `dist/` can be served by any static hosting service:
- Netlify
- Vercel
- AWS S3
- GitHub Pages

### Docker Deployment
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## 🐛 Troubleshooting

### Common Issues

1. **API Connection Issues**
   - Verify backend is running on port 8080
   - Check CORS configuration
   - Verify API endpoints

2. **Build Issues**
   - Clear node_modules and reinstall
   - Check Node.js version compatibility
   - Verify all dependencies are installed

3. **Development Issues**
   - Check browser console for errors
   - Verify React DevTools installation
   - Check network tab for API calls

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🔒 Security Considerations

- Input validation on client side
- XSS prevention with React
- Secure API communication
- File upload restrictions

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