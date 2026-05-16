# FOODBRIDGE PROJECT REPORT
## A Web-Based Food Donation Management System

---

**Submitted By:**  
[Your Name]  
Roll No: [Your Roll Number]  
BCA - Third Year (6th Semester)  
[Your College Name]  
[Your University Name]

**Under the Guidance of:**  
[Guide Name]  
[Designation]

**Academic Year:** 2025-2026

---

# TABLE OF CONTENTS

1. [Introduction](#1-introduction)
2. [Methodology](#2-methodology)
3. [Requirement Analysis](#3-requirement-analysis)
4. [Requirement Specification](#4-requirement-specification)
5. [System Design](#5-system-design)
6. [Implementation](#6-implementation)
7. [Testing and Evaluation](#7-testing-and-evaluation)
8. [Conclusion](#8-conclusion)
9. [Future Scope](#9-future-scope)
10. [References](#10-references)

---

# 1. INTRODUCTION

## 1.1 Background

Food waste is one of the most pressing global challenges of our time. According to the Food and Agriculture Organization (FAO), approximately 1.3 billion tonnes of food is wasted globally every year, representing about one-third of all food produced for human consumption. In India alone, 67 million tonnes of food is wasted annually, valued at approximately ₹92,000 crores.

Simultaneously, millions of people suffer from hunger and malnutrition. In India, over 190 million people go to bed hungry every night. This paradox of abundance and scarcity highlights a critical gap in our food distribution system.

## 1.2 Problem Statement

Despite the availability of surplus food from restaurants, hotels, events, and households, and the existence of NGOs working to feed underprivileged communities, there is no efficient platform to connect these two parties. The current food donation ecosystem suffers from:

- **Lack of centralized platform** for listing and discovering surplus food
- **Time sensitivity issues** - food perishes before coordination is complete
- **Information asymmetry** between donors and NGOs
- **Manual coordination** requiring multiple phone calls and messages
- **No transparency** in the donation lifecycle
- **Scalability challenges** with increasing donors and NGOs

## 1.3 Objectives

The primary objectives of the FoodBridge project are:

1. **Develop a full-stack web application** that connects food donors with NGOs through a centralized platform
2. **Implement real-time data synchronization** for immediate food availability updates
3. **Create role-based access control** for Donors, NGOs, and Administrators
4. **Integrate image upload capabilities** for visual verification of food quality
5. **Implement GPS-based location tracking** for efficient pickup coordination
6. **Design responsive user interface** that works across all devices
7. **Deploy production-ready application** on cloud platforms

## 1.4 Scope

**In Scope:**
- User authentication and authorization (JWT-based)
- Food listing management (CRUD operations)
- Request management system
- Admin dashboard with statistics
- Image upload via Cloudinary
- GPS location tracking
- Real-time updates via polling
- Responsive design for mobile and desktop
- Cloud deployment (Vercel + Render)

**Out of Scope:**
- Native mobile applications
- Real-time chat functionality
- Payment processing
- AI-based food recognition
- Blockchain integration
- Multi-language support

## 1.5 Project Overview

FoodBridge is a comprehensive web-based food donation management system built using the MERN stack (MongoDB, Express, React, Node.js). The platform enables:

- **Donors** to list surplus food with images, quantities, expiry dates, and GPS locations
- **NGOs** to browse available food and request items for distribution
- **Admins** to monitor platform activity and manage users, food listings, and requests

The system implements modern web technologies including React 19 for the frontend, Node.js with Express for the backend API, MongoDB for data persistence, and cloud services for deployment and image storage.

---

# 2. METHODOLOGY

## 2.1 Development Approach

The FoodBridge project follows the **Agile Software Development Methodology** with iterative development cycles. This approach allows for:

- Incremental feature development
- Continuous testing and feedback
- Flexibility to adapt to changing requirements
- Regular stakeholder communication

### 2.1.1 Development Phases

**Phase 1: Planning and Analysis (Week 1-2)**
- Problem identification
- Requirement gathering
- Feasibility study
- Technology selection
- Project planning

**Phase 2: Design (Week 3-4)**
- System architecture design
- Database schema design
- API endpoint design
- UI/UX wireframing
- Security design

**Phase 3: Implementation (Week 5-10)**
- Backend development (Models, Controllers, Routes)
- Frontend development (Components, Pages, Services)
- Integration of third-party services
- Real-time features implementation
- Responsive design implementation

**Phase 4: Testing (Week 11-12)**
- Unit testing
- Integration testing
- API testing
- Security testing
- User acceptance testing

**Phase 5: Deployment (Week 13)**
- Cloud deployment setup
- Environment configuration
- Production testing
- Documentation

**Phase 6: Maintenance (Ongoing)**
- Bug fixes
- Performance optimization
- Feature enhancements
- User support

## 2.2 Technology Stack Selection

### 2.2.1 Frontend Technologies

**React 19:**
- **Reason:** Component-based architecture, virtual DOM for performance, large ecosystem
- **Benefits:** Reusable components, efficient updates, strong community support

**Vite:**
- **Reason:** Fast build tool, hot module replacement, optimized production builds
- **Benefits:** Instant server start, lightning-fast HMR, optimized bundling

**TailwindCSS:**
- **Reason:** Utility-first CSS framework, rapid UI development
- **Benefits:** Consistent design, responsive utilities, small bundle size

**React Router:**
- **Reason:** Standard routing library for React applications
- **Benefits:** Declarative routing, nested routes, navigation guards

**Axios:**
- **Reason:** Promise-based HTTP client with interceptors
- **Benefits:** Request/response interceptors, automatic JSON transformation, error handling

### 2.2.2 Backend Technologies

**Node.js:**
- **Reason:** JavaScript runtime for server-side development, non-blocking I/O
- **Benefits:** Single language across stack, large npm ecosystem, scalable

**Express:**
- **Reason:** Minimal and flexible Node.js web framework
- **Benefits:** Robust routing, middleware support, simple API creation

**Mongoose:**
- **Reason:** MongoDB object modeling for Node.js
- **Benefits:** Schema validation, middleware hooks, query building

**JWT (JSON Web Tokens):**
- **Reason:** Stateless authentication mechanism
- **Benefits:** Scalable, secure, self-contained tokens

**bcrypt.js:**
- **Reason:** Password hashing library
- **Benefits:** Secure password storage, salt generation, adaptive hashing

### 2.2.3 Database

**MongoDB:**
- **Reason:** NoSQL document database, flexible schema
- **Benefits:** Horizontal scalability, JSON-like documents, rich query language

**MongoDB Atlas:**
- **Reason:** Managed cloud database service
- **Benefits:** Automatic backups, high availability, global distribution

### 2.2.4 Cloud Services

**Cloudinary:**
- **Reason:** Cloud-based image management service
- **Benefits:** Image optimization, CDN delivery, secure storage

**Vercel:**
- **Reason:** Frontend hosting platform with automatic deployments
- **Benefits:** Zero configuration, automatic HTTPS, global CDN

**Render:**
- **Reason:** Backend hosting platform with automatic deployments
- **Benefits:** Free tier, automatic scaling, easy deployment

## 2.3 Development Tools

**Git & GitHub:**
- Version control system for code management
- Collaboration and code review
- Deployment integration

**VS Code:**
- Integrated Development Environment
- Extensions for React, Node.js, and MongoDB
- Debugging capabilities

**Postman:**
- API testing and documentation
- Request collection management
- Environment variables

**MongoDB Compass:**
- GUI for MongoDB database
- Query building and data visualization
- Performance monitoring

## 2.4 Development Workflow

### 2.4.1 Version Control Workflow

```
main (production)
  ↑
  └── feature branches
       ├── feature/authentication
       ├── feature/food-management
       ├── feature/request-system
       └── feature/admin-dashboard
```

**Workflow Steps:**
1. Create feature branch from main
2. Develop and test feature
3. Commit changes with descriptive messages
4. Push to remote repository
5. Create pull request
6. Code review
7. Merge to main
8. Deploy to production

### 2.4.2 Testing Strategy

**Unit Testing:**
- Test individual functions and components
- Ensure code correctness at module level

**Integration Testing:**
- Test interaction between modules
- Verify API endpoints work correctly

**System Testing:**
- Test complete application flow
- Verify all features work together

**User Acceptance Testing:**
- Test with real users
- Gather feedback and iterate

## 2.5 Project Management

**Task Management:**
- Break down features into smaller tasks
- Prioritize tasks based on dependencies
- Track progress using GitHub Projects

**Time Management:**
- Allocate time for each phase
- Set milestones and deadlines
- Regular progress reviews

**Risk Management:**
- Identify potential risks early
- Develop mitigation strategies
- Monitor and adjust as needed

---

# 3. REQUIREMENT ANALYSIS

## 3.1 Stakeholder Analysis

### 3.1.1 Primary Stakeholders

**1. Food Donors**
- **Profile:** Restaurants, hotels, event organizers, catering services, individuals
- **Needs:**
  - Easy way to list surplus food
  - Quick coordination with NGOs
  - Transparency in donation process
  - Minimal time investment
- **Pain Points:**
  - Don't know which NGOs need food
  - Manual coordination is time-consuming
  - No way to track donation impact

**2. NGOs**
- **Profile:** Organizations feeding underprivileged communities, food banks, charities
- **Needs:**
  - Real-time information about available food
  - Easy way to request food
  - Efficient pickup coordination
  - Track distribution history
- **Pain Points:**
  - Difficult to find consistent food sources
  - Manual search is inefficient
  - No visibility into available surplus

**3. Administrators**
- **Profile:** Platform managers, system administrators
- **Needs:**
  - Monitor platform activity
  - Manage users and content
  - View platform statistics
  - Resolve disputes
- **Pain Points:**
  - Need centralized management tools
  - Require oversight capabilities
  - Need data insights

### 3.1.2 Secondary Stakeholders

**1. Beneficiaries**
- People receiving food through NGOs
- Indirect users of the platform

**2. Environment**
- Reduced food waste benefits the environment
- Lower greenhouse gas emissions

**3. Society**
- Reduced hunger and food insecurity
- Stronger community connections

## 3.2 Functional Requirements

### 3.2.1 User Management

**FR1: User Registration**
- Users can register with name, email, password, and role (Donor/NGO)
- System validates email uniqueness
- Password is hashed before storage
- JWT token generated upon successful registration

**FR2: User Login**
- Users can log in with email and password
- System verifies credentials
- JWT token generated for authenticated sessions
- Token expires after specified duration

**FR3: User Logout**
- Users can log out from the system
- Client-side token is cleared
- Session is terminated

**FR4: Role-Based Access Control**
- System restricts access based on user roles
- Three roles: Donor, NGO, Admin
- Each role has specific permissions
- Unauthorized access is blocked

### 3.2.2 Food Management

**FR5: Create Food Listing**
- Donors can create food listings with:
  - Food name and description
  - Quantity
  - Expiry date
  - Pickup location (GPS coordinates)
  - Contact information
  - Food images
- System validates all required fields
- Images uploaded to Cloudinary
- Listing saved to database

**FR6: View Food Listings**
- All users can view available food listings
- Listings display:
  - Food details
  - Images
  - Location
  - Donor information
  - Status
- Listings can be filtered by status and location

**FR7: Update Food Listing**
- Donors can update their own listings
- Admins can update any listing
- System validates ownership
- Changes are saved to database

**FR8: Delete Food Listing**
- Admins can delete any listing
- System removes listing and associated requests
- Deletion is permanent

**FR9: Image Upload**
- System supports image upload for food listings
- Images uploaded to Cloudinary
- Secure URLs stored in database
- Images optimized for web delivery

**FR10: Location Tracking**
- System captures GPS coordinates for pickup
- Latitude and longitude stored
- Address information optional
- Location displayed on listings

### 3.2.3 Request Management

**FR11: Create Food Request**
- NGOs can request available food items
- System validates food availability
- Prevents duplicate requests
- Food status updated to "requested"

**FR12: View Requests**
- Users can view their requests
- Donors see requests for their food
- NGOs see their submitted requests
- Admins see all requests

**FR13: Accept/Reject Request**
- Donors can accept or reject requests
- Admins can override decisions
- Food status updated accordingly
- Request status updated

**FR14: Mark as Delivered**
- NGOs can mark accepted requests as delivered
- Food status updated to "delivered"
- Request status updated to "completed"
- Donation cycle complete

### 3.2.4 Administrative Functions

**FR15: View Platform Statistics**
- Admins can view:
  - Total users
  - Total food items
  - Total requests
  - Delivered food count
- Statistics updated in real-time

**FR16: Manage Users**
- Admins can view all users
- Can update user roles
- Can view user activity
- Cannot delete users (data integrity)

**FR17: Manage Food Listings**
- Admins can view all food listings
- Can update any listing
- Can delete listings
- Can change food status

**FR18: Manage Requests**
- Admins can view all requests
- Can update request status
- Can override user actions
- Can resolve disputes

### 3.2.5 Real-time Features

**FR19: Real-time Updates**
- System provides near real-time updates
- Polling mechanism (7-second intervals)
- Food listings updated automatically
- Request status changes reflected immediately

**FR20: Status Tracking**
- System tracks food item lifecycle:
  - Available → Requested → Accepted → Delivered
- Request lifecycle:
  - Pending → Accepted/Rejected → Completed
- Status visible to all stakeholders

## 3.3 Non-Functional Requirements

### 3.3.1 Performance Requirements

**NFR1: Response Time**
- API responses within 2 seconds under normal load
- Page load time under 3 seconds
- Database queries under 500ms

**NFR2: Scalability**
- Support 100+ concurrent users
- Handle 1000+ food listings
- Process 500+ requests simultaneously

**NFR3: Availability**
- System available 99% of the time
- Minimal downtime for maintenance
- Automatic recovery from failures

### 3.3.2 Security Requirements

**NFR4: Authentication**
- All protected routes require valid JWT token
- Tokens expire after 24 hours
- Secure token storage on client

**NFR5: Password Security**
- Passwords hashed using bcrypt
- Salt rounds: 10
- Minimum password length: 6 characters

**NFR6: Data Transmission**
- All data transmitted over HTTPS
- SSL/TLS encryption
- Secure API endpoints

**NFR7: Input Validation**
- All user inputs validated
- SQL injection prevention
- XSS attack prevention

**NFR8: Authorization**
- Role-based access control enforced
- Users can only access authorized resources
- Admin actions logged

### 3.3.3 Usability Requirements

**NFR9: User Interface**
- Intuitive and easy to use
- Consistent design across pages
- Clear navigation
- Helpful error messages

**NFR10: Responsive Design**
- Works on desktop, tablet, and mobile
- Touch-friendly interface
- Adaptive layouts
- Optimized for different screen sizes

**NFR11: Accessibility**
- Keyboard navigation support
- Screen reader compatible
- Sufficient color contrast
- Alt text for images

### 3.3.4 Reliability Requirements

**NFR12: Error Handling**
- Graceful error handling
- User-friendly error messages
- Automatic error logging
- Recovery mechanisms

**NFR13: Data Integrity**
- Data consistency maintained
- Transaction management
- Validation at all levels
- Backup and recovery

### 3.3.5 Maintainability Requirements

**NFR14: Code Quality**
- Clean, readable code
- Consistent coding standards
- Comprehensive comments
- Modular architecture

**NFR15: Documentation**
- API documentation
- User manual
- Technical documentation
- Installation guide

**NFR16: Version Control**
- All code in Git repository
- Meaningful commit messages
- Branch management
- Code review process

## 3.4 System Constraints

### 3.4.1 Technical Constraints

- Must use JavaScript for both frontend and backend
- Must use MongoDB for database
- Must deploy on free-tier cloud services
- Must work on modern web browsers

### 3.4.2 Business Constraints

- Zero budget for development
- 3-month development timeline
- Single developer
- Academic project requirements

### 3.4.3 Operational Constraints

- Users must have internet access
- Users must have modern web browser
- Donors must provide GPS coordinates
- NGOs must have transportation

## 3.5 Assumptions and Dependencies

### 3.5.1 Assumptions

- Users have basic computer literacy
- Users act in good faith
- Food quality is donor's responsibility
- NGOs have proper food handling procedures
- Internet connectivity is available

### 3.5.2 Dependencies

- MongoDB Atlas availability
- Cloudinary service availability
- Vercel platform availability
- Render platform availability
- Third-party library updates

---

# 4. REQUIREMENT SPECIFICATION

## 4.1 Use Case Diagrams

### 4.1.1 Overall System Use Case

```
                    ┌─────────────────────┐
                    │   FoodBridge        │
                    │   System            │
                    └─────────────────────┘
                             │
        ┌────────────────────┼────────────────────┐
        │                    │                    │
   ┌────▼────┐         ┌────▼────┐         ┌────▼────┐
   │  Donor  │         │   NGO   │         │  Admin  │
   └─────────┘         └─────────┘         └─────────┘
        │                    │                    │
        │                    │                    │
   ┌────▼────────────┐  ┌───▼──────────────┐ ┌──▼──────────────┐
   │ Register        │  │ Register         │ │ View Statistics │
   │ Login           │  │ Login            │ │ Manage Users    │
   │ Create Food     │  │ Browse Food      │ │ Manage Food     │
   │ View Own Food   │  │ Request Food     │ │ Manage Requests │
   │ Update Food     │  │ View Requests    │ │ Override Actions│
   │ Accept/Reject   │  │ Mark Delivered   │ └─────────────────┘
   │ View Requests   │  └──────────────────┘
   └─────────────────┘
```

### 4.1.2 Donor Use Cases

**UC1: Register as Donor**
- **Actor:** Donor
- **Precondition:** User has valid email
- **Main Flow:**
  1. User navigates to registration page
  2. User enters name, email, password
  3. User selects "Donor" role
  4. System validates input
  5. System creates user account
  6. System generates JWT token
  7. User redirected to donor dashboard
- **Postcondition:** User registered and logged in

**UC2: Create Food Listing**
- **Actor:** Donor
- **Precondition:** User logged in as donor
- **Main Flow:**
  1. Donor navigates to donation form
  2. Donor enters food details
  3. Donor uploads food image
  4. Donor provides GPS location
  5. System validates input
  6. System uploads image to Cloudinary
  7. System saves listing to database
  8. Listing appears on platform
- **Postcondition:** Food listing created

**UC3: Accept/Reject Request**
- **Actor:** Donor
- **Precondition:** NGO has requested donor's food
- **Main Flow:**
  1. Donor views request notification
  2. Donor reviews NGO details
  3. Donor accepts or rejects request
  4. System updates request status
  5. System updates food status
  6. NGO notified of decision
- **Postcondition:** Request processed

### 4.1.3 NGO Use Cases

**UC4: Browse Available Food**
- **Actor:** NGO
- **Precondition:** User logged in as NGO
- **Main Flow:**
  1. NGO navigates to dashboard
  2. System displays available food
  3. NGO views food details
  4. NGO checks location and expiry
  5. NGO decides to request
- **Postcondition:** NGO informed of options

**UC5: Request Food**
- **Actor:** NGO
- **Precondition:** Food is available
- **Main Flow:**
  1. NGO clicks request button
  2. System validates availability
  3. System creates request
  4. System updates food status
  5. Donor notified of request
  6. NGO sees pending status
- **Postcondition:** Request created

**UC6: Mark as Delivered**
- **Actor:** NGO
- **Precondition:** Request accepted, food picked up
- **Main Flow:**
  1. NGO picks up food
  2. NGO marks request as delivered
  3. System updates request status
  4. System updates food status
  5. Donation cycle complete
- **Postcondition:** Food delivered

### 4.1.4 Admin Use Cases

**UC7: View Platform Statistics**
- **Actor:** Admin
- **Precondition:** User logged in as admin
- **Main Flow:**
  1. Admin navigates to dashboard
  2. System queries database
  3. System calculates statistics
  4. System displays metrics
  5. Admin reviews data
- **Postcondition:** Admin informed

**UC8: Manage Users**
- **Actor:** Admin
- **Precondition:** User logged in as admin
- **Main Flow:**
  1. Admin views user list
  2. Admin selects user
  3. Admin updates user role
  4. System validates change
  5. System saves update
  6. User permissions updated
- **Postcondition:** User managed

## 4.2 Activity Diagrams

### 4.2.1 Food Donation Process

```
[Donor] → (Login) → (Navigate to Donation Form)
                          ↓
                    (Fill Food Details)
                          ↓
                    (Upload Image)
                          ↓
                    (Provide Location)
                          ↓
                    (Submit Listing)
                          ↓
                    [System Validates]
                          ↓
                    (Save to Database)
                          ↓
                    [Food Listed]
                          ↓
                    [NGO Sees Listing]
                          ↓
                    [NGO Requests Food]
                          ↓
                    [Donor Notified]
                          ↓
                    (Donor Reviews Request)
                          ↓
                    <Accept or Reject?>
                    ↙              ↘
            (Accept)              (Reject)
                ↓                      ↓
        [Status: Accepted]      [Status: Rejected]
                ↓                      ↓
        [NGO Picks Up]          [Food Available Again]
                ↓
        [NGO Marks Delivered]
                ↓
        [Status: Delivered]
                ↓
        [Donation Complete]
```

### 4.2.2 Request Management Process

```
[NGO] → (Login) → (Browse Food)
                        ↓
                  (Select Food Item)
                        ↓
                  (Click Request)
                        ↓
                  [System Validates]
                        ↓
                  <Food Available?>
                  ↙              ↘
            (Yes)                (No)
              ↓                    ↓
      (Create Request)      (Show Error)
              ↓                    ↓
      [Status: Pending]      [Return to Browse]
              ↓
      [Donor Notified]
              ↓
      [Donor Reviews]
              ↓
      <Donor Decision?>
      ↙              ↘
(Accept)          (Reject)
    ↓                  ↓
[Accepted]        [Rejected]
    ↓                  ↓
[NGO Notified]    [NGO Notified]
    ↓                  ↓
[Coordinate]      [Can Request Again]
    ↓
[Pickup Food]
    ↓
[Mark Delivered]
    ↓
[Completed]
```

## 4.3 Sequence Diagrams

### 4.3.1 User Authentication Sequence

```
User          Frontend        Backend         Database
 │                │              │               │
 │──Register──────>│              │               │
 │                │──POST /auth/register──>│      │
 │                │              │──Validate──>   │
 │                │              │<──Check Email──│
 │                │              │──Hash Password─>│
 │                │              │──Create User───>│
 │                │              │<──User Created──│
 │                │              │──Generate JWT───│
 │                │<──Token + User Data────│      │
 │<──Success──────│              │               │
 │                │              │               │
```

### 4.3.2 Food Listing Creation Sequence

```
Donor      Frontend    Backend    Cloudinary   Database
 │            │           │            │           │
 │──Fill Form─>│          │            │           │
 │──Upload Img─>│         │            │           │
 │            │──Upload──>│            │           │
 │            │           │──Upload───>│           │
 │            │           │<──URL──────│           │
 │            │           │──Validate──│           │
 │            │           │──Save Food────────────>│
 │            │           │<──Food Created─────────│
 │            │<──Success─│            │           │
 │<──Redirect──│          │            │           │
```

## 4.4 Data Flow Diagrams

### 4.4.1 Level 0 DFD (Context Diagram)

```
                    ┌─────────────────┐
        Donor ─────>│                 │<───── NGO
                    │   FoodBridge    │
        Admin ─────>│     System      │<───── Database
                    │                 │
                    └─────────────────┘
```

### 4.4.2 Level 1 DFD

```
                ┌──────────────────────────────┐
                │   User Management            │
                │   (Register, Login, Auth)    │
                └──────────────────────────────┘
                            │
                            ↓
                ┌──────────────────────────────┐
                │   Food Management            │
                │   (Create, Read, Update)     │
                └──────────────────────────────┘
                            │
                            ↓
                ┌──────────────────────────────┐
                │   Request Management         │
                │   (Create, Accept, Deliver)  │
                └──────────────────────────────┘
                            │
                            ↓
                ┌──────────────────────────────┐
                │   Admin Management           │
                │   (Monitor, Manage, Stats)   │
                └──────────────────────────────┘
```

## 4.5 State Transition Diagrams

### 4.5.1 Food Item States

```
[Available] ──NGO Requests──> [Requested]
                                   │
                    ┌──────────────┴──────────────┐
                    │                             │
            Donor Accepts                  Donor Rejects
                    │                             │
                    ↓                             ↓
              [Accepted]                    [Available]
                    │
            NGO Marks Delivered
                    │
                    ↓
              [Delivered]
```

### 4.5.2 Request States

```
[Pending] ──Donor Accepts──> [Accepted] ──NGO Delivers──> [Completed]
    │
    └──Donor Rejects──> [Rejected]
    │
    └──NGO Cancels──> [Cancelled]
```

---


# 5. SYSTEM DESIGN

## 5.1 System Architecture

### 5.1.1 Three-Tier Architecture

The FoodBridge system follows a three-tier architecture pattern, separating concerns into presentation, application, and data tiers.

```
┌─────────────────────────────────────────────────────────────┐
│                    PRESENTATION TIER                         │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   React 19   │  │  TailwindCSS │  │ React Router │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                              │
│  • User Interface Components                                │
│  • State Management (Context API)                           │
│  • Client-side Routing                                      │
│  • Real-time Updates (Polling)                              │
└─────────────────────────────────────────────────────────────┘
                              ↕
                    HTTP/HTTPS (REST API)
                              ↕
┌─────────────────────────────────────────────────────────────┐
│                    APPLICATION TIER                          │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Node.js    │  │   Express    │  │     JWT      │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                              │
│  • Business Logic                                           │
│  • Authentication & Authorization                           │
│  • API Endpoints (RESTful)                                  │
│  • Middleware (Auth, Error Handling)                        │
└─────────────────────────────────────────────────────────────┘
                              ↕
                      Mongoose ODM
                              ↕
┌─────────────────────────────────────────────────────────────┐
│                      DATA TIER                               │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   MongoDB    │  │  Cloudinary  │  │   Firestore  │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                              │
│  • Data Storage (Documents)                                 │
│  • Image Storage (Cloud)                                    │
│  • Real-time Sync (Optional)                                │
└─────────────────────────────────────────────────────────────┘
```

**Benefits:**
- **Separation of Concerns:** Each tier has distinct responsibilities
- **Scalability:** Tiers can be scaled independently
- **Maintainability:** Changes in one tier don't affect others
- **Flexibility:** Technologies can be swapped within tiers

### 5.1.2 MVC Pattern

The backend follows the Model-View-Controller (MVC) architectural pattern:

```
┌─────────────────────────────────────────────────────────────┐
│                         CLIENT                               │
│                    (React Frontend)                          │
└─────────────────────────────────────────────────────────────┘
                              ↕
                        HTTP Requests
                              ↕
┌─────────────────────────────────────────────────────────────┐
│                      CONTROLLER                              │
│                                                              │
│  • authController.js    → Register, Login                   │
│  • foodController.js    → CRUD operations                   │
│  • requestController.js → Request management                │
│  • adminController.js   → Admin functions                   │
│                                                              │
│  Responsibilities:                                          │
│  - Handle HTTP requests                                     │
│  - Validate input                                           │
│  - Call model methods                                       │
│  - Return responses                                         │
└─────────────────────────────────────────────────────────────┘
                              ↕
┌─────────────────────────────────────────────────────────────┐
│                         MODEL                                │
│                                                              │
│  • User.js    → User schema & methods                       │
│  • Food.js    → Food schema & methods                       │
│  • Request.js → Request schema & methods                    │
│                                                              │
│  Responsibilities:                                          │
│  - Define data structure                                    │
│  - Business logic                                           │
│  - Database operations                                      │
│  - Data validation                                          │
└─────────────────────────────────────────────────────────────┘
                              ↕
┌─────────────────────────────────────────────────────────────┐
│                         VIEW                                 │
│                    (JSON Responses)                          │
│                                                              │
│  • Success responses                                        │
│  • Error responses                                          │
│  • Data formatting                                          │
└─────────────────────────────────────────────────────────────┘
```

## 5.2 Database Design

### 5.2.1 Entity-Relationship Diagram

```
┌─────────────────────┐
│       USER          │
├─────────────────────┤
│ _id (PK)           │
│ name               │
│ email (unique)     │
│ password (hashed)  │
│ role (enum)        │
│   - donor          │
│   - ngo            │
│   - admin          │
│ createdAt          │
│ updatedAt          │
└─────────────────────┘
         │
         │ 1:N (donor)
         ↓
┌─────────────────────┐
│       FOOD          │
├─────────────────────┤
│ _id (PK)           │
│ name               │
│ quantity           │
│ image              │
│ imageGallery[]     │
│ location {         │
│   address          │
│   lat              │
│   lng              │
│ }                  │
│ expiry             │
│ status (enum)      │
│   - available      │
│   - requested      │
│   - accepted       │
│   - delivered      │
│   - cancelled      │
│ donor (FK)         │
│ contact {}         │
│ trackerUrl         │
│ createdAt          │
│ updatedAt          │
└─────────────────────┘
         │
         │ 1:N
         ↓
┌─────────────────────┐
│      REQUEST        │
├─────────────────────┤
│ _id (PK)           │
│ food (FK)          │
│ ngo (FK)           │
│ status (enum)      │
│   - pending        │
│   - accepted       │
│   - rejected       │
│   - completed      │
│   - cancelled      │
│ createdAt          │
│ updatedAt          │
└─────────────────────┘
         ↑
         │ N:1 (ngo)
         │
┌─────────────────────┐
│       USER          │
│    (NGO Role)       │
└─────────────────────┘
```

**Relationships:**
- **User → Food:** One-to-Many (One donor can create many food listings)
- **Food → Request:** One-to-Many (One food item can have many requests)
- **User → Request:** One-to-Many (One NGO can create many requests)

### 5.2.2 Database Schema Details

**User Schema:**
```javascript
{
  name: String (required, trimmed),
  email: String (required, unique, lowercase, trimmed),
  password: String (required, hashed, min: 6),
  role: String (enum: ['donor', 'ngo', 'admin'], default: 'donor'),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

**Food Schema:**
```javascript
{
  name: String (required, trimmed),
  quantity: String (required, trimmed),
  image: String (URL),
  imageGallery: [String] (URLs),
  location: {
    address: String,
    lat: Number (required),
    lng: Number (required)
  },
  expiry: Date (required),
  status: String (enum: ['available', 'requested', 'accepted', 
                         'delivered', 'sold_out', 'unavailable', 
                         'cancelled'], default: 'available'),
  donor: ObjectId (ref: 'User'),
  contact: {
    name: String,
    phone: String,
    email: String
  },
  trackerUrl: String,
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

**Request Schema:**
```javascript
{
  food: ObjectId (ref: 'Food', required),
  ngo: ObjectId (ref: 'User', required),
  status: String (enum: ['pending', 'accepted', 'rejected', 
                         'completed', 'cancelled'], 
                 default: 'pending'),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

### 5.2.3 Database Indexes

**User Collection:**
- `email`: Unique index for fast lookup and uniqueness constraint
- `role`: Index for filtering users by role

**Food Collection:**
- `donor`: Index for querying food by donor
- `status`: Index for filtering available food
- `expiry`: Index for sorting by expiry date
- `createdAt`: Index for sorting by creation date

**Request Collection:**
- `food`: Index for querying requests by food item
- `ngo`: Index for querying requests by NGO
- `status`: Index for filtering by request status
- Compound index: `{food: 1, ngo: 1, status: 1}` for preventing duplicate active requests

## 5.3 API Design

### 5.3.1 RESTful API Principles

The FoodBridge API follows REST (Representational State Transfer) principles:

1. **Client-Server Architecture:** Clear separation between client and server
2. **Stateless:** Each request contains all necessary information
3. **Cacheable:** Responses indicate cacheability
4. **Uniform Interface:** Consistent resource identification and manipulation
5. **Layered System:** Hierarchical layers for scalability

### 5.3.2 API Endpoints

**Base URL:** `https://food-bridge-6-zn3t.onrender.com/api`

#### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/register` | Register new user | No |
| POST | `/auth/login` | Login user | No |

**Request Body (Register):**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "donor"
}
```

**Response (Register/Login):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "donor"
    }
  }
}
```

#### Food Management Endpoints

| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---------------|------|
| POST | `/food/add` | Create food listing | Yes | Donor |
| GET | `/food` | Get all food listings | No | All |
| GET | `/food/:id` | Get food by ID | No | All |
| PUT | `/food/update/:id` | Update food listing | Yes | Donor/Admin |
| DELETE | `/food/delete/:id` | Delete food listing | Yes | Admin |

**Request Body (Create Food):**
```json
{
  "name": "Surplus Rice",
  "quantity": "10 kg",
  "image": "https://res.cloudinary.com/...",
  "imageGallery": ["https://res.cloudinary.com/..."],
  "location": {
    "address": "123 Main St, Mumbai",
    "lat": 19.0760,
    "lng": 72.8777
  },
  "expiry": "2026-04-25T18:00:00.000Z",
  "contact": {
    "name": "John Doe",
    "phone": "+91 9876543210",
    "email": "john@example.com"
  }
}
```

**Response (Create Food):**
```json
{
  "success": true,
  "message": "Food item added",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Surplus Rice",
    "quantity": "10 kg",
    "image": "https://res.cloudinary.com/...",
    "location": {
      "address": "123 Main St, Mumbai",
      "lat": 19.0760,
      "lng": 72.8777
    },
    "expiry": "2026-04-25T18:00:00.000Z",
    "status": "available",
    "donor": {
      "_id": "507f1f77bcf86cd799439012",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "donor"
    },
    "createdAt": "2026-04-24T10:00:00.000Z",
    "updatedAt": "2026-04-24T10:00:00.000Z"
  }
}
```

#### Request Management Endpoints

| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---------------|------|
| POST | `/request/create` | Create food request | Yes | NGO |
| GET | `/request/my` | Get user's requests | Yes | Donor/NGO |
| PUT | `/request/update/:id` | Update request status | Yes | Donor/NGO/Admin |
| GET | `/request/all` | Get all requests | Yes | Admin |

**Request Body (Create Request):**
```json
{
  "foodId": "507f1f77bcf86cd799439011"
}
```

**Response (Create Request):**
```json
{
  "success": true,
  "message": "Request created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439013",
    "food": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Surplus Rice",
      "quantity": "10 kg",
      "status": "requested"
    },
    "ngo": {
      "_id": "507f1f77bcf86cd799439014",
      "name": "Food Bank NGO",
      "email": "ngo@example.com",
      "role": "ngo"
    },
    "status": "pending",
    "createdAt": "2026-04-24T11:00:00.000Z"
  }
}
```

#### Admin Endpoints

| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---------------|------|
| GET | `/admin/users` | Get all users | Yes | Admin |
| GET | `/admin/foods` | Get all food items | Yes | Admin |
| GET | `/admin/requests` | Get all requests | Yes | Admin |
| GET | `/admin/stats` | Get platform statistics | Yes | Admin |
| PUT | `/admin/users/:id` | Update user | Yes | Admin |
| PUT | `/admin/foods/:id` | Update food | Yes | Admin |
| DELETE | `/admin/foods/:id` | Delete food | Yes | Admin |
| PUT | `/admin/requests/:id` | Update request | Yes | Admin |

**Response (Platform Statistics):**
```json
{
  "success": true,
  "data": {
    "totalUsers": 150,
    "totalFoodItems": 89,
    "totalRequests": 234,
    "totalDeliveredFood": 156
  }
}
```

### 5.3.3 Error Responses

**Standard Error Format:**
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message (development only)"
}
```

**Common HTTP Status Codes:**
- `200 OK` - Successful GET, PUT requests
- `201 Created` - Successful POST requests
- `400 Bad Request` - Invalid input
- `401 Unauthorized` - Missing or invalid token
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource not found
- `409 Conflict` - Duplicate resource
- `500 Internal Server Error` - Server error

## 5.4 User Interface Design

### 5.4.1 Design Principles

**1. Simplicity:**
- Clean, uncluttered interface
- Minimal cognitive load
- Clear visual hierarchy

**2. Consistency:**
- Uniform color scheme (Emerald/Teal)
- Consistent component styling
- Predictable interactions

**3. Feedback:**
- Visual feedback for actions
- Loading states
- Success/error messages
- Toast notifications

**4. Accessibility:**
- Keyboard navigation
- Screen reader support
- Sufficient color contrast
- Alt text for images

**5. Responsiveness:**
- Mobile-first approach
- Adaptive layouts
- Touch-friendly targets
- Optimized for all devices

### 5.4.2 Color Scheme

**Primary Colors:**
- Emerald: `#10b981` - Primary actions, branding
- Teal: `#14b8a6` - Secondary actions, accents
- Amber: `#f59e0b` - Warnings, highlights

**Neutral Colors:**
- Slate: `#64748b` - Text, borders
- White: `#ffffff` - Backgrounds
- Gray: `#f1f5f9` - Secondary backgrounds

**Semantic Colors:**
- Success: `#22c55e` - Success messages
- Error: `#ef4444` - Error messages
- Warning: `#f59e0b` - Warning messages
- Info: `#3b82f6` - Information messages

### 5.4.3 Typography

**Font Family:** Inter (Google Fonts)
- Clean, modern sans-serif
- Excellent readability
- Multiple weights available

**Font Sizes:**
- Headings: 24px - 36px (bold)
- Body: 16px (regular)
- Small: 14px (regular)
- Captions: 12px (medium)

### 5.4.4 Component Library

**Reusable Components:**

1. **Navbar**
   - Logo and branding
   - Navigation links
   - User menu
   - Responsive hamburger menu

2. **Footer**
   - Brand information
   - Quick links
   - Social media links
   - Statistics
   - Legal links

3. **FoodCard**
   - Food image
   - Food details
   - Status badge
   - Action buttons

4. **AddFoodForm**
   - Form inputs
   - Image upload
   - Location picker
   - Submit button

5. **StatusTracker**
   - Timeline visualization
   - Status indicators
   - Request information

6. **Loader**
   - Loading spinner
   - Loading text
   - Full-page or inline

7. **Toast**
   - Success/error messages
   - Auto-dismiss
   - Action buttons

8. **ProtectedRoute**
   - Route guarding
   - Role-based access
   - Redirect logic

### 5.4.5 Page Layouts

**Home Page:**
- Hero section with CTA
- Features showcase
- Story strip
- Impact gallery
- Footer

**Login/Register Pages:**
- Centered form
- Input fields
- Submit button
- Link to alternate page

**Donor Dashboard:**
- Two-column layout
- Left: Add food form
- Right: Status tracker
- Responsive stacking

**NGO Dashboard:**
- Grid of food cards
- Filter options
- Request history
- Responsive grid

**Admin Dashboard:**
- Statistics cards
- Management tables
- Action buttons
- Tabs for different sections

## 5.5 Security Design

### 5.5.1 Authentication Flow

```
┌──────────────┐                                    ┌──────────────┐
│    CLIENT    │                                    │    SERVER    │
└──────────────┘                                    └──────────────┘
       │                                                    │
       │  1. POST /api/auth/register or /login             │
       │    { email, password, name, role }                │
       ├──────────────────────────────────────────────────>│
       │                                                    │
       │                                    2. Validate     │
       │                                    3. Hash password│
       │                                    4. Create user  │
       │                                    5. Generate JWT │
       │                                                    │
       │  6. Response: { token, user }                     │
       │<──────────────────────────────────────────────────┤
       │                                                    │
       │  7. Store token in localStorage                   │
       │                                                    │
       │  8. Subsequent requests with token                │
       │     Authorization: Bearer <token>                 │
       ├──────────────────────────────────────────────────>│
       │                                                    │
       │                                    9. Verify JWT   │
       │                                    10. Check role  │
       │                                    11. Process req │
       │                                                    │
       │  12. Protected resource response                  │
       │<──────────────────────────────────────────────────┤
       │                                                    │
```

### 5.5.2 Password Security

**Hashing Algorithm:** bcrypt
- **Salt Rounds:** 10
- **Adaptive:** Computational cost increases over time
- **Secure:** Resistant to rainbow table attacks

**Password Requirements:**
- Minimum length: 6 characters
- No maximum length (bcrypt handles truncation)
- Stored as hash, never plain text

**Implementation:**
```javascript
// Hashing (on registration/password change)
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(plainPassword, salt);

// Verification (on login)
const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
```

### 5.5.3 JWT Token Security

**Token Structure:**
```
Header.Payload.Signature
```

**Payload:**
```json
{
  "id": "507f1f77bcf86cd799439011",
  "role": "donor",
  "iat": 1714000000,
  "exp": 1714086400
}
```

**Security Measures:**
- Tokens signed with secret key
- Expiration time: 24 hours
- Stored in localStorage (client-side)
- Sent in Authorization header
- Verified on every protected request

### 5.5.4 Authorization Middleware

**Role-Based Access Control:**
```javascript
// Middleware to check user role
const allowRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
    }
    
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Forbidden: role not allowed"
      });
    }
    
    next();
  };
};

// Usage
router.post('/food/add', protect, allowRoles('donor'), addFood);
router.get('/admin/stats', protect, allowRoles('admin'), getStats);
```

### 5.5.5 Input Validation

**Server-Side Validation:**
- All inputs validated before processing
- Type checking
- Length constraints
- Format validation (email, dates)
- Sanitization to prevent injection

**Client-Side Validation:**
- Immediate feedback
- Reduces server load
- Improves user experience
- Not relied upon for security

### 5.5.6 CORS Configuration

**Cross-Origin Resource Sharing:**
```javascript
const allowedOrigins = [
  "http://localhost:5173",
  "https://food-bridge-frontend-zeta.vercel.app",
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error("CORS: origin not allowed"));
  },
  credentials: true
}));
```

### 5.5.7 HTTPS Enforcement

**Production Deployment:**
- All traffic over HTTPS
- SSL/TLS certificates (automatic on Vercel/Render)
- Secure cookie flags
- HSTS headers

---

# 6. IMPLEMENTATION

## 6.1 Development Environment Setup

### 6.1.1 Prerequisites

**Software Requirements:**
- Node.js v18+ and npm v9+
- MongoDB (local or Atlas)
- Git for version control
- VS Code or any code editor
- Modern web browser (Chrome, Firefox, Edge)

**Installation Steps:**

1. **Install Node.js:**
   ```bash
   # Download from nodejs.org
   # Verify installation
   node --version
   npm --version
   ```

2. **Install MongoDB:**
   ```bash
   # Windows (using winget)
   winget install MongoDB.Server
   
   # Start MongoDB service
   net start MongoDB
   ```

3. **Clone Repository:**
   ```bash
   git clone https://github.com/prakashkchaudhary/food_bridge.git
   cd food_bridge
   ```

4. **Install Dependencies:**
   ```bash
   # Install all dependencies (root, backend, frontend)
   npm run install:all
   ```

5. **Configure Environment Variables:**
   
   **Backend (.env):**
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/foodbridge
   JWT_SECRET=your_jwt_secret_key_here
   ADMIN_NAME=System Admin
   ADMIN_EMAIL=admin@foodbridge.local
   ADMIN_PASSWORD=yourStrongPassword
   ```
   
   **Frontend (.env):**
   ```env
   VITE_API_BASE_URL=http://localhost:5000/api
   VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
   VITE_CLOUDINARY_UPLOAD_PRESET=your_preset
   ```

6. **Seed Admin Account:**
   ```bash
   npm run seed:admin
   ```

7. **Run Development Servers:**
   ```bash
   npm run dev
   ```

## 6.2 Backend Implementation

### 6.2.1 Project Structure

```
backend/
├── config/
│   └── db.js                 # MongoDB connection
├── controllers/
│   ├── authController.js     # Authentication logic
│   ├── foodController.js     # Food CRUD operations
│   ├── requestController.js  # Request management
│   └── adminController.js    # Admin functions
├── middleware/
│   ├── authMiddleware.js     # JWT verification
│   ├── roleMiddleware.js     # Role checking
│   └── errorMiddleware.js    # Error handling
├── models/
│   ├── User.js              # User schema
│   ├── Food.js              # Food schema
│   └── Request.js           # Request schema
├── routes/
│   ├── authRoutes.js        # Auth endpoints
│   ├── foodRoutes.js        # Food endpoints
│   ├── requestRoutes.js     # Request endpoints
│   └── adminRoutes.js       # Admin endpoints
├── utils/
│   └── generateToken.js     # JWT generation
├── scripts/
│   └── seedAdmin.js         # Admin seeding
├── .env                     # Environment variables
├── .env.example             # Environment template
├── package.json             # Dependencies
└── server.js                # Entry point
```

### 6.2.2 Database Connection

**File:** `backend/config/db.js`

```javascript
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      // Mongoose 6+ doesn't need these options
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
```

**Key Features:**
- Async/await for clean error handling
- Environment variable for connection string
- Graceful error handling with process exit
- Connection confirmation logging

### 6.2.3 Data Models

**User Model** (`backend/models/User.js`):

```javascript
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["donor", "ngo", "admin"],
      default: "donor",
    },
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre("save", async function hashPassword() {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Method to compare passwords
userSchema.methods.matchPassword = function matchPassword(plainPassword) {
  return bcrypt.compare(plainPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
```

**Key Features:**
- Pre-save middleware for password hashing
- Instance method for password verification
- Automatic timestamps
- Email uniqueness constraint
- Role-based enum

**Food Model** (`backend/models/Food.js`):

```javascript
const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    quantity: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      default: "",
    },
    imageGallery: {
      type: [String],
      default: [],
    },
    location: {
      address: { type: String, default: "" },
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
    expiry: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["available", "requested", "accepted", "delivered", 
             "sold_out", "unavailable", "cancelled"],
      default: "available",
    },
    donor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    contact: {
      name: { type: String, default: "" },
      phone: { type: String, default: "" },
      email: { type: String, default: "" },
    },
    trackerUrl: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Food", foodSchema);
```

**Key Features:**
- Embedded location object with GPS coordinates
- Status enum for lifecycle tracking
- Reference to donor (User)
- Support for multiple images
- Contact information embedded

**Request Model** (`backend/models/Request.js`):

```javascript
const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema(
  {
    food: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Food",
      required: true,
    },
    ngo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected", "completed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Request", requestSchema);
```

**Key Features:**
- References to Food and User (NGO)
- Status enum for request lifecycle
- Automatic timestamps
- Simple, focused schema

### 6.2.4 Authentication Controller

**File:** `backend/controllers/authController.js`

```javascript
const User = require("../models/User");
const generateToken = require("../utils/generateToken");

// POST /api/auth/register
const register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    // Validation
    if (!name || !email || !password) {
      res.status(400);
      throw new Error("name, email and password are required");
    }

    // Check if user exists
    const existing = await User.findOne({ email });
    if (existing) {
      res.status(409);
      throw new Error("Email already in use");
    }

    // Prevent self-assignment of admin role
    const safeRole = role === "ngo" ? "ngo" : "donor";

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      role: safeRole,
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        token: generateToken(user),
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
    });
  } catch (error) {
    return next(error);
  }
};

// POST /api/auth/login
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      res.status(400);
      throw new Error("email and password are required");
    }

    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      res.status(401);
      throw new Error("Invalid credentials");
    }

    return res.json({
      success: true,
      message: "Login successful",
      data: {
        token: generateToken(user),
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = { register, login };
```

**Key Features:**
- Input validation
- Duplicate email checking
- Admin role protection
- Password hashing (via model middleware)
- JWT token generation
- Consistent error handling

### 6.2.5 Middleware Implementation

**Authentication Middleware** (`backend/middleware/authMiddleware.js`):

```javascript
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || "";
    
    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, token missing",
      });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User for token no longer exists",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Not authorized, invalid token",
    });
  }
};

module.exports = { protect };
```

**Role Middleware** (`backend/middleware/roleMiddleware.js`):

```javascript
const allowRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Forbidden: role not allowed",
      });
    }

    next();
  };
};

