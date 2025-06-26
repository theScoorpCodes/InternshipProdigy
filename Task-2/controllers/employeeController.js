const Employee = require("../models/Employee");

exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).send("Server error");
  }
};

exports.getEmployee = async (req, res) => {
  try {
    const emp = await Employee.findById(req.params.id);
    if (!emp) return res.status(404).json({ msg: "Employee not found" });
    res.json(emp);
  } catch (err) {
    res.status(500).send("Server error");
  }
};

exports.createEmployee = async (req, res) => {
  try {
    const newEmp = new Employee(req.body);
    const emp = await newEmp.save();
    res.json(emp);
  } catch (err) {
    res.status(400).send("Invalid data");
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    const emp = await Employee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!emp) return res.status(404).json({ msg: "Employee not found" });
    res.json(emp);
  } catch (err) {
    res.status(400).send("Invalid update");
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    const emp = await Employee.findByIdAndDelete(req.params.id);
    if (!emp) return res.status(404).json({ msg: "Employee not found" });
    res.json({ msg: "Employee deleted" });
  } catch (err) {
    res.status(500).send("Server error");
  }
};
