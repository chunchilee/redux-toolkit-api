
import { useAddAlbumMutation, useFetchAlbumsQuery } from "../store";
import AlbumsListItem from "./AlbumsListItem";
import Button from "./Button";
import Skeleton from "./Skeleton";

// isLoading 只會在第一次發出請求時，再加載狀態為true，得到response or error後，就會變成false，且永遠不會再變成true。
// isFetching 不論發出幾次請求，都會有true -> false -> true -> false ...的過程。
// 這裡使用isFetching是因為會有多次點擊Button新增的請求，在pending時(isFetching為true)，同時執行pause() 延遲一秒，而後變成fulfilled(isFetching為false)。
// 如果是isLoading會出現點擊Button新增請求時，Skeleton出現，空等一秒的畫面階段。
const AlbumsList = ({ user }) => {
  // Fetch 取代useEffect，會隨著state改變，而自動render
  // Query帶入參數，是因為要向Server發出請求，來得到Store中指定的user.id，透過map function來迭代。{ }
  const { data, error, isFetching } = useFetchAlbumsQuery(user);
  // Mutation沒帶入參數，是因為要在Server透過addAlbum(user)，來指定user.id。[ ]
  const [addAlbum, results] = useAddAlbumMutation();

  const handleClick = () => {
    // 發送addAlbum(user)請求後，後端有新增data，但畫面沒有呈現
    // 需要透過Tag來自動執行重新獲取data
    addAlbum(user); 
  };

  let content;
  if (isFetching) {
    content = <Skeleton times={3} className="h-10 w-full" />;
  } else if (error) {
    content = <div>Error loading albums</div>;
  } else {
    content = data.map((album) => {
    return <AlbumsListItem album={album} key={album.id}/>
    });
  }

  return (
    <div>
      <div className="m-2 flex flex-row items-center justify-between">
        <h3 className="text-lg font-bold">AlbumsList of {user.name}</h3>
        <Button onClick={handleClick} loading={results.isLoading}>
          + Add album
        </Button>
      </div>
      <div>{content}</div>
    </div>
  );
};

export default AlbumsList;
