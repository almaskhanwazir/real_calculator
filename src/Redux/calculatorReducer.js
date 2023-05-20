// calculatorReducer.js

const initialState = {
  calculatorTheme: {
    backgroundColor: 'white',
    textColor: 'black'
  }
};

const calculatorReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_THEME':
      return {
        ...state,
        calculatorTheme: action.payload
      };
    default:
      return state;
  }
};

export default calculatorReducer;