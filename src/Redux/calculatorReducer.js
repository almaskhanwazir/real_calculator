// counterReducer.js

const initialState = { calculatorId: null };

function calculatorReducer(state = initialState, action) {
  switch (action.type) {
    case 'SETCALCULATORID':
      return { calculatorId: state.calculatorId };
    default:
      return state;
  }
}

export default calculatorReducer;