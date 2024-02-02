import express from "express";
import payment from "../models/Paymodel.js";

const PayRouters = express.Router();

//reading data

PayRouters.get("/all", async (req, res) => {
  const sogali = await payment.find();

  res.send(sogali);
});

//post

PayRouters.post("/add", async (req, res) => {
  const kudar = new payment({
    memname: req.body.memname,
    price: req.body.price,
    regdate: req.body.regdate,
  });

  await kudar.save();
  res.send("saved success");
});

//Delete

PayRouters.delete("/:id", async (req, res) => {
    payment.remove({ _id: req.params.id })
    .then((result) => {
      res.status(200).json({
        message: "data deleted",
        reslt: result,
      });
    })
    .catch((err) => {
      req.status(404).json({
        Error: err,
      });
    });
});

//update

PayRouters.put("/:id", async (req, res) => {
  console.log(req.params.id);
  payment.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          memname: req.body.memname,
          price: req.body.price,
          regdate: req.body.regdate,
        },
      }
    )
    .then((result) => {
      res.status(200).json({
        update: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({
        Error: err,
      });
    });
});

export default PayRouters;
