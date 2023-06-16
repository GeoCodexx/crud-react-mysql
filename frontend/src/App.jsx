import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";

function App() {
  const [idEmployee, setIdEmployee] = useState(0);
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState(0);
  const [pais, setPais] = useState("");
  const [cargo, setCargo] = useState("");
  const [anios, setAnios] = useState(0);
  const [listEmployee, setListEmployee] = useState([]);
  const [editar, setEditar] = useState(false);

  const cleanInputs = () => {
    //e.preventDefault();
    setNombre("");
    setEdad("");
    setPais("");
    setCargo("");
    setAnios("");
    setIdEmployee(0);
    setEditar(false);
  };

  //Notificaciones
  const showAlert = (val1, val2 = 0, err = null) => {
    switch (val1) {
      case "add":
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Registro guardado correctamente.",
          showConfirmButton: false,
          timer: 1500,
        });
        break;
      case "edit":
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Datos actualizados correctamente.",
          showConfirmButton: false,
          timer: 1500,
        });
        break;

      case "quitar":
        Swal.fire({
          title: "Estás seguro?",
          text: "No podras revertir esta acción!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Si, Eliminar!",
        }).then((result) => {
          if (result.isConfirmed) {
            deleteEmployee(val2);
            Swal.fire({
              //position: "top-end",
              icon: "success",
              title: "Eliminado!",
              text: "El registro fue eliminado",
              showConfirmButton: false,
              timer: 1500,
            });
            //Swal.fire("Eliminado!", "El registro fue eliminado.","success",1500);
          }
        });
        break;
      case "err":
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Ocurrio un problema durante el proceso!",
          confirmButtonColor: "#DC143C",
          footer: `<h6>${err}</h6>`,
        });
        break;

      default:
        break;
    }
  };

  //CREATE EMPLOYEE
  const createEmployee = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/employees/create", {
        nombre,
        edad,
        pais,
        cargo,
        anios,
      })
      .then(() => {
        console.log("Datos enviados correctamente.");
        showAlert("add");
        getListEmployees();
        cleanInputs();
      })
      .catch((err) => {
        console.error(err);
        showAlert("err", 0, err.message);
      });
  };

  //list Employees
  const getListEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:3001/employees");
      const data = response.data;
      console.log("Respuesta:", data);
      setListEmployee(data);
    } catch (error) {
      console.log(error.message);
      showAlert("err", 0, error.message);
    }
  };

  const fillDataInputs = (row) => {
    setIdEmployee(row.idempleado);
    setNombre(row.nombre);
    setEdad(row.edad);
    setPais(row.pais);
    setCargo(row.cargo);
    setAnios(row.anios);
    setEditar(true);
  };

  const editEmployee = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:3001/employees/${idEmployee}`,
        {
          nombre,
          edad,
          pais,
          cargo,
          anios,
        }
      );
      const data = response.data;
      console.log("Respuesta Update:", data);
      showAlert("edit");
      getListEmployees();
      cleanInputs();
      setEditar(false);
    } catch (error) {
      console.log(error);
      showAlert("err", 0, error.message);
    }
  };

  //Delete
  const deleteEmployee = async (idEmp) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/employees/${idEmp}`
      );
      const data = response.data;
      console.log("Respuesta delete:", data);
      getListEmployees();
      cleanInputs();
    } catch (error) {
      console.log(error);
      showAlert("err", 0, error.message);
    }
  };

  useEffect(() => {
    getListEmployees();
  }, []);

  /*const handleDelete = (id) => { 
    setIdEmployee(id);
    //showAlert('quitar');
    console.log(idEmployee);
   }*/

  return (
    <div className="container">
      <div className="card text-center">
        <form>
          <div className="card-header">Gestión de Empleados</div>
          <div className="card-body">
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                Nombre:
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Nombre completo"
                aria-label="Nombre"
                aria-describedby="basic-addon1"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon2">
                Edad:
              </span>
              <input
                type="number"
                className="form-control"
                aria-label="Edad"
                aria-describedby="basic-addon2"
                value={edad != 0 ? edad : ""}
                onChange={(e) => setEdad(e.target.value)}
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon3">
                País:
              </span>
              <input
                type="text"
                className="form-control"
                aria-label="Edad"
                aria-describedby="basic-addon3"
                value={pais}
                onChange={(e) => setPais(e.target.value)}
              />
            </div>

            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon4">
                Cargo:
              </span>
              <input
                type="text"
                className="form-control"
                aria-label="Cargo"
                aria-describedby="basic-addon4"
                value={cargo}
                onChange={(e) => setCargo(e.target.value)}
              />
            </div>

            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon5">
                Años de Experiencia:
              </span>
              <input
                type="number"
                className="form-control"
                aria-label="Años"
                aria-describedby="basic-addon5"
                value={anios != 0 ? anios : ""}
                onChange={(e) => setAnios(e.target.value)}
              />
            </div>
          </div>
          <div className="card-footer">
            {!editar ? (
              <button className="btn btn-success" onClick={createEmployee}>
                Registrar
              </button>
            ) : (
              <button className="btn btn-warning" onClick={editEmployee}>
                Actualizar
              </button>
            )}
            <button
              type="button"
              className="btn btn-secondary m-3"
              onClick={cleanInputs}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Edad</th>
            <th scope="col">País</th>
            <th scope="col">Cargo</th>
            <th scope="col">Años Exp.</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {listEmployee.map((elem, i) => (
            <tr key={i}>
              <th scope="row">{i + 1}</th>
              <td>{elem.nombre}</td>
              <td>{elem.edad}</td>
              <td>{elem.pais}</td>
              <td>{elem.cargo}</td>
              <td>{elem.anios}</td>
              <td>
                <div
                  className="btn-group"
                  role="group"
                  aria-label="Basic mixed styles example"
                >
                  {/* <button type="button" class="btn btn-info" onClick={() => fillDataInputs(elem)}>
                    Ver
                  </button> */}
                  <button
                    type="button"
                    className="btn btn-info"
                    onClick={() => fillDataInputs(elem)}
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => showAlert("quitar", elem.idempleado)}
                  >
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
