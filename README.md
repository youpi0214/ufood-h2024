

---

# UFood

UFood is a collaborative web application designed to help users discover restaurants, share favorites with friends, and track dining experiences. The application includes features like restaurant search, user profiles, dynamic filtering, and interactive maps.

---

## Features

- **Restaurant Discovery**: Search and filter restaurants by genre, price range, and more.
- **User Profiles**: View recent visits, manage favorite restaurants, and track user scores.
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices.
- **Dynamic Integration**: Integration with APIs for live restaurant data and map functionality.
- **Authentication**: User login, registration, and secure token management.

---

## Installation

Follow these steps to set up the project locally:

### Prerequisites
- Node.js and npm installed.
- Git installed on your machine.

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/saelf9/ufood-h2024.git
   ```
2. Navigate to the project directory:
   ```bash
   cd ufood-h2024
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run serve
   ```
5. Open your browser and navigate to:
   ```
   http://localhost:8080
   ```

---

## Project Structure

```
src/
├── assets/         # Images and static files
├── components/     # Vue components (Navbar, Hero, etc.)
├── views/          # Page-level Vue components
├── router/         # Vue Router configuration
├── App.vue         # Root Vue component
└── main.js         # Entry point for the application
```

---

## Technologies Used

- **Frontend Framework**: Vue.js
- **Styling**: Tailwind CSS, optional Bootstrap
- **API Integration**: RESTful APIs for dynamic data
- **Mapping**: Google Maps API
- **Build Tool**: Vite

---

## How to Use

### Features:
1. **Homepage**:
   - View a list of restaurants.
   - Use the search bar and filters for specific restaurants.
2. **Restaurant Details**:
   - View detailed information including name, address, phone, and images.
   - Access maps and directions.
3. **User Profiles**:
   - Manage favorite restaurant lists.
   - View recently visited restaurants.

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature-name"
   ```
4. Push the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Acknowledgments

This project was developed as part of a collaborative session project. Special thanks to all team members for their contributions.

---
