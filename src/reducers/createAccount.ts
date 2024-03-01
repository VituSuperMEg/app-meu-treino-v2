export function createAccountReducer(state: any, action : any) {
  switch (action.type) {
    case 'SET_SEXO':
      return {
        ...state,
        sexo: action.value,
      };
    case 'SET_AGE':
      return {
      ...state,
        age: action.value,
      };
    case 'SET_WEIGHT':
      return {
        ...state,
        weight: action.value,
      }
    case 'SET_FOCUS':
      return {
      ...state,
        focus: action.value,
      }
    default:
      return state;
  }
}
