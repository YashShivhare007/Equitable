# Equitable
Does Image Classification


### To run the code

* Frontend
  ```
  cd frontend  
  npm i
  npm start
  ```
* Backend (Windows)
  ```
  cd backend
  python -m flask run
  ```
  (Linux)
  ```
  cd backend
  flask run
  ```

## Image Annotation Application

This web application facilitates image annotation using a robust layered architecture and implements JWT (JSON Web Token) authentication for enhanced security and privacy.

### Layers of the Architecture

1. **Presentation Layer (Frontend - JavaScript)**
   - **Responsibility:** This layer focuses on the user interface (UI) and user interactions.
   - **Advantages:**
     - **Separation of Concerns:** Frontend handles UI independently, allowing for easy updates without affecting other layers.
     - **Enhanced Maintainability:** Changes to the UI are isolated and do not impact backend functionality.
     - **Adaptability:** Frontend can be optimized for different devices and platforms.

2. **Business Layer (JavaScript Functions)**
   - **Responsibility:** Contains the core business logic implemented in JavaScript functions.
   - **Advantages:**
     - **Centralized Business Rules:** Logic is encapsulated, promoting reusability and modularity.
     - **Testability:** Functions are independent of UI, facilitating unit testing and debugging.
     - **Scalability:** Modular functions can be scaled as the application grows.

3. **Persistence Layer (Middleware/Backend - Flask(Python))**
   - **Responsibility:** Manages data persistence and interacts with the SQLite3 database through Django resources.
   - **Advantages:**
     - **Data Management:** Separates data access from business logic, ensuring integrity and security.
     - **ORM (Object-Relational Mapping):** Simplifies database operations and schema changes.
     - **Performance Optimization:** Efficient handling of database queries and updates.

4. **Database Layer (SQLite3)**
   - **Responsibility:** Manages data persistence and interacts with the SQLite3 database.
   - **Advantages:**
     - **Data Storage:** Stores and retrieves data efficiently using a relational database management system.
     - **Data Integrity:** Ensures consistency and reliability of data through ACID properties.
     - **Query Optimization:** Optimizes database queries for improved performance.
     - **Scalability:** Can handle large amounts of data and concurrent user requests.

### Authentication and Security

- **JWT (JSON Web Token) Authentication**
  - **Purpose:** Ensures secure user authentication and authorization.
  - **Advantages:**
    - **Stateless Authentication:** Tokens are self-contained, reducing server load and improving scalability.
    - **Enhanced Privacy:** Tokens contain encrypted user information, minimizing data exposure.
    - **Improved User Experience:** Seamless and secure login/logout processes.

### User and Manager Roles

- **User Authorization:**
  - Users have access to basic functionalities like image upload, annotation, and viewing.

- **Manager Authorization:**
  - Managers have additional permissions such as managing user accounts, annotating images, and accessing advanced features.

## Features

- **Image Upload**
  - Supports uploading images in various formats and sizes.
  - Batch upload for multiple images simultaneously.

- **Image Annotation**
  - Annotate images using a dropdown menu of predefined class names.
  - Quick and intuitive annotation process with modification capabilities.

- **Advanced Image Processing**
  - Basic image processing features like resizing upon upload.

- **User Authentication**
  - JWT-based authentication ensures secure access and user privacy.
  - User registration, login, and management functionalities.

## Scalability and Structure

- **Scalability:**
  - The application is designed with scalability in mind, allowing for the seamless addition of new features and handling increased user loads.

- **Well-Structured Architecture:**
  - The layered architecture separates concerns, promoting modularity and maintainability.
  - Clear division of roles and responsibilities ensures a structured and organized codebase.

## Technologies Used

- **Frontend:** React.js
- **Backend:** Flask (Python)
- **Database:** SQLite3 (for local development, can be swapped with PostgreSQL for production)
- **Authentication:** JWT for secure user authentication
- **Additional Libraries:** React Dropzone for file uploads.

## Reference Images
- Reference images have been added signifying the various functionalties and how user and manager accounts have different purposes

## Contributing

Contributions are welcome! Fork the repository and submit pull requests.

## License

This project is licensed under the [MIT License](LICENSE).