module.exports = { allowRoles };
```

**Error Middleware** (`backend/middleware/errorMiddleware.js`):

```javascript
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    success: false,
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = { notFound, errorHandler };
```

### 6.2.6 API Routes Configuration

**Authentication Routes** (`backend/routes/authRoutes.js`):

```javascript
const express = require("express");
const { register, login } = require("../controllers/authController");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

module.exports = router;
```

**Food Routes** (`backend/routes/foodRoutes.js`):

```javascript
const express = require("express");
const {
  addFood,
  getFoods,
  getFoodById,
  updateFood,
  deleteFood,
} = require("../controllers/foodController");
const { protect } = require("../middleware/authMiddleware");
const { allowRoles } = require("../middleware/roleMiddleware");

const router = express.Router();

router.post("/add", protect, allowRoles("donor"), addFood);
router.get("/", getFoods);
router.get("/:id", getFoodById);
router.put("/update/:id", protect, updateFood);
router.delete("/delete/:id", protect, allowRoles("admin"), deleteFood);

module.exports = router;
```

**Server Entry Point** (`backend/server.js`):

```javascript
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const foodRoutes = require("./routes/foodRoutes");
const requestRoutes = require("./routes/requestRoutes");
const adminRoutes = require("./routes/adminRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

dotenv.config();

const app = express();

app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

// CORS configuration
const allowedOrigins = [
  "http://localhost:5173",
  "https://food-bridge-frontend-zeta.vercel.app",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error("CORS: origin not allowed"));
  },
  credentials: true,
}));

