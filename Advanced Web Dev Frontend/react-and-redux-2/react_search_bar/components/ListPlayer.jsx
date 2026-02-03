/** @format

  Short instructions
  -----------------
  This component is used to display a single player from the list of players. It receives a player and onClick as props.
 
  NOTE: For the ids, classes and html elements, refer to the tests in the __tests__ folder to pass the unit tests, and to the cypress/e2e folder for the end-to-end tests.
 

  A proposed approach (feel free to go your own way)
  ---------------------------------------------------
  Step 1: Add Props to the Component
    Update the component to accept two props:
      player: An object representing the player's data 
      onClick: A function that will be called when the player is clicked.

  Step 2: Define a Click Handler
    Create a handleClick function inside the component:
      Prevent the default behavior of the anchor tag using e.preventDefault().
      Call the onClick function, passing the id of the player as an argument.

  Step 3: Update the Return Statement
    Modify the component to return a <li> element containing:
      An id attribute formatted as player-{player.id}.
      An anchor (<a>) tag with an empty href attribute ("").
      The onClick event of the anchor tag should call the handleClick function.
      Display the player's name as the anchor tag's content.

  Step 4: Set the Default Export
    Ensure the component is exported as the default export for consistency and reusability. This allows the component to be imported and used in other parts of the application.
 */

    //Add Props to the Component
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