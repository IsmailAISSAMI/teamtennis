const Employe = require("../models/employe.model");

exports.create = (req, res) => {
  const employe = new Employe({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    age: req.body.age,
    address: req.body.address,
    phoneNumber: req.body.phoneNumber,
    employePosition: req.body.employePosition,
    hourPerWeek: req.body.hourPerWeek,
    salaryPerHour: req.body.salaryPerHour,
    description: req.body.description,
  });

  employe
    .save()
    .then((data) => {
      res.send({
        message: "The employee is created successfully!",
        employe: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        error: 500,
        message: err.message || "some error occured while creating employee",
      });
    });
};

exports.getEmploye = (req, res) => {
    Employe.findById(req.params.id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Employee with id ${req.params.id} not found!`,
        });
      }
      res.send(data);
    })
    .catch((err) => res.send(err));
};

exports.getEmployes = (req, res) => {
    Employe.find()
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Employee with id ${req.params.id} not found!`,
        });
      }
      res.send(data);
    })
    .catch((err) => res.send(err));
};


exports.update = async (req, res) => {
    const updates = Object.keys(req.body)
    try{
        const employe = await Employe.findById(req.params.id)
        updates.forEach((update)=>{
            employe[update] = req.body[update]
        })
        await employe.save()

        if(!employe){
            res.satatus(404).send({
                message: `Employee with id ${req.params.id} not found!`            })
        }
        res.send({
            message: `Employee with id ${req.params.id} has been updated successfully !`,
            employe 
        })
    } catch(err){
        res.send(err)
    }
}
