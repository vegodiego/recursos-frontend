import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';


const reducer = (state,action) => {
  if(action.type === "ACTUALIZANDO_BROKEN"){ 
    return {
      ...state,
      broken: action.object
    }
  } else if( action.type === 'ACTUALIZANDO_LOS_RECURSOS'){ 
    return {
      ...state,
      recursos: action.object
    }
  } else if( action.type === 'ACTUALIZANDO_MENSAJE_DE_RECURSO_ELIMINADO'){ 
    return {
      ...state,
      recursoDeleted: action.object
    }
  } else if( action.type === 'ACTUALIZANDO_MENSAJE_DE_RECURSO_AGREGADO'){ 
    return {
      ...state,
      recursoAdded: action.object
    }
  } else if( action.type === 'ACTUALIZANDO_MENSAJE_DE_RECURSO_EDITADO'){ 
    return {
      ...state,
      recursoEdited: action.object
    }
  } else if( action.type === 'ACTUALIZANDO_EL_RECURSO_ACTUAL'){
    return {
      ...state,
      currentRecursoId: action.object
    }  
  } else if( action.type === 'ACTUALIZANDO_REDIRECT_CREATE'){ 
    return {
      ...state,
      redirectCreate: action.object
    }
  } else if( action.type === 'ACTUALIZANDO_TITULO'){ 
    return {
      ...state,
      titulo: action.object
    }
  } else if( action.type === 'ACTUALIZANDO_CLAVES'){ 
    return {
      ...state,
      claves: action.object
    }
  } else if( action.type === 'ACTUALIZANDO_WRONGENTRY3'){ 
    return {
      ...state,
      wrongEntry3: action.object
    }
  } else if( action.type === 'ACTUALIZANDO_DESCRIPCION'){ 
    return {
      ...state,
      descripcion: action.object
    }
  } else if( action.type === 'ACTUALIZANDO_FUENTE'){ 
    return {
      ...state,
      fuente: action.object
    }
  } else if( action.type === 'ACTUALIZANDO_WRONGENTRY1'){ 
    return {
      ...state,
      wrongEntry1: action.object
    }
  } else if( action.type === 'ACTUALIZANDO_WRONGENTRY2'){ 
    return {
      ...state,
      wrongEntry2: action.object
    }
  } else if( action.type === 'ACTUALIZANDO_TIPO_DEL_RECURSO'){ 
    return {
      ...state,
      tipoDelRecurso: action.object
    }
  } else if( action.type === 'ACTUALIZANDO_COBERTURA'){ 
    return {
      ...state,
      cobertura: action.object
    }
  } else if( action.type === 'ACTUALIZANDO_WRONGENTRY4'){ 
    return {
      ...state,
      wrongEntry4: action.object
    }
  } else if( action.type === 'ACTUALIZANDO_REDIRECT_EDIT'){ 
    return {
      ...state,
      redirectEdit: action.object
    }
  } else if( action.type === 'ACTUALIZANDO_REDIRECT_SHOW'){ 
    return {
      ...state,
      redirectShow: action.object
    }
  } else if( action.type === 'ACTUALIZANDO_EDITING_FROM_SHOW'){ 
    return {
      ...state,
      editingFromShow: action.object
    }
  } 
  return state;
};


export default createStore(reducer, {
  broken: false, 
  recursos: [], 
  recursoDeleted: false, 
  recursoAdded: false, 
  recursoEdited: false,
  currentRecursoId: localStorage.getItem('currentRecursoId'), 
  redirectCreate: false,  
  titulo: "", 
  claves: "",
  wrongEntry3: false, 
  descripcion: "", 
  fuente: "",
  wrongEntry1: false, 
  wrongEntry2: false, 
  tipoDelRecurso: "", 
  cobertura: "",
  wrongEntry4: false, 
  redirectEdit: null, 
  redirectShow: false,
  editingFromShow: false
}, applyMiddleware(thunk)); 