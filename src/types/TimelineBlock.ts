import ViewOption from './ViewOption';
import { ActionOption } from 'src/actions/action-option';


export default class TimelineBlock {
  

  constructor(
    public rowLabel: string,
    public blockLabel: string,
    public startSec: number,
    public endSec: number,
    public viewOption?: ViewOption,
    public depth?: number,
    public appendDepthToLabel?: boolean,
    public actionOption?: ActionOption
  ) {}

  static buildNew(rowLabel: string, blockLabel: string, startSec: number, endSec: number, actionOption: ActionOption, depth: number, appendDepthToLabel: boolean): TimelineBlock {
    return new TimelineBlock(rowLabel, blockLabel, startSec, endSec, null, depth, appendDepthToLabel, actionOption);
  }
}
