import { RouteComponentProps } from 'react-router';


interface MatchParams {
  id: string
}

interface ScrapDetailsProps extends RouteComponentProps<MatchParams> {}

export default function ScrapDetailsPage (props: ScrapDetailsProps) {

  return (
      <div>This will be details for scrap {props.match.params.id}</div>
  )
}
