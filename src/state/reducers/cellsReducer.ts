import { ActionType } from '../action-types';
import { Action } from '../actions';
import { Cell } from '../cell';
import { produce } from 'immer';


interface CellState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell
  }
};

const initialState: CellState = {
  loading: false,
  error: null,
  order: [],
  data: {}
};


const reducer = produce((
  state: CellState = initialState,
  action: Action) => {

  switch (action.type) {
    case ActionType.INSERT_CELL_BEFORE: {
      const { id } = action.payload;
      const cell: Cell = {
        type: action.payload.type,
        id: randomId(),
        content: '',

      };

      // create cell
      state.data[cell.id] = cell;

      // find index
      const index = state.order.findIndex(cellId => cellId === id);

      // set order of cell
      if (index < 0) {
        state.order.push(cell.id);
      } else {
        state.order.splice(index, 0, cell.id);
      }

      return state;
    }

    case ActionType.UPDATE_CELL: {
      const { id, content } = action.payload;
      state.data[id].content = content;
      return state;
    }

    case ActionType.DELETE_CELL: {
      delete state.data[action.payload];
      state.order = state.order.filter((id) => id !== action.payload)
      return state;
    }

    case ActionType.MOVE_CELL: {
      const { id, direction } = action.payload;
      const index = state.order.findIndex((cellId) => cellId === id);
      const targetIndex = direction === 'up' ? index - 1 : index + 1;

      //validate prevent out of bound
      if (targetIndex < 0 || targetIndex >= state.order.length) {
        return state;
      }

      state.order[index] = state.order[targetIndex];
      state.order[targetIndex] = id;

      return state;
    }

    default:
      return state;
  }


}, initialState);

const randomId = () => {
  return Math.random().toString(36).substring(2, 5);
};

export default reducer;

