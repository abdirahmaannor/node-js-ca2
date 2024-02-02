import express from "express";
import salary from "../models/Salmodel.js";

const SalaryRouters = express.Router();

//reading data

SalaryRouters.get("/all", async (req, res) => {
  const sogali = await salary.find()

  res.send(sogali);
});


//post

SalaryRouters.post("/add", async (req, res) => {
  const kudar = new salary({
    staffname: req.body.staffname,
    salprice: req.body.salprice,
    regdate: req.body.regdate,
  });

  await kudar.save();
  res.send("saved success");
});

//Delete

SalaryRouters.delete("/:id", async (req, res) => {
  salary.remove({ _id: req.params.id })
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

SalaryRouters.put("/:id", async (req, res) => {
  console.log(req.params.id);
  salary.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          staffname: req.body.staffname,
          salprice: req.body.salprice,
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

export default SalaryRouters;
