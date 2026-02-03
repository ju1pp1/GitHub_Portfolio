/** @format
 *
 * @description
 * Student instructions:
 *
 * Copy contents for this file from the players_fetch exercise of the react week. There are no changes to this file otherwise
 *
 *
 *
 */

/*
export const ListPlayer = ({ name, id, onClick }) => {
  return "TODO: ListPlayer";
};*/

    //Add Props to the Component
    export const ListPlayer = ({ player, onClick }) => {
      if(!player || !player.id) {
        return null;
      }
      // Define a Click Handler
      const handleClick = (e) => {
        e.preventDefault();
        onClick(player.id);
      }
      // Update the Return Statement
    
      // Set the Default Export
      return (
      <li id={`player-${player.id}`}>
        <a href="#" onClick={handleClick}>
          {player.name}
        </a>
      </li>
    );
    };
    export default ListPlayer;
