import {StoryMap} from '../storyList/storyListSlice';
import {ScrapMap} from '../scrapList/scrapListSlice';
import {Component} from 'react';
import {Scrap} from '../../protos_v2';

interface ScrapDetailsProps {
  scrapId: string;
  storyMap: StoryMap;
  scrapMap: ScrapMap;
  onScrapCreate: (scrap: Scrap) => void;
  onScrapUpdate: (scrap: Scrap) => void;
}

export default class ScrapDetails extends Component<ScrapDetailsProps> {

  render() {
    let thisScrap = this.props.scrapMap[this.props.scrapId];

    if (!thisScrap) {
      return (
          <div>Whoops, could not find scrap</div>
      );
    }

    let parentStories = thisScrap.stories.map((storyId) => {
      return this.props.storyMap[storyId];
    }).filter(Boolean);

    return (
        <div style={{margin: '24px'}}>
          <p>{thisScrap.synopsis}</p>
          <p>{thisScrap.prose}</p>
          <div>
            {parentStories.map((parentStory) =>
                (<p>{parentStory.name}</p>)
            )}
          </div>
        </div>
    );
  }

}
