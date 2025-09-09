# Rural Education Platform

A gamified learning platform designed specifically for rural education with offline capabilities and mobile optimization.

## Features

- **Role-based Authentication**: Students, Teachers, and Admins
- **Interactive Learning**: Games, quizzes, and STEM lessons with animations
- **Gamification**: Badges, leaderboards, and progress tracking
- **Offline Mode**: Downloadable content with auto-sync capabilities
- **Multilingual Support**: English and Hindi language support
- **Mobile Optimized**: Lightweight design for low-cost devices
- **Teacher Tools**: Quiz creation and game upload functionality
- **Analytics**: Progress tracking and reporting

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd rural-education-platform
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Demo Credentials

**Student Account:**
- Email: student@rural.edu
- Password: password

**Teacher Account:**
- Email: teacher@rural.edu
- Password: password

**Admin Account:**
- Email: admin@rural.edu
- Password: password

## VS Code Setup

This project is optimized for VS Code development:

1. Install recommended extensions:
   - ES7+ React/Redux/React-Native snippets
   - Tailwind CSS IntelliSense
   - TypeScript Importer
   - Prettier - Code formatter

2. The project includes proper TypeScript configuration for VS Code IntelliSense

3. Use `Ctrl+Shift+P` and search for "TypeScript: Restart TS Server" if you encounter any IntelliSense issues

## Project Structure

```
src/
├── components/
│   ├── auth/           # Authentication components
│   ├── common/         # Shared components
│   ├── student/        # Student-specific components
│   └── teacher/        # Teacher-specific components
├── contexts/           # React contexts
├── types/             # TypeScript type definitions
└── App.tsx            # Main application component
```

## Key Features for Teachers

- **Quiz Creator**: Create custom quizzes with multiple question types
- **Game Uploader**: Upload interactive learning games with file management
- **Student Analytics**: Track student progress and performance
- **Content Management**: Manage lessons and educational content

## Mobile Optimization

- Responsive design that works on all screen sizes
- Touch-friendly interfaces
- Optimized for low-bandwidth connections
- Lightweight assets and efficient loading

## Offline Capabilities

- Download lessons and games for offline use
- Auto-sync progress when connection is restored
- Offline mode indicator
- Local storage for user data

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.