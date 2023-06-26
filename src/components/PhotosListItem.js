import { GoTrashcan } from "react-icons/go";
import { useRemovePhotoMutation } from "../store";
import Button from "./Button";

const PhotosListItem = ({ photo }) => {
  const [removePhoto, results] = useRemovePhotoMutation();
  const handleClick = () => {
    removePhoto(photo);
  };

  return (
    <div className="relative cursor-pointer m-2" onClick={handleClick}>
      <img className="h-20 w-20" src={photo.url} alt="random pic" />
      <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:bg-gray-200 hover:opacity-80">
        <Button loading={results.isLoading}>
          <GoTrashcan />
        </Button>
      </div>
    </div>
  );
};

export default PhotosListItem;
