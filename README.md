# COMP3123 Assignment 2: Full-Stack Employee Management Application

Developed by:

Gokul Jinu

Student ID: 101373306

COMP3123 - Assignment 2

## Table of Contents

- [Project Description](#project-description)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
  - [1. Download the Project](#1-download-the-project)
  - [2. Extract the Project Files](#2-extract-the-project-files)
  - [3. Set Up Environment Variables](#3-set-up-environment-variables)
  - [4. Build and Start Services with Docker Compose](#4-build-and-start-services-with-docker-compose)
- [Usage](#usage)
- [Troubleshooting](#troubleshooting)

---

## Project Description

The **COMP3123 Assignment 2** project is a **Full-Stack Employee Management Application** designed to help users manage employee records efficiently. This application features user authentication, allowing authorized users to perform CRUD (Create, Read, Update, Delete) operations on employee data. The frontend is built with **React** and **Material-UI**, the backend utilizes **Node.js** with **Express**, and **MongoDB** serves as the database. The entire application is containerized using **Docker Compose** to ensure seamless deployment and scalability.

---

## Features

- **User Authentication:**
  - Signup and Login functionalities.
  - Protected routes accessible only to authenticated users.

- **Employee Management:**
  - **Add Employee:** Create new employee records.
  - **View Employees:** Display a list of all employees.
  - **Edit Employee:** Modify existing employee details.
  - **Delete Employee:** Remove employee records.
  - **Search Employees:** Filter employees based on department and position.

- **Responsive UI:**
  - Built with **Material-UI** for a professional and responsive design.

- **Containerization:**
  - Utilizes **Docker Compose** to manage frontend, backend, and MongoDB services.

---

## Prerequisites

Before setting up the application, ensure that the following are installed on your machine:

1. **Docker Desktop:**
   - **Download:** [Docker Desktop](https://www.docker.com/products/docker-desktop)
   - **Installation:** Follow the official installation guide for your operating system (Windows, macOS, or Linux).

2. **Docker Compose:**
   - **Note:** Docker Desktop includes Docker Compose. For Linux users, if Docker Compose isn't included, follow the [official installation guide](https://docs.docker.com/compose/install/).

3. **Git (Optional but Recommended):**
   - If you prefer to clone the repository instead of downloading a zip file.
   - **Download:** [Git Downloads](https://git-scm.com/downloads)

4. **Code Editor (Optional):**
   - For viewing and editing the code.
   - **Recommendations:** [Visual Studio Code](https://code.visualstudio.com/), [Atom](https://atom.io/), [Sublime Text](https://www.sublimetext.com/)

---

## Installation

Follow the steps below to set up and run the application on your local machine.

### 1. Download the Project

You can obtain the project files in two ways:

- **Option A: Clone the Repository (Recommended)**

  If the project is hosted on a version control platform like GitHub, clone it using Git:

  ```bash
  git clone https://github.com/yourusername/comp3123_assignment2.git
  cd comp3123_assignment2
