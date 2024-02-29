export function createAccountReducer(state: any, action : any) {
  switch (action.type) {
    case 'SET_SEXO':
      return {
        ...state,
        sexo: action.value,
      };
    default:
      return state;
  }
}
