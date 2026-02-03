/** @format
 *
 * Short instructions
 * ------------------
 *
 * COPY YOUR CODE FROM THE PREVIOUS EXERCISE HERE.
 */
export const ListPlayer = ({ player, onClick }) => {

    // Define a Click Handler
    const handleClick = (e) => {
      e.preventDefault();
      onClick(player.id);
    }
    // Update the Return Statement
  
    // Set the Default Export
    return (
    <li id={`player-${player.id}`}>
      <a href="" onClick={handleClick}>
        {player.name}
      </a>
    </li>
  );
  };
  export default ListPlayer;