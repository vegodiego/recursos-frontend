import axios from 'axios';


const updateBrokenTrue = () =>{
  return{
    type: "ACTUALIZANDO_BROKEN",
    object: true
  }
}

const updateBrokenFalse = () =>{
  return{
    type: "ACTUALIZANDO_BROKEN",
    object: false
  }
}

const getRecursos = () =>{
  return dispatch => {
    return axios.get('https://recursos-backend.herokuapp.com/recursos') 
      .then(response => {
        dispatch ({
          type: 'ACTUALIZANDO_LOS_RECURSOS',
          object: response.data
        })
      })
      .catch(err => {
        dispatch ({
          type: "ACTUALIZANDO_BROKEN",
          object: true
        })
        console.log(err);
      })
  }
}

const updateEditCreate = () =>{
  return dispatch => {
    dispatch ({
      type: 'ACTUALIZANDO_REDIRECT_CREATE',
      object: false
    })
    dispatch ({
      type: 'ACTUALIZANDO_TITULO',
      object: ''
    })
    dispatch ({
      type: 'ACTUALIZANDO_CLAVES',
      object:''
    })
    dispatch ({
      type: 'ACTUALIZANDO_DESCRIPCION',
      object: ''
    })
    dispatch ({
      type: 'ACTUALIZANDO_FUENTE',
      object: ''
    })
    dispatch ({
      type: 'ACTUALIZANDO_TIPO_DEL_RECURSO',
      object: ''
    })
    dispatch ({
      type: 'ACTUALIZANDO_COBERTURA',
      object: ''
    })
    dispatch ({
      type: 'ACTUALIZANDO_WRONGENTRY1',
      object: false
    })
    dispatch ({
      type: 'ACTUALIZANDO_WRONGENTRY2',
      object: false
    })
    dispatch ({
      type: 'ACTUALIZANDO_WRONGENTRY3',
      object: false
    })
    dispatch ({
      type: 'ACTUALIZANDO_WRONGENTRY4',
      object: false
    })
    dispatch ({
      type: 'ACTUALIZANDO_REDIRECT_EDIT',
      object: null
    })
    dispatch ({
      type: 'ACTUALIZANDO_REDIRECT_SHOW',
      object: false
    })
  }
}

const setCurrentRecursoId = () =>{
  return{
    type: "ACTUALIZANDO_EL_RECURSO_ACTUAL",
    object: localStorage.getItem('currentRecursoId')
  }
}

const destroy = (id) =>{ 
  return dispatch => {
    return axios.get('https://recursos-backend.herokuapp.com/recursos/delete/'+id)
      .then(response => {
        dispatch ({ 
          type: 'ACTUALIZANDO_REDIRECT_SHOW',
          object: true
        })
        dispatch ({
          type: 'ACTUALIZANDO_MENSAJE_DE_RECURSO_ELIMINADO',
          object: true
        })
        setTimeout(() =>{ 
          dispatch ({
            type: 'ACTUALIZANDO_MENSAJE_DE_RECURSO_ELIMINADO',
            object: false
          })
        }, 1000);
      })
      .catch(err => {
        dispatch ({
          type: "ACTUALIZANDO_BROKEN",
          object: true
        })
        console.log(err);
      })
  } 
}

