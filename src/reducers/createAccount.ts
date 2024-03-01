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
    case 'SET_HEIGHT':
      return {
        ...state,
         height: action.value,
      }
    case 'SET_LEVEL':
      return {
      ...state,
         level: action.value,
      }
    default:
      return state;
  }
}
