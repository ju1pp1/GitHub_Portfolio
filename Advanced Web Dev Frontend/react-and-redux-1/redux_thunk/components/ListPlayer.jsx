/** @format
 * Copy paste your code from the ListPlayer.jsx file here from the previous exercise
 * BEWARE: Only name and id are passed to this component as props. All the other data is fetched and updated in the redux store.
 *
 * Here are the thunks that you can use to update the redux store:
 * - getSelectedPlayer, found in src\redux\actionCreators\thunks\ListPlayer.jsx
 */
/*
export const ListPlayer = ({ name, id }) => {
	return 'TODO: ListPlayer';
};
*/
export const ListPlayer = ({ player, onClick }) => {
    return (
    <li id={`player-${player.id}`}>
      <a href="#" onClick={() => onClick(player.id)}>
        {player.name}
      </a>
    </li>
  );
  };
  export default ListPlayer;