const submitCreate = (titulo, claves, descripcion, fuente, tipoDelRecurso, cobertura) =>{
  return dispatch => { 
    dispatch ({
      type: 'ACTUALIZANDO_WRONGENTRY2',
      object: false
    })
    dispatch ({
      type: 'ACTUALIZANDO_WRONGENTRY3',
      object: false
    })
    dispatch ({
      type: 'ACTUALIZANDO_WRONGENTRY4',
      object: false
    })
    if(/\S/.test(fuente) && (claves.split(",").every((i) => /^[a-záéíóúñ ]+$/i.test(i)) || /^\s+$/.test(claves) || claves === "") && (/^\d{4}-\d{4},[A-Za-záéíóúüñÁÉÍÓÚÑÜ ]+[A-Za-záéíóúüñÁÉÍÓÚÑÜ][(][A-Za-záéíóúüñÁÉÍÓÚÑÜ ]+[A-Za-záéíóúüñÁÉÍÓÚÑÜ ][)]$/.test(cobertura) || /^\s+$/.test(cobertura) || cobertura === "")){
      dispatch ({
        type: 'ACTUALIZANDO_WRONGENTRY1',
        object: false
      })

      axios.post('https://recursos-backend.herokuapp.com/recursos', {
        titulo: titulo,
        claves: claves,
        descripcion: descripcion,
        fuente: fuente,
        tipo_del_recurso: tipoDelRecurso,
        cobertura: cobertura
      })
        .then(response => {
          if(response.data.recurso != null){
            dispatch ({
              type: 'ACTUALIZANDO_REDIRECT_CREATE',
              object: true
            })
            dispatch ({
              type: 'ACTUALIZANDO_MENSAJE_DE_RECURSO_AGREGADO',
              object: true
            })
            setTimeout(() =>{ 
              dispatch ({
                type: 'ACTUALIZANDO_MENSAJE_DE_RECURSO_AGREGADO',
                object: false
              })
            }, 1000);
          } else{
            dispatch ({
              type: 'ACTUALIZANDO_WRONGENTRY2',
              object: true
            })
          }
        })
        .catch(err => {
          dispatch ({
            type: "ACTUALIZANDO_BROKEN",
            object: true
          })
          console.log(err);
        });
    } else{
      if(/\S/.test(fuente)){
        dispatch ({
          type: 'ACTUALIZANDO_WRONGENTRY1',
          object: false
        })
      } else{
        dispatch ({
          type: 'ACTUALIZANDO_WRONGENTRY1',
          object: true
        })
      }         
      if(claves.split(",").every((i) => /^[a-záéíóúñ ]+$/i.test(i)) || /^\s+$/.test(claves) || claves === ""){
        dispatch ({
          type: 'ACTUALIZANDO_WRONGENTRY3',
          object: false
        })
      } else{
        dispatch ({
          type: 'ACTUALIZANDO_WRONGENTRY3',
          object: true
        })
      }
      if(/^\d{4}-\d{4},[A-Za-záéíóúüñÁÉÍÓÚÑÜ ]+[A-Za-záéíóúüñÁÉÍÓÚÑÜ][(][A-Za-záéíóúüñÁÉÍÓÚÑÜ ]+[A-Za-záéíóúüñÁÉÍÓÚÑÜ ][)]$/.test(cobertura) || /^\s+$/.test(cobertura) || cobertura === ""){
        dispatch ({
          type: 'ACTUALIZANDO_WRONGENTRY4',
          object: false
        })
      } else{
        dispatch ({
          type: 'ACTUALIZANDO_WRONGENTRY4',
          object: true
        })
      }
    }
  }
}

const change = (event) =>{
  if([event.target.name] == 'titulo'){
    return{
      type: 'ACTUALIZANDO_TITULO',
      object: event.target.value
    }
  } else if([event.target.name] == 'claves'){
    return{
      type: 'ACTUALIZANDO_CLAVES',
      object: event.target.value
    }
  } else if([event.target.name] == 'descripcion'){
    return{
      type: 'ACTUALIZANDO_DESCRIPCION',
      object: event.target.value
    }
  } else if([event.target.name] == 'fuente'){
    return{
      type: 'ACTUALIZANDO_FUENTE',
      object: event.target.value
    }
  } else if([event.target.name] == 'tipo_del_recurso'){
    return{
      type: 'ACTUALIZANDO_TIPO_DEL_RECURSO',
      object: event.target.value
    }
  } else if([event.target.name] == 'cobertura'){
    return{
      type: 'ACTUALIZANDO_COBERTURA',
      object: event.target.value
    }
  }
}

const setData = (id) =>{
  return dispatch => {
    return axios.get('https://recursos-backend.herokuapp.com/recursos/'+id)
      .then(response => {
        dispatch ({
          type: 'ACTUALIZANDO_TITULO',
          object: response.data.titulo
        })
        dispatch ({
          type: 'ACTUALIZANDO_CLAVES',
          object: response.data.claves
        })
        dispatch ({
          type: 'ACTUALIZANDO_DESCRIPCION',
          object: response.data.descripcion
        })
        dispatch ({
          type: 'ACTUALIZANDO_FUENTE',
          object: response.data.fuente
        })
        dispatch ({
          type: 'ACTUALIZANDO_TIPO_DEL_RECURSO',
          object: response.data.tipo_del_recurso
        })
        dispatch ({
          type: 'ACTUALIZANDO_COBERTURA',
          object: response.data.cobertura
        })
      })
      .catch(err => {
        dispatch ({
          type: "ACTUALIZANDO_BROKEN",
          object: true
        })
        console.log(err);
      })
  }
}

