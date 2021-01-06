<script>
import { readyState } from '../../websocktstore.js';

function getConnectionText(readyState)
{
  switch(readyState)
  {
    case 0:
        return "VERBINDEN";
    case 1:
      return "ONLINE";
    case 2:
      return "Verbindungsabbau";
    case 3:
       return "Gags";
    case 99:
       return "Browserfehler";
    default:
        return "Websocket " + readyState;
  }
}

</script>

<style>
#websocketbar
{    
    text-align: center;
    color:white;
    padding:5px;
}
#websockettext
{
  background:green;
  border-radius: 5px;
  padding:3px;
}
</style>

<div id="websocketbar">
<span id="websockettext" >{getConnectionText($readyState)}</span>
</div>