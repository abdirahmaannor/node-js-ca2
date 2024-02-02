import express from "express";
import members from "../models/Memmodel.js";

const MemRouters = express.Router();

//reading data

MemRouters.get("/all", async (req, res) => {
  const sogali = await members.find();

  res.send(sogali);
});

//post

MemRouters.post("/add", async (req, res) => {
  const kudar = new members({
    memname: req.body.memname,
    memsex: req.body.memsex,
    Adress: req.body.Adress,
    tell: req.body.tell,
    regdate: req.body.regdate,
  });

  await kudar.save();
  res.send("saved success");
});

//Delete

MemRouters.delete("/:id", async (req, res) => {
  members.remove({ _id: req.params.id })
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

MemRouters.put("/:id", async (req, res) => {
  console.log(req.params.id);
  members.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          memname: req.body.memname,
          memsex: req.body.memsex,
          Adress: req.body.Adress,
          tell: req.body.tell,
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

export default MemRouters;
