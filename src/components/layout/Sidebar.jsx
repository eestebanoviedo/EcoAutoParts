import React from "react";
import { BrowserRouter as Router, NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="proyectos">
      <NavLink className="nav" to="/formulario">
        Formulario de Carga de Productos
      </NavLink>
      <NavLink className="nav" to="/productos/">
        Ver Productos
      </NavLink>
    </aside>
  );
};

export default Sidebar;
