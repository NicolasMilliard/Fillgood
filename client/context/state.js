const actions = {
  INIT: 'init',
};

const initialState = {
  simpleStorage: null,
};

const reducer = (state, action) => {
  const { type, data } = action;

  switch (type) {
    case actions.INIT:
      return { ...state, ...data };
    default:
      // Throw a new Error('Undefined reducer action type')
      return { ...state };
  }
};

export { actions, initialState, reducer };
