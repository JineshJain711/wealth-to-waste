# Waste-to-Wealth: Recyclable Item Marketplace 🌱

A modern, eco-friendly digital marketplace connecting waste donors with recyclers to promote sustainable practices and circular economy.

## Features

- **Role-based Access**: Separate dashboards for Users, Recyclers, and Admins
- **Item Listing**: Users can list recyclable items for pickup
- **Pickup Management**: Recyclers can accept and manage pickup requests
- **Admin Monitoring**: Complete system oversight and user management
- **Responsive Design**: Mobile-friendly interface with Bootstrap 5
- **Modern UI**: Clean green & white theme representing eco-friendliness

## Tech Stack

- **Frontend**: React.js (Functional Components + Hooks)
- **Styling**: Bootstrap 5
- **Routing**: React Router DOM v6
- **HTTP Client**: Axios
- **Icons**: React Icons

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   └── ProtectedRoute.jsx
├── pages/
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── UserDashboard.jsx
│   ├── RecyclerDashboard.jsx
│   ├── AdminDashboard.jsx
│   ├── ItemList.jsx
│   ├── PickupRequests.jsx
│   ├── About.jsx
│   └── Contact.jsx
├── App.jsx
├── App.css
└── index.js
```

## User Roles

- **User**: List recyclable items and request pickups
- **Recycler**: Accept pickup requests and manage collections
- **Admin**: Monitor system, manage users, and oversee transactions

## Contributing

This project promotes circular economy and sustainability through technology.

## License

MIT License
