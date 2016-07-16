
const analysis = (state = [], action) => {
  switch ( action.type ) {
    case 'FETCH_ANALYSIS':
      return action.payload.data;

    default:
      return state;
  }
};

export default analysis;