const submitEdit = (currentRecursoId, editingFromShow, titulo, claves, descripcion, fuente, tipoDelRecurso, cobertura) =>{
  return dispatch => { 
    dispatch ({
      type: 'ACTUALIZANDO_WRONGENTRY2',
      object: false
    })
    dispatch ({
      type: 'ACTUALIZANDO_WRONGENTRY3',
      object: false
    })
    dispatch ({
      type: 'ACTUALIZANDO_WRONGENTRY4',
      object: false
    })
    if(/\S/.test(fuente) && (claves.split(",").every((i) => /^[a-záéíóúñ ]+$/i.test(i)) || /^\s+$/.test(claves) || claves === "") && (/^\d{4}-\d{4},[A-Za-záéíóúüñÁÉÍÓÚÑÜ ]+[A-Za-záéíóúüñÁÉÍÓÚÑÜ][(][A-Za-záéíóúüñÁÉÍÓÚÑÜ ]+[A-Za-záéíóúüñÁÉÍÓÚÑÜ ][)]$/.test(cobertura) || /^\s+$/.test(cobertura) || cobertura === "")){
      dispatch ({
        type: 'ACTUALIZANDO_WRONGENTRY1',
        object: false
      })

      axios.post('https://recursos-backend.herokuapp.com/recursos/'+currentRecursoId, {
        titulo: titulo,
        claves: claves,
        descripcion: descripcion,
        fuente: fuente,
        tipo_del_recurso: tipoDelRecurso,
        cobertura: cobertura
      })
        .then(response => {
          if(response.data.recurso != null){
            if(editingFromShow){
              dispatch ({
                type: 'ACTUALIZANDO_REDIRECT_EDIT',
                object: '/show/'+currentRecursoId
              })
            } else{
              dispatch ({
                type: 'ACTUALIZANDO_REDIRECT_EDIT',
                object: '/'
              })
            }
            dispatch ({
              type: 'ACTUALIZANDO_MENSAJE_DE_RECURSO_EDITADO',
              object: true
            })
            setTimeout(() =>{ 
              dispatch ({
                type: 'ACTUALIZANDO_MENSAJE_DE_RECURSO_EDITADO',
                object: false
              })
            }, 1000);
          } else{
            dispatch ({
              type: 'ACTUALIZANDO_WRONGENTRY2',
              object: true
            })
          }
        })
        .catch(err => {
          dispatch ({
            type: "ACTUALIZANDO_BROKEN",
            object: true
          })
          console.log(err);
        });
    } else{
      if(/\S/.test(fuente)){
        dispatch ({
          type: 'ACTUALIZANDO_WRONGENTRY1',
          object: false
        })
      } else{
        dispatch ({
          type: 'ACTUALIZANDO_WRONGENTRY1',
          object: true
        })
      }
      if(claves.split(",").every((i) => /^[a-záéíóúñ ]+$/i.test(i)) || /^\s+$/.test(claves) || claves === ""){
        dispatch ({
          type: 'ACTUALIZANDO_WRONGENTRY3',
          object: false
        })
      } else{
        dispatch ({
          type: 'ACTUALIZANDO_WRONGENTRY3',
          object: true
        })
      }
      if(/^\d{4}-\d{4},[A-Za-záéíóúüñÁÉÍÓÚÑÜ ]+[A-Za-záéíóúüñÁÉÍÓÚÑÜ][(][A-Za-záéíóúüñÁÉÍÓÚÑÜ ]+[A-Za-záéíóúüñÁÉÍÓÚÑÜ ][)]$/.test(cobertura) || /^\s+$/.test(cobertura) || cobertura === ""){
        dispatch ({
          type: 'ACTUALIZANDO_WRONGENTRY4',
          object: false
        })
      } else{
        dispatch ({
          type: 'ACTUALIZANDO_WRONGENTRY4',
          object: true
        })
      }
    }
  }
}

const updateEdit = () =>{
  return dispatch => {
    dispatch ({
      type: 'ACTUALIZANDO_WRONGENTRY2',
      object: false
    })
    dispatch ({
      type: 'ACTUALIZANDO_WRONGENTRY1',
      object: false
    })
    dispatch ({
      type: 'ACTUALIZANDO_WRONGENTRY3',
      object: false
    })
    dispatch ({
      type: 'ACTUALIZANDO_WRONGENTRY4',
      object: false
    })
    dispatch ({
      type: 'ACTUALIZANDO_EDITING_FROM_SHOW',
      object: false
    })
    dispatch ({
      type: 'ACTUALIZANDO_REDIRECT_EDIT',
      object: null
    })
  }
}

const editingFromShow = () =>{
  return{
    type: 'ACTUALIZANDO_EDITING_FROM_SHOW',
    object: true
  }
}


export {updateBrokenTrue, updateBrokenFalse, getRecursos, updateEditCreate, setCurrentRecursoId, destroy, submitCreate, change, setData, submitEdit, updateEdit, editingFromShow};