app.use(express.json());

// Health check endpoints
app.get("/", (req, res) => {
  res.json({ success: true, message: "FoodBridge API is running" });
});

app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "FoodBridge API is running" });
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/food", foodRoutes);
app.use("/api/request", requestRoutes);
app.use("/api/admin", adminRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

const PORT = parseInt(process.env.PORT, 10) || 5000;

async function startServer() {
  try {
    await connectDB();
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
}

startServer();
```

## 6.3 Frontend Implementation

### 6.3.1 Project Structure

```
frontend/src/
├── assets/
│   ├── foodbridge-logo.png
│   └── photos/
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── FoodCard.jsx
│   ├── AddFoodForm.jsx
│   ├── StatusTracker.jsx
│   ├── Loader.jsx
│   ├── Toast.jsx
│   └── ProtectedRoute.jsx
├── context/
│   ├── AuthContext.jsx
│   └── ToastContext.jsx
├── pages/
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── DonateFood.jsx
│   ├── DonorDashboard.jsx
│   ├── NGODashboard.jsx
│   └── AdminDashboard.jsx
├── services/
│   ├── apiClient.js
│   ├── authService.js
│   ├── firestoreService.js
│   └── cloudinaryService.js
├── utils/
│   ├── analytics.js
│   ├── apiError.js
│   └── constants.js
├── App.jsx
├── main.jsx
└── index.css
```

### 6.3.2 Routing Configuration

**File:** `frontend/src/App.jsx`

```javascript
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import { ROLES } from './utils/constants'
import { trackPageView } from './utils/analytics'
import AdminDashboard from './pages/AdminDashboard'
import DonateFood from './pages/DonateFood'
import DonorDashboard from './pages/DonorDashboard'
import Home from './pages/Home'
import Login from './pages/Login'
import NGODashboard from './pages/NGODashboard'
import Register from './pages/Register'

export default function App() {
  const location = useLocation()

  useEffect(() => {
    trackPageView(location.pathname + location.search)
  }, [location])

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/donate" element={<DonateFood />} />

          <Route
            path="/donor"
            element={
              <ProtectedRoute roles={[ROLES.DONOR]}>
                <DonorDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ngo"
            element={
              <ProtectedRoute roles={[ROLES.NGO]}>
                <NGODashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute roles={[ROLES.ADMIN]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
```

### 6.3.3 Authentication Context

**File:** `frontend/src/context/AuthContext.jsx`

```javascript
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { getStoredSession, loginUser, logoutUser, registerUser } from '../services/authService'
import { API_BASE_URL } from '../services/apiClient'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const session = getStoredSession()
    if (session?.user) {
      setUser(session.user)
      setProfile(session.user)
    }
    setLoading(false)
  }, [])

  const value = useMemo(
    () => ({
      user,
      profile,
      loading,
      apiConfigured: !!API_BASE_URL,
      role: profile?.role ?? null,
      async register(email, password, name, role) {
        const nextUser = await registerUser(email, password, name, role)
        setUser(nextUser)
        setProfile(nextUser)
        return nextUser
      },
      async login(email, password) {
        const nextUser = await loginUser(email, password)
        setUser(nextUser)
        setProfile(nextUser)
        return nextUser
      },
      logout() {
        logoutUser()
        setUser(null)
        setProfile(null)
      },
    }),
    [user, profile, loading]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
```

### 6.3.4 API Client Setup

**File:** `frontend/src/services/apiClient.js`

```javascript
import axios from 'axios'

const PRODUCTION_API_URL = 'https://food-bridge-6-zn3t.onrender.com/api'

function resolveApiBaseUrl() {
  const envUrl = import.meta.env.VITE_API_BASE_URL
  const raw = envUrl && envUrl.trim() ? envUrl.trim() : PRODUCTION_API_URL

  if (typeof window === 'undefined') return raw

  try {
    const url = new URL(raw)
    const currentHost = window.location.hostname
    const isLocalHostUrl = url.hostname === 'localhost' || url.hostname === '127.0.0.1'
    const isDifferentClient =
      currentHost &&
      currentHost !== 'localhost' &&
      currentHost !== '127.0.0.1' &&
      currentHost !== url.hostname

    if (isLocalHostUrl && isDifferentClient) {
      url.hostname = currentHost
      return url.toString().replace(/\/$/, '')
    }
  } catch {
    // Keep original value if not parseable
  }

  return raw
}

const API_BASE_URL = resolveApiBaseUrl()

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
})

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('foodbridge_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default apiClient
export { API_BASE_URL }
```

### 6.3.5 Real-time Data Integration

**File:** `frontend/src/services/firestoreService.js`

```javascript
import apiClient from './apiClient'

function normalizeFood(food) {
  if (!food) return null
  return {
    ...food,
    id: food.id || food._id,
    donorId: food.donorId || food.donor?._id,
  }
}

function startPolling(fetchFn, onNext, onError, intervalMs = 7000) {
  let active = true
  const run = async () => {
    try {
      const rows = await fetchFn()
      if (active) onNext(rows)
    } catch (error) {
      if (active) onError?.(error)
    }
  }
  run()
  const timer = window.setInterval(run, intervalMs)
  return () => {
    active = false
    window.clearInterval(timer)
  }
}

export async function fetchFoods(params = {}) {
  const { data } = await apiClient.get('/food', { params })
  return (data?.data || []).map(normalizeFood)
}

export function subscribeAvailableFoods(onNext, onError) {
  return startPolling(() => fetchFoods({ status: 'available' }), onNext, onError)
}
```

### 6.3.6 Image Upload Integration

**File:** `frontend/src/services/cloudinaryService.js`

```javascript
import axios from 'axios'

const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
export const isCloudinaryConfigured = Boolean(cloudName && uploadPreset)

export async function uploadImage(file) {
  if (!isCloudinaryConfigured) {
    throw new Error('Missing Cloudinary configuration')
  }

  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', uploadPreset)

  const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`

  const { data } = await axios.post(url, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    timeout: 120000,
  })

  if (!data?.secure_url) {
    throw new Error('Cloudinary response did not include secure_url')
  }

  return data.secure_url
}
```

## 6.4 Key Implementation Challenges and Solutions

### Challenge 1: Real-time Data Synchronization
**Problem:** Need real-time updates without WebSocket complexity
**Solution:** Implemented polling mechanism with 7-second intervals
**Result:** Simple, reliable, sufficient for use case

### Challenge 2: Image Upload Performance
**Problem:** Large images slow down application
**Solution:** Integrated Cloudinary for optimized storage and CDN delivery
**Result:** Fast uploads, automatic optimization, global CDN

### Challenge 3: Cross-Origin Requests
**Problem:** Frontend and backend on different domains
**Solution:** Proper CORS configuration with allowed origins
**Result:** Secure cross-origin communication

### Challenge 4: Environment Configuration
**Problem:** Different settings for development and production
**Solution:** Environment variables with .env files
**Result:** Easy configuration management, secure secrets

---

