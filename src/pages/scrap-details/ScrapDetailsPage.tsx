import { RouteComponentProps } from 'react-router';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {createScrap, removeScrap, selectScrapMap, updateScrap} from '../../features/scrapList/scrapListSlice';
import ScrapDetails from '../../features/scrapDetails/ScrapDetails';
import {readHeaderOptions, updateHeaderOptions} from '../../features/revision-header/headerOptionsSlice';

interface MatchParams {
  id: string
}

interface ScrapDetailsProps extends RouteComponentProps<MatchParams> {}

export default function ScrapDetailsPage (props: ScrapDetailsProps) {
  const scrapMap = useAppSelector(selectScrapMap);
  const headerOptions = useAppSelector(readHeaderOptions);
  const dispatch = useAppDispatch();

  return (
      <ScrapDetails
          scrapId={props.match.params.id}
          scrapMap={scrapMap}
          onScrapCreate={(scrap) => dispatch(createScrap(scrap.toJSON()))}
          onScrapUpdate={(scrap) => dispatch(updateScrap(scrap.toJSON()))}
          onScrapDelete={(scrapId) => dispatch(removeScrap(scrapId))}
          headerOptions={headerOptions}
          onUpdateHeaderOptions={(headerOptions) => dispatch(updateHeaderOptions(headerOptions))}
      />
  )
}
