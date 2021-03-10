const Bill = require("../models/bill.model");
const User = require("../models/user.model");
const Subscription = require("../models/subscription.model");

exports.create = (req, res) => {
  const bill = new Bill({
    Reference: req.body.Reference,
    billDate: req.body.billDate,
    totalHT: req.body.totalHT,
    totalTTC: req.body.totalTTC,
    member: req.body.member,
    subscriptions: req.body.subscriptions,
  });

  bill
    .save()
    .then(async (data) => {
      try {
        let [user, subscriptions] = await Promise.all([
          User.findByIdAndUpdate(req.body.member, {
            member: data._id,
          }),
          Subscription.findByIdAndUpdate(req.body.subscriptions, {
            subscriptions: data._id,
          }),
        ]);
        res.send({
          user,
          subscriptions,
          data: data,
        });
      } catch (err) {
        res.send(err);
      }
    })
    .catch((err) => res.send(err));
};


exports.getBill = (req, res) => {
    Bill.findById(req.params.id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Bill with id ${req.params.id} not found!`,
        });
      }
      res.send(data);
    })
    .catch((err) => res.send(err));
};

exports.getBills = (req, res) => {
    Bill.find()
    .populate('member')
    .populate('subscriptions')
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Bills not found!`,
        });
      }
      res.send(data);
    })
    .catch((err) => res.send(err));
};


exports.update = async (req, res) => {
    const updates = Object.keys(req.body)
    try{
        const bill = await Bill.findById(req.params.id)
        updates.forEach((update)=>{
            bill[update] = req.body[update]
        })
        await bill.save()

        if(!bill){
            res.satatus(404).send({
                message: `Bill with id ${req.params.id} not found!`})
        }
        res.send({
            message: `Bill with id ${req.params.id} has been updated successfully !`,
            bill 
        })
    } catch(err){
        res.send(err)
    }
}