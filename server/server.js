const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "empleados_crud",
  port: 3306,
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

//CREATE
app.post("/employees/create", (req, res) => {
  db.query(
    "INSERT INTO empleados(nombre,edad, pais, cargo, anios) VALUES(?,?,?,?,?)",
    [
      req.body.nombre,
      req.body.edad,
      req.body.pais,
      req.body.cargo,
      req.body.anios,
    ],
    (err, result) => {
      if (err) console.log(err);
      res.send("Empleado registrado correctamente.");
    }
  );
});

//READ
app.get("/employees", (req, res) => {
  db.query("SELECT * FROM empleados", (err, result) => {
    if (err) console.log(err);
    res.send(result);
  });
  //res.send("result listado server");
});

//UPDATE
app.put("/employees/:id", (req, res) => {
  //console.log(req.body,req.params.id);
  //res.send('Datos actualizados');
  db.query(
    "UPDATE empleados SET ? WHERE idempleado=?",
    [req.body, req.params.id],
    (err, result) => {
      if (err) console.log(err);
      res.send(result);
    }
  );
  //res.send("result listado server");
});

//DELETE
app.delete("/employees/:id", (req, res) => {
  db.query(
    "DELETE FROM empleados WHERE idempleado=?",
    [req.params.id],
    (err, result) => {
      if (err) console.log(err);
      res.send(result);
    }
  );
});
app.listen(3001, () => console.log("Servidor corriendo en el puerto 3001"));
