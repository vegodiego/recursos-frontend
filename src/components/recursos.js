import React, {useEffect} from 'react';
import {Redirect, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {getRecursos, updateEditCreate, setCurrentRecursoId, destroy} from '../actionCreators';


const Recursos = (props) => { 
  useEffect(() => {
    props.getRecursos();
    props.updateEditCreate();
  }, [props.recursoDeleted]);

  if (props.broken === true) {
    return <Redirect to="/broken" />
  }

  return (
    <div className="container">
      <div className={props.recursoDeleted === false ? "d-none": "float-right alert alert-success position-fixed"}>Recurso eliminado.</div>
      <div className={props.recursoAdded === false ? "d-none": "float-right alert alert-success position-fixed"}>Recurso agregado.</div>
      <div className={props.recursoEdited === false ? "d-none": "float-right alert alert-success position-fixed"}>Recurso editado.</div>
      <h2 className="text-center mt-3">Recursos</h2>
      <Link to="/new" type="button" className="btn btn-success mt-5">&#43; Agregar recurso</Link>          
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>Título</th>
            <th>Claves</th>
            <th>Fuente</th>
            <th>Tipo del recurso</th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {props.recursos.map((recurso,index) =>
            <tr>
              <td className="align-middle">{recurso.titulo}</td>
              <td className="align-middle">{recurso.claves}</td>
              <td className="align-middle">{recurso.fuente}</td>
              <td className=" align-middle">{recurso.tipo_del_recurso}</td>
              <td className="text-center pr-0 pl-1">
                <Link to = {"/show/"+recurso._id} type="button" onClick={() => props.setCurrentRecursoId(recurso._id)}  className="btn btn-secondary">Mostrar</Link>
              </td>
              <td className="text-center pr-0 pl-1">
                <Link to = {"/recursos/"+recurso._id+"/edit"} type="button" className="btn btn-info" onClick={() => props.setCurrentRecursoId(recurso._id)}>Editar</Link>
              </td>
              <td className="text-center pr-0 pl-1">
                <button type="button" onClick={() => props.destroy(recurso._id)} className="btn btn-danger">Eliminar</button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className={props.recursos.length === 0 ? "": "d-none"}>No hay recursos en la base de datos</div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    recursos: state.recursos,
    broken: state.broken,
    recursoDeleted: state.recursoDeleted,
    recursoAdded: state.recursoAdded,
    recursoEdited: state.recursoEdited
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getRecursos(){
      dispatch(getRecursos());
    },
    updateEditCreate(){
      dispatch(updateEditCreate());
    },
    setCurrentRecursoId(id){
      localStorage.setItem('currentRecursoId', id);
      dispatch(setCurrentRecursoId());
    },
    destroy(id){
      if (window.confirm('¿Estas seguro?')){
        dispatch(destroy(id));
      }
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Recursos);