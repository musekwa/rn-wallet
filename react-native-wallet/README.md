# React Native Wallet App

A full-stack mobile wallet application built with React Native (Expo) and Node.js/Express backend. This application allows users to manage their financial transactions with features for tracking income, expenses, and generating financial summaries.

## 🏗️ Project Structure

```
react-native-wallet/
├── backend/                 # Node.js/Express API server
│   ├── src/
│   │   ├── config/         # Database and Upstash Redis configuration
│   │   ├── controllers/    # Business logic controllers
│   │   ├── middleware/     # Rate limiting middleware
│   │   ├── routes/         # API route definitions
│   │   └── server.js       # Main server entry point
│   ├── package.json
│   └── package-lock.json
├── mobile/                 # React Native (Expo) mobile application
│   ├── app/               # App router pages (Expo Router)
│   ├── app-example/       # Example implementation with tabs
│   ├── components/        # Reusable React components
│   ├── constants/         # App constants and themes
│   ├── hooks/            # Custom React hooks
│   ├── assets/           # Images, fonts, and other assets
│   ├── app.json          # Expo configuration
│   ├── eas.json          # EAS Build configuration
│   └── package.json
└── README.md
```

## 🚀 Features

### Backend API Features

- **Transaction Management**: Create, read, and delete financial transactions
- **User-specific Data**: All transactions are tied to specific user IDs
- **Financial Summary**: Calculate income, expenses, and balance for users
- **Rate Limiting**: Built-in protection against API abuse using Upstash Redis
- **Database Integration**: PostgreSQL database with Neon serverless connection
- **RESTful API**: Clean and well-structured API endpoints

### Mobile App Features

- **Cross-platform**: Works on iOS, Android, and Web
- **Modern UI**: Built with Expo Router and React Navigation
- **TypeScript Support**: Full TypeScript implementation for type safety
- **Responsive Design**: Adaptive layouts for different screen sizes
- **Native Performance**: Uses React Native's new architecture (Fabric)

## 🛠️ Technology Stack

### Backend

- **Runtime**: Node.js with ES modules
- **Framework**: Express.js
- **Database**: PostgreSQL (Neon serverless)
- **Rate Limiting**: Upstash Redis
- **Environment**: dotenv for configuration
- **Development**: nodemon for hot reloading

### Frontend (Mobile)

- **Framework**: React Native with Expo
- **Routing**: Expo Router (file-based routing)
- **Navigation**: React Navigation v7
- **Language**: TypeScript
- **UI Components**: Expo Vector Icons, Expo Image
- **Animations**: React Native Reanimated
- **Gestures**: React Native Gesture Handler

## 📋 Prerequisites

Before running this project, ensure you have:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Expo CLI** (`npm install -g @expo/cli`)
- **PostgreSQL database** (Neon recommended)
- **Upstash Redis account** (for rate limiting)

## ⚙️ Environment Setup

### Backend Environment Variables

Create a `.env` file in the `backend/` directory:

```env
# Database Configuration
DATABASE_URL=your_neon_postgresql_connection_string

# Upstash Redis Configuration
UPSTASH_REDIS_REST_URL=your_upstash_redis_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token

# Server Configuration
PORT=5001
```

### Mobile Environment Variables

The mobile app doesn't require environment variables for basic functionality, but you may want to configure API endpoints.

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd react-native-wallet
```

### 2. Backend Setup

```bash
cd backend
npm install
```

### 3. Mobile App Setup

```bash
cd mobile
npm install
```

## 🏃‍♂️ Running the Application

### Backend Development

```bash
cd backend
npm run dev
```

The API server will start on `http://localhost:5001` (or your configured PORT).

### Mobile App Development

```bash
cd mobile
npm start
```

This will start the Expo development server. You can then:

- Press `i` for iOS simulator
- Press `a` for Android emulator
- Scan the QR code with Expo Go app on your device
- Press `w` for web browser

## 📊 API Endpoints

