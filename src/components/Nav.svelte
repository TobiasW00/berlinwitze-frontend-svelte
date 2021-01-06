<script>
  export let segment;
  import { user } from '../userstore.js'
  import { currentcolor } from '../colorstore.js';
	import Websocket from '../components/websocket/websocket.svelte';
import {HTTP_URL} from '../config.js';
import {onMount} from 'svelte';
import {addAction} from '../api/dbconnection.js';

onMount(async () =>
{
  addAction("user.mydata",null,function(data)
  {
    if(data.state ==="OK")
    {
    user.set(data.content);
    }
  });

});

function loaddefault(e)
{
    e.target.src = '/anonym.png'
}


$: profileimage = ($user === undefined) ? '/anonym.png' : `${HTTP_URL}/berlinwitzepictures/tumb_` + $user.id + ".jpg";

$: username = ($user === undefined) ?  '' : $user.name;



let navlist;
$: if(navlist)
{
  let node;
  switch(segment)
  {
     case 'videos':
      node = navlist.children[1];
    break;
    case 'witz':
      node = navlist.children[2];
      break;
    break;
        case 'member':
      node = navlist.children[3];
      break;
      case 'nachrichten':
      node = navlist.children[4];
    break;
      case 'gallery':
      node = navlist.children[5];
      break;

    
    default:
       node = navlist.children[0];
  }  
 for(let i=0; i < navlist.children.length;i++) 
 {
    navlist.children[i].removeAttribute("style");
 }
node.style.background = $currentcolor;
node.classList.add("selected");
}
</script>

<style>
.selected
{
color:white;
display: block;
}
nav
{
  height: 100%;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  overflow-x: hidden;
  transition: 0.5s;
  width:220px;
  overflow:hidden;
}
ul{
  list-style: none;
  padding-left:1px;
}
ul img
{
     vertical-align: middle; 
}
ul .selected a
{
  color:black;
}
ul a
{
  color:black;
  text-decoration: none;
  font-size: 1.4rem;
}
ul li img
{
  margin-left: 0;
  border-radius: 50%;
}
ul li:hover
{
background:lightgray;
}
ul li
{
  margin-bottom: 0.3rem;
  padding:5px;
  border-radius:  30px;
}
#profile
{
  text-align: center;
}
#profile a
{
   color: black;
   text-decoration: none;
  font-size: 1.6rem;
}
#profile img
{
  vertical-align: middle;
  border-radius: 49%;
}
ul a
{
  display: block;
}

@media (max-width: 1000px) {
  nav {
    width:60px;  
}
nav ul span
{
  display: none;
}
#profile span {
display: none;
}
}
</style>

<nav >
  <div id="profile" style="margin-top:10px; margin-bottom:10px">
        <a href="myprofile">
          <img src={profileimage}  on:error={loaddefault}  style="border:1px solid white;"  alt="Dein Profil" height="48" width="48">
          <span>{username}</span>
        </a>
  </div>
      <Websocket />
    <ul 	bind:this={navlist}>
      <li class="selected">
        <a rel=prefetch  href='/'>
        <img src="/navi/start.webp" width="48" height="48" style="border-radius:50%;" alt="Startseite" />
        <span>Start</span></a>
      </li>
      <li class="selected">
        <a rel=prefetch  href='/videos'>
        <img src="/navi/youtube.webp" width="48" height="48" style="background:white;border-radius:50%;" alt="YouTube" />
        <span>Videos</span></a>
      </li>
      <li>
        <a rel=prefetch   href='witz'>
           <img src="/navi/witz.webp" alt="witz" />
          <span>Witze</span></a>
      </li>
      <li>
        <a  rel=prefetch href='member'>        
         <img src="/navi/mitglieder.webp" width="48" height="48" alt="Member" />
        <span>Mitglieder</span></a>
        </li>
       <li >
        <a  rel=prefetch  href='nachrichten'>
        <img src="/navi/nachrichten.webp" width="48" height="48" alt="Nachrichten" />
        <span>Nachrichten</span></a>
        </li>
        <li >
          <a  rel=prefetch  href='gallery'>
          <img src="/navi/bilder.webp" width="48" height="48" alt="Bilder" />
          <span>Bilder</span></a>
          </li>
    </ul>
</nav>
