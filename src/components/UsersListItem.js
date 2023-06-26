import { GoX } from "react-icons/go";
import { useThunk } from "../hooks/useThunk";
import { removeUser } from "../store/thunks/removeUser";
import AlbumsList from "./AlbumsList";
import Button from "./Button";
import ExpandablePanel from "./ExpandablePanel";
const UsersListItem = ({ user }) => {
  const [doRemoveUser, isLoading, error] = useThunk(removeUser);

  const handleClick = () => {
    // 發送dispatch(removeUser(user))
    doRemoveUser(user);
  };

  // Fragment 不會新增DOM元素
  const header = (
    <>
      <Button className="mr-9" loading={isLoading} onClick={handleClick}>
        <GoX />
      </Button>
      {error && <div>Error deleting user.</div>}
      {user.name}
    </>
  );

  return (
    <ExpandablePanel header={header}>
      <AlbumsList user={user} />
    </ExpandablePanel>
  );
};

export default UsersListItem;
