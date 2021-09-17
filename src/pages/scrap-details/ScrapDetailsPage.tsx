import { RouteComponentProps } from 'react-router';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectStoryMap} from '../../features/storyList/storyListSlice';
import {createScrap, selectScrapMap, updateScrap} from '../../features/scrapList/scrapListSlice';
import ScrapDetails from '../../features/scrapDetails/ScrapDetails';

interface MatchParams {
  id: string
}

interface ScrapDetailsProps extends RouteComponentProps<MatchParams> {}

export default function ScrapDetailsPage (props: ScrapDetailsProps) {
  const storyMap = useAppSelector(selectStoryMap);
  const scrapMap = useAppSelector(selectScrapMap);
  const dispatch = useAppDispatch();

  return (
      <ScrapDetails
          scrapId={props.match.params.id}
          scrapMap={scrapMap}
          storyMap={storyMap}
          onScrapCreate={(scrap) => dispatch(createScrap(scrap.toJSON()))}
          onScrapUpdate={(scrap) => dispatch(updateScrap(scrap.toJSON()))}
      />
  )
}
