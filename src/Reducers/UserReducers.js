export const initialState =  {
  usuario: '',
  favoritos: [],
  encontros: []
};

export const  UserReducer = (state, action) => {
  switch(action.type){
      case 'SetAvatar':
        return{...state, avatar: action.payload.avatar };
        
      default:
         return state;


  }
}