import React, {useEffect} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {setData, updateEdit, editingFromShow, destroy} from '../actionCreators';


const Show = (props) => {
  const notBucle = null;

  useEffect(() => {
    props.setData(props.currentRecursoId);
    props.updateEdit();
  },[notBucle]); 

  if (props.broken === true) {
    return <Redirect to="/broken" />
  }

  if (props.redirectShow) {
    return <Redirect to='/' />
  }

  return (
    <div className="container">
      <div className={props.recursoEdited === false ? "d-none": "float-right alert alert-success position-fixed"} style={{zIndex:"100"}}>Recurso editado.</div>
      <div className="row m-3">
        <div className="card p-0 col-10 col-lg-5" style={{marginTop:"60px"}}>
          <h3 className="card-header text-center">{props.titulo}</h3>
          <div className="card-body">
            <div>
              <b className="font-weight-bold">Título: </b>{props.titulo}
            </div>
            <div>
              <b className="font-weight-bold">Claves: </b>{props.claves}
            </div>
            <div>
              <b className="font-weight-bold">Descripción: </b>{props.descripcion}
            </div>
            <div>
              <b className="font-weight-bold">Fuente: </b>{props.fuente}
            </div>
            <div>
              <b className="font-weight-bold">Tipo del recurso: </b>{props.tipoDelRecurso}
            </div>
            <div>
              <b className="font-weight-bold">Cobertura: </b>{props.cobertura}
            </div>
            <div className="mt-3">
              <Link to={"/recursos/"+props.currentRecursoId+"/edit"} onClick={() => props.editingFromShow(props.recurso)} className="btn btn-info">Editar recurso</Link>
              <button onClick={() => props.destroy(props.currentRecursoId)} className="btn btn-danger ml-2">Eliminar</button>
            </div>
          </div>
        </div>  
      </div>
      <div className="row m-3">
        <div className="p-0">
          <Link to="/">Volver</Link>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    currentRecursoId: state.currentRecursoId,
    broken: state.broken,
    redirectShow: state.redirectShow,
    recursoEdited: state.recursoEdited,
    titulo: state.titulo, 
    claves: state.claves,
    descripcion: state.descripcion,
    fuente: state.fuente,
    wrongEntry1: state.wrongEntry1,
    wrongEntry2: state.wrongEntry2, 
    tipoDelRecurso: state.tipoDelRecurso,
    cobertura: state.cobertura
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setData(id){
      dispatch(setData(id));
    },
    updateEdit(){
      dispatch(updateEdit());
    },
    editingFromShow(recurso){
      dispatch(editingFromShow());
    },
    destroy(id){
      if (window.confirm('¿Estas seguro?')){
        dispatch(destroy(id));
      }
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Show);