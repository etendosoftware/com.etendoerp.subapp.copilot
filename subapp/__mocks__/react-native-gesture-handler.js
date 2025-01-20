export const GestureHandlerRootView = ({ children }) => children;
export const PanGestureHandler = ({ children }) => children;
export const GestureDetector = ({ children }) => children;
export const GestureHandler = ({ children }) => children;

export const gestureHandlerRootHOC = jest.fn();
export const Directions = {};
export const State = {
  BEGAN: 'BEGAN',
  FAILED: 'FAILED',
  ACTIVE: 'ACTIVE',
  END: 'END',
};

export default {
  swipeable: jest.fn(),
  DrawerLayout: jest.fn(),
  State,
  PanGestureHandler,
  gestureHandlerRootHOC,
  Directions,
};