### Base URL

```
http://localhost:5001/api/transactions
```

### Endpoints

| Method   | Endpoint           | Description                      | Parameters                               |
| -------- | ------------------ | -------------------------------- | ---------------------------------------- |
| `POST`   | `/`                | Create a new transaction         | `user_id`, `title`, `amount`, `category` |
| `GET`    | `/:userId`         | Get all transactions for a user  | `userId` (path parameter)                |
| `GET`    | `/summary/:userId` | Get financial summary for a user | `userId` (path parameter)                |
| `DELETE` | `/:id`             | Delete a transaction             | `id` (path parameter)                    |

### Example API Usage

#### Create Transaction

```bash
curl -X POST http://localhost:5001/api/transactions \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": "user123",
    "title": "Grocery Shopping",
    "amount": -50.00,
    "category": "Food"
  }'
```

#### Get User Transactions

```bash
curl http://localhost:5001/api/transactions/user123
```

#### Get Financial Summary

```bash
curl http://localhost:5001/api/transactions/summary/user123
```

#### Delete Transaction

```bash
curl -X DELETE http://localhost:5001/api/transactions/1
```

## 🗄️ Database Schema

### Transactions Table

```sql
CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    category VARCHAR(255),
    created_at DATE NOT NULL DEFAULT CURRENT_DATE
);
```

## 🔧 Configuration

### Expo Configuration (app.json)

The mobile app is configured with:

- **App Name**: mobile
- **Bundle ID**: com.evar.mobile (Android)
- **Orientation**: Portrait
- **New Architecture**: Enabled
- **Edge-to-Edge**: Enabled (Android)
- **TypeScript**: Enabled with typed routes

### EAS Build Configuration

The project includes EAS Build configuration for:

- **Development builds**: With development client
- **Preview builds**: Internal distribution
- **Production builds**: With auto-increment versioning

## 🚀 Deployment

### Backend Deployment

The backend can be deployed to various platforms:

- **Vercel**: For serverless deployment
- **Railway**: For traditional server deployment
- **Heroku**: For container-based deployment

### Mobile App Deployment

Use EAS Build for mobile app deployment:

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Build for production
eas build --platform all
```

## 🧪 Development Scripts

### Backend Scripts

```bash
npm run dev      # Start development server with nodemon
npm start        # Start production server
```

### Mobile Scripts

```bash
npm start        # Start Expo development server
npm run android  # Start on Android emulator
npm run ios      # Start on iOS simulator
npm run web      # Start web version
npm run lint     # Run ESLint
```

## 🔒 Security Features

- **Rate Limiting**: 100 requests per 60 seconds using Upstash Redis
- **Input Validation**: Server-side validation for all API inputs
- **Error Handling**: Comprehensive error handling with appropriate HTTP status codes
- **CORS**: Enabled for cross-origin requests

## 📱 Supported Platforms

- **iOS**: 13.0+ (with tablet support)
- **Android**: API level 21+ (with edge-to-edge support)
- **Web**: Modern browsers with Metro bundler

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License - see the package.json files for details.

## 🆘 Troubleshooting

### Common Issues

1. **Database Connection Error**

   - Verify your DATABASE_URL in the .env file
   - Ensure your Neon database is accessible

2. **Rate Limiting Issues**

   - Check your Upstash Redis credentials
   - Verify the Redis instance is active

3. **Mobile App Won't Start**

   - Clear Expo cache: `expo start --clear`
   - Reset Metro bundler: `npx expo start --clear`

4. **Build Failures**
   - Update Expo CLI: `npm install -g @expo/cli@latest`
   - Check EAS CLI version: `eas --version`

## 📞 Support

For support and questions:

- Check the [Expo Documentation](https://docs.expo.dev/)
- Review [React Navigation Docs](https://reactnavigation.org/)
- Consult [Express.js Documentation](https://expressjs.com/)

---

**Built with ❤️ using React Native, Expo, and Node.js**
