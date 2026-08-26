import { ActionType } from '../action-types';
import { CellTypes } from '../cell';


interface InsertCellBeforeAction {
  type: ActionType.INSERT_CELL_BEFORE;
  payload: {
    id: string;
    type: CellTypes;
  }
}
interface UpdateCellAction {
  type: ActionType.UPDATE_CELL;
  payload: {
    id: string;
    content: string;
  }
}

interface DeleteCellAction {
  type: ActionType.DELETE_CELL;
  payload: string;
}

interface MoveCellAction {
  type: ActionType.MOVE_CELL;
  payload: {
    id: string;
    direction: 'up' | 'down';
  }

}

export type Action =
  | InsertCellBeforeAction
  | UpdateCellAction
  | MoveCellAction
  | DeleteCellAction