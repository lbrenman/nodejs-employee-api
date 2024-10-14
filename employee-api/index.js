const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authenticate = require('./auth');

require('dotenv').config();

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// MongoDB Atlas connection to Database: Misc
const mongoUri = `mongodb+srv://${process.env.MONGODBUSERNAME}:${process.env.MONGODBPASSWORD}@cluster0.sfjo0.mongodb.net/Misc?retryWrites=true&w=majority&appName=Cluster0`;
// mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connect(mongoUri)
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.error('Could not connect to MongoDB Atlas', err));

    
// Employee schema and model
const employeeSchema = new mongoose.Schema({
    name: String,
    position: String,
    department: String,
    salary: Number
});

const Employee = mongoose.model('Employee', employeeSchema);

// CRUD operations

// Create Employee
app.post('/employees', authenticate, async (req, res) => {
    const newEmployee = new Employee(req.body);
    try {
        const savedEmployee = await newEmployee.save();
        res.status(201).send(savedEmployee);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Get All Employees
app.get('/employees', authenticate, async (req, res) => {
    try {
        const employees = await Employee.find();
        res.send(employees);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Get Employee by ID
app.get('/employees/:id', authenticate, async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) return res.status(404).send('Employee not found');
        res.send(employee);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Update Employee
app.put('/employees/:id', authenticate, async (req, res) => {
    try {
        const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!employee) return res.status(404).send('Employee not found');
        res.send(employee);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Delete Employee
app.delete('/employees/:id', authenticate, async (req, res) => {
    try {
        const employee = await Employee.findByIdAndDelete(req.params.id);
        if (!employee) return res.status(404).send('Employee not found');
        res.status(204).send();
    } catch (err) {
        res.status(500).send(err);
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});