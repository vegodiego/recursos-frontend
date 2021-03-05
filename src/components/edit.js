import React, {useEffect} from 'react';
import {Redirect, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {setData, submitEdit, change} from '../actionCreators';


const Edit = (props) => {
  const notBucle = null;

  useEffect(() => {
    props.setData(props.currentRecursoId);
  },[notBucle]); 

  if (props.broken === true) {
    return <Redirect to="/broken" />
  }

  if (props.redirectEdit !== null) {
    return <Redirect to={props.redirectEdit}/>
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-10 col-lg-8">
          <h2 className="mb-4 text-center mt-3">Editar recurso</h2>
          <form onSubmit={(event) => props.submitEdit(props.currentRecursoId, props.editingFromShow, props.titulo, props.claves, props.descripcion, props.fuente, props.tipoDelRecurso, props.cobertura, event)} className="mb-5">
            <div className="form-group">
              <label htmlFor="titulo">Título:</label>
              <input type="text" className="form-control" value={props.titulo} onChange={props.change} name="titulo" id="titulo" placeholder="Ingrese el título"></input>
            </div>
            <div className="form-group">
              <label htmlFor="claves">Claves:</label>
              <input type="text" className={props.wrongEntry3 ? "is-invalid form-control": "form-control"} value={props.claves} onChange={props.change} name="claves" id="claves" placeholder="Formato de ingreso:  palabra,palabra,palabra,palabra"></input>
              <div className={props.wrongEntry3 === false ? "d-none": "text-danger"}>Ingreso incorrecto de información</div>
            </div>
            <div className="form-group">
              <label htmlFor="descripcion">Descripción:</label>
              <textarea className="form-control" rows="5" value={props.descripcion} onChange={props.change} name="descripcion" id="descripcion" placeholder="Ingrese la descripción"></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="pwd">*Fuente:</label>
              <input type="text" className={props.wrongEntry1 ? "is-invalid form-control": props.wrongEntry2 ? "is-invalid form-control": "form-control"} value={props.fuente} onChange={props.change} name="fuente" id="fuente" placeholder="Ingrese la fuente"></input>
              <div className={props.wrongEntry1 === false ? "d-none": "text-danger"}>Debe ingresar un valor</div>
              <div className={props.wrongEntry2 === false ? "d-none": "text-danger"}>Ya existe un recurso con la fuente ingresada</div>
            </div>
            <div className="form-group">
              <label htmlFor="tipo_del_recurso">Tipo del recurso:</label>
              <select className="form-control" value={props.tipoDelRecurso} onChange={props.change} name="tipo_del_recurso" id="tipo_del_recurso">
                <option value=""></option>
                <option value="testimonio">Testimonio</option>
                <option value="informe">Informe</option>
                <option value="caso">Caso</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="cobertura">Cobertura:</label>
              <input type="text" className={props.wrongEntry4 ? "is-invalid form-control": "form-control"} value={props.cobertura} onChange={props.change} name="cobertura" id="cobertura" placeholder="Formato de ingreso:  AAAA-AAAA,Municipio(Departamento)"></input>
              <div className={props.wrongEntry4 === false ? "d-none": "text-danger"}>Ingreso incorrecto de información</div>
            </div>
            <button type="submit" className="btn btn-info">Editar Recurso</button>
            <Link to={"/show/"+props.currentRecursoId} className={props.editingFromShow === false ? "d-none": "btn btn-info ml-2"}>Cancelar</Link>
            <Link to="/" className={props.editingFromShow === true ? "d-none": "btn btn-info ml-2"}>Cancelar</Link>
          </form>
        </div>
      </div> 
    </div>
  );
}

const mapStateToProps = state => {
  return {
    currentRecursoId: state.currentRecursoId,
    broken: state.broken,
    redirectEdit: state.redirectEdit,
    editingFromShow: state.editingFromShow,
    titulo: state.titulo, 
    claves: state.claves,
    wrongEntry3: state.wrongEntry3,
    descripcion: state.descripcion,
    fuente: state.fuente,
    wrongEntry1: state.wrongEntry1,
    wrongEntry2: state.wrongEntry2, 
    tipoDelRecurso: state.tipoDelRecurso,
    cobertura: state.cobertura,
    wrongEntry4: state.wrongEntry4
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setData(id){
      dispatch(setData(id));
    },
    submitEdit(currentRecursoId, editingFromShow, titulo, claves, descripcion, fuente, tipoDelRecurso, cobertura, event){
      event.preventDefault();
      dispatch(submitEdit(currentRecursoId, editingFromShow, titulo, claves, descripcion, fuente, tipoDelRecurso, cobertura))
    },
    change(event){
      dispatch(change(event));
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Edit);