import ViewOption from './ViewOption';

export default class TimelineBlock {
  constructor(
    public rowLabel: string,
    public blockLabel: string,
    public startSec: number,
    public endSec: number,
    public viewOption: ViewOption,
    public depth: number,
    public appendDepthToLabel: boolean
  ) {}
}
