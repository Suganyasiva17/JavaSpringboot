Expense Reimbursement Management
System
Business Objective
Design and develop a web-based application that enables employees to:
Manage reimbursement requests
Track expense submissions
Monitor approval status
Calculate total claimed and approved amounts
The system should provide a centralized dashboard for reimbursement insights.
System Overview
This application allows an Employee to create and manage one or more Reimbursement
Requests. Each request belongs to a specific Category.
The system performs financial tracking to determine:
Total requested amount
Total approved amount
Total pending amount
Reimbursement summary
Entities & Data Model
Employee
Represents the system user who submits reimbursement
requests.
Reimbursement
Represents a financial claim submitted by an employee.
Category
Represents the type of expense (Travel, Food, Office, etc.).
Entity Associations
Employee → Reimbursement
One Employee can submit multiple Reimbursement
Requests. Category → Reimbursement
One Category can contain multiple Reimbursement
Requests.
Core Functional Requirements
Employee Management
Create employee
Update employee details
View employee list
Delete employee
Category Management
Create category
Update category
View categories
Delete category
Reimbursement Management
Create reimbursement request
Update reimbursement request
View reimbursements
Delete reimbursement
Financial Calculations
The system must automatically compute:
Total Requested Amount
Sum of all reimbursement amounts
Total Approved Amount
Sum of all approved reimbursements
Total Pending Amount
Requested Amount − Approved Amount
Reimbursement Summary
Total requested amount
Total approved amount
Total pending amount
Category-wise expense performance
Application Screens / Routes
Authentication (Optional Assumption)
/login
Dashboard
Route: /dashboard
Purpose:
Display total requested amount
Show approved amount summary
Show pending reimbursement summary
Employee Management
Route: /employees
Features:
List employees
Add employee
Edit employee
Delete employee
Category Management
Route: /categories
Features:
List categories
Create new category
Edit category
Delete category
Reimbursement Management
Route: /reimbursements
Features:
View reimbursements
Create reimbursement request
Edit reimbursement
Delete reimbursement
Technical Implementation Requirements
Backend (Spring Boot)
RESTful APIs
Layered architecture:
Controller
Service
Repository
JPA relationships
Exception handling
Validation
Unit tests (JUnit + Mockito)
Code coverage recommended
Frontend (React)
React components
Redux for state management
React Router for navigation
Axios / Fetch for API calls
Basic styling (CSS or Bootstrap)
Database (MySQL)
Proper foreign key constraints
Normalized structure
Deployment
Frontend built using npm run build
Backend deployed on Apache Tomcat
Database connected via Spring Boot configuration
Assumptions
Approval workflow can be basic.
Currency is single (e.g., INR or USD).
No external finance API integration
required. Authentication can be basic or
optional.
