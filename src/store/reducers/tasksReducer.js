export const initialState = {
    isAddModalOpen: false,
    isEditModalOpen: false,
    taskInput: '',
    editId: '',
    editTitle: '',
  };
  
  export const tasksReducer = (state, action) => {
    switch (action.type) {
      case 'OPEN_ADD_MODAL':
        return { ...state, isAddModalOpen: true, taskInput: '' };
      case 'CLOSE_ADD_MODAL':
        return { ...state, isAddModalOpen: false, taskInput: '' };
      case 'OPEN_EDIT_MODAL':
        return { ...state, isEditModalOpen: true, editId: action.payload.id, editTitle: action.payload.title };
      case 'CLOSE_EDIT_MODAL':
        return { ...state, isEditModalOpen: false, editId: '', editTitle: '' };
      case 'SET_TASK_INPUT':
        return { ...state, taskInput: action.payload };
      case 'SET_EDIT_TITLE':
        return { ...state, editTitle: action.payload };
      default:
        return state;
    }
  };
  