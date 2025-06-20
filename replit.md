# Carimbo Rede Externa - TX/RX Física

## Overview

This is a modern web application for telecommunications network configuration, specifically designed for external network stamping and TX/RX physical configuration. The application provides a user-friendly interface for telecom technicians to configure network parameters and manage physical connections.

## System Architecture

### Frontend Architecture
- **Technology**: HTML5, CSS3, JavaScript (ES6+)
- **Styling Framework**: Bootstrap 5 for responsive layout
- **Icons**: Font Awesome 6.4.0
- **Fonts**: Google Fonts (Inter, JetBrains Mono)
- **Design Pattern**: Modern, responsive single-page application with custom CSS styling

### Backend Architecture
- **Framework**: Flask (Python web framework)
- **WSGI Server**: Gunicorn for production deployment
- **Database ORM**: Flask-SQLAlchemy
- **Database**: PostgreSQL (configured in Nix environment)
- **Deployment**: Autoscale deployment target on Replit

### Data Storage
- **Primary Database**: PostgreSQL
- **Local Storage**: Browser localStorage for client-side data persistence
- **Data Types**: Technician records, site configurations, form state

## Key Components

### Frontend Components
1. **TelecomForm Class** (`assets/script.js`)
   - Main application controller
   - Handles form interactions and validation
   - Manages local storage operations
   - Provides auto-save functionality

2. **Modern UI Components**
   - Responsive form layouts
   - Selection buttons for TX/RX configuration
   - Custom-styled form controls
   - Interactive validation feedback

3. **Styling System** (`assets/style.css`)
   - CSS custom properties for consistent theming
   - Modern color palette and typography
   - Responsive design patterns
   - Animation and transition effects

### Backend Components
1. **Flask Application** (`main.py` - referenced in deployment config)
   - Web server and API endpoints
   - Database connection management
   - Form processing and validation

2. **Database Models**
   - SQLAlchemy models for data persistence
   - Technician and site management
   - Configuration storage

## Data Flow

1. **User Interaction**: Users interact with the modern web interface
2. **Client-Side Processing**: JavaScript handles form validation and local storage
3. **Server Communication**: AJAX requests to Flask backend for data persistence
4. **Database Operations**: SQLAlchemy manages PostgreSQL operations
5. **Response Handling**: Updated data reflected in the user interface

## External Dependencies

### Python Dependencies
- `flask>=3.1.1` - Web framework
- `flask-sqlalchemy>=3.1.1` - Database ORM
- `gunicorn>=23.0.0` - Production WSGI server
- `psycopg2-binary>=2.9.10` - PostgreSQL adapter
- `email-validator>=2.2.0` - Email validation utilities

### Frontend Dependencies (CDN)
- Bootstrap 5.3.0 - UI framework
- Font Awesome 6.4.0 - Icons
- Google Fonts - Typography (Inter, JetBrains Mono)

### System Dependencies
- PostgreSQL database server
- OpenSSL for secure connections
- Python 3.11 runtime environment

## Deployment Strategy

### Environment Configuration
- **Platform**: Replit with Nix package management
- **Runtime**: Python 3.11
- **Process Manager**: Gunicorn with auto-reload
- **Port Configuration**: 5000 (with port reuse enabled)
- **Scaling**: Autoscale deployment target

### Production Settings
- Bind to all interfaces (0.0.0.0:5000)
- Hot reload enabled for development
- Parallel workflow execution
- Database connection pooling via PostgreSQL

### Development Workflow
- Automated project startup via Replit workflows
- Live reload for rapid development
- Integrated database management
- Version control ready structure

## Changelog

### June 20, 2025
- ✅ **Initial Setup**: Created basic project structure
- ✅ **Visual Modernization**: Applied Bootstrap 5 and modern CSS styling with professional gradients
- ✅ **Complete Functionality Restoration**: Added all missing sections including Ponta A and Afetação
- ✅ **Icon Corrections**: Updated icons for better telecommunications representation:
  - FIBRAS: `fa-network-wired` (fiber optic cables)
  - DGO: `fa-project-diagram` (fiber interconnection apparatus)
  - BT: `fa-server` (equipment rack/bastidor)
- ✅ **Label Updates**: Added "Indoor" prefix to FILA and BT sections
- ✅ **Output Format Correction**: Fixed stamp generation to match exact specification format
- ✅ **Final Approval**: Project completed with proper formatting and full functionality

## User Preferences

- **Communication style**: Simple, everyday language
- **Visual design**: Modern, professional appearance with Bootstrap 5
- **Technical accuracy**: Correct telecommunications terminology and iconography
- **Functionality**: Preserve all original features while enhancing visual appeal