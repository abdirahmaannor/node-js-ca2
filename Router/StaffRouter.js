import express from "express";
import staff from "../models/Staffmodel.js";

const StaffRouters = express.Router();

//reading data

StaffRouters.get("/all", async (req, res) => {
  const sogali = await staff.find();

  res.send(sogali);
});

//post

StaffRouters.post("/add", async (req, res) => {
  const kudar = new staff({
    staffname: req.body.staffname,
    staffsex: req.body.staffsex,
    Adress: req.body.Adress,
    tell: req.body.tell,
    staffjob: req.body.staffjob,
    regdate: req.body.regdate,
  });

  await kudar.save();
  res.send("saved success");
});

//Delete

StaffRouters.delete("/:id", async (req, res) => {
  staff.remove({ _id: req.params.id })
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

StaffRouters.put("/:id", async (req, res) => {
  console.log(req.params.id);
  staff.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          staffname: req.body.staffname,
          staffsex: req.body.staffsex,
          Adress: req.body.Adress,
          tell: req.body.tell,
          staffjob: req.body.staffjob,
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

export default StaffRouters;
