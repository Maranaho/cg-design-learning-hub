import DetailContent from './DetailContent'
import RelatedVideos from './RelatedVideos'
import Search from './Search'
import { useHubState } from '../hub-context'

const Detail = () => {
  const { state: {showSearch} } = useHubState()

  return (
    <div className="Detail center">
      {showSearch&&<Search />}
      <DetailContent/>
      <RelatedVideos/>
    </div>
  )
}
export default Detail
