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
