<script>
import { user } from '../../userstore.js'
import { tags } from '../../searchfilterstore.js';
import {addAction} from '../../api/dbconnection';
import {HTTP_URL} from '../../config.js';
import Cropper from "svelte-easy-crop";
import Tagbox from '../../components/tagsbox.svelte';
import Texteditor from '../../components/texteditor.svelte';
import { onMount } from "svelte";
import { GoogleMap, GooglePlacesAutocomplete } from '@beyonk/svelte-googlemaps';
import {onDestroy} from 'svelte';
import Button from '../../components/button.svelte';
import  witze  from '../../witzestore.js';
import {getShortTitle} from '../../help/witz.js';
import swal from 'sweetalert';
import Gallery from '../../components/gallery/editgallery.svelte';
import Gallerylist from '../../components/gallery/gallerylist.svelte';
import { goto,stores } from '@sapper/app';
$: genrestring = "";
let lastsave =  new Date();

$: console.log($user);

let image = "";
  let crop = { x: 0, y: 0 }
  let zoom = 1

  let format;

onMount(async () =>
{
  console.log($user);
  if(!$user)
  {
    goto("/");
  }else
  {
    image = HTTP_URL +"/berlinwitzepictures/orginal_" + $user.id + ".jpg?" + (new Date()).getSeconds();
    genrestring =  String($user.genre);
  }
});




let timeout;
function checkSave()
{

  let v1 = new Date(lastsave.getTime() + 5000);
  let v2 = new Date();
   if(v1 < v2)
  {
    saveprofile();
    lastsave = new Date();
    clearTimeout(timeout);
    timeout = undefined;
  }else
  {
    if(!timeout)
    {
      timeout = setTimeout(() => {
        checkSave();
      }, 5000);
    }
  }  
}



user.subscribe(value => {
checkSave();
}); 

onDestroy(async ()=>
{
 saveprofile();
});


let dropzone
function initializeDropzone()
{

  if($user)
  {
  var myDropzone = new Dropzone(dropzone, { url: `${HTTP_URL}/fileupload/ `, clickable:true, headers:{"Authorization":localStorage.getItem("token")},   acceptedFiles:"image/jpeg,image/png",paramName: "file",uploadMultiple:false, createImageThumbnails:false,success: (file, response)=>{
          file.previewElement.innerHTML = "";
    image = HTTP_URL +"/berlinwitzepictures/orginal_" + $user.id + ".jpg?" + (new Date()).getSeconds();
    }});  
  }
	}


function changelocation(data)
{
const lat = data.detail.place.geometry.location.lat();
const lng = data.detail.place.geometry.location.lng();
$user.lat =  lat;
$user.lng =  lng;
$user.city = data.detail.place.formatted_address
}





function saveprofile()
{

  if(!$user)
  return;
                         var jsondata = $user; 
                          addAction("user.set.edit",jsondata,function(data)
                          {
                            if(data.state ==="OK")
                            {
                               
                             // self.props.history.push('/member/' + data.content.id);   
                            }else
                            {
                          swal("Oops...", "Fehler beim Speichern des Profils.", "error");     
                            }
                          });
}



function updateTags(tagid)
{
    if($user.tags.includes(tagid))
    {
      $user.tags =  $user.tags.replace(tagid +";","");
    }else
    {
      $user.tags =  $user.tags + (tagid +";");
    }
}


  function cutimage()
  {

  var jsondata = {};
  jsondata.x = parseInt(format.percent.x);
  jsondata.y = parseInt(format.percent.y);
  jsondata.h = parseInt(format.percent.height);
  jsondata.w = parseInt(format.percent.width);
  addAction("image.crop",jsondata,function(data)
       {
           if(data.state==='OK')
           {
                         image = HTTP_URL +"/berlinwitzepictures/orginal_" + $user.id + ".jpg?" + (new Date()).getSeconds();
                         zoom = 1;
           }else
           {
            swal("Oops...", "Fehler beim Zuschneiden.", "error");   
             zoom = 1;
           }
       });      
      
  }


function deleteProfilFinal()
{
// user.remove
addAction("user.remove","jsondata",function(data)
       {
         console.log(data);
           if(data.state==='OK')
           {
            localStorage.clear();
           window.location.href = "/";
           }else
           {
            swal("Oops...", "Fehler beim Löschen des Profils. Bitte an den Support wenden", "error");   
           }
       });    
}


function DeleteProfile()
{
  swal({
            title: "Profil löschen?",
            text: "Möchtest du wirklich dein Profil und all deine Texte (witz, Anleitungen ..) löschen? Er kann nichts wiederhergestellt werden.",
            icon: "warning",
            buttons: ["Zurück zum Profil", "Löschen"],
            })
          .then((willDelete) => {
            if (willDelete) {
              deleteProfilFinal();
             } else {
      
            }
          });

}



function Ausloggen()
{
  localStorage.clear();
 window.location.href= "/";
}



</script>
<style>
.witzbox a
{
  text-decoration: none;
  display: block;
  font-size: 1.2rem;
}
.witzbox a:hover
{
	background: var(--main-witze-color);
	color:white;
	border-radius: 5px;
}
.manualbox a
{
  text-decoration: none;
  display: block;
  font-size: 1.2rem;
}
.manualbox a:hover
{
	background: var(--main-youtube-color);
	color:white;
	border-radius: 5px;
}

</style>

<svelte:head>
  {#if $user}
<title>Mein Profil {$user.name}</title>
<script src="/dropzone/dropzone.min.js" on:load={initializeDropzone}></script>
<link rel="stylesheet" href="/dropzone/dropzone.min.css">
{/if}
</svelte:head>



{#if (process.browser)}
 
{#if $user}

<div id="edituserprofilepage">
       <table className="tblEditwitz">
       <tbody>
       <tr><td className="tblEditProfileProps" >Deckname</td><td><input className="witzTitle" type="text"  bind:value={$user.name} /></td></tr>
       <tr><td>Jahrgang</td><td><input className="witzTitle" type="number"  bind:value={$user.agegroup} /> </td></tr>
       <tr><td>E-Mail</td><td>
     {$user.email} 
       </td></tr>
       <tr><td>Geschlecht</td><td>
       <select name="gender" bind:value={$user.genre} size="1">
           <option value={1}>Mann</option>
           <option value={2}>Frau</option>
           </select>
         </td></tr>
         <tr>
         <td colspan="2">
         <div>
       <div >
         <div id="bildzone" bind:this={dropzone}  style="background:pink; cursor: pointer; font-size:1.2rem; padding-top:30px; height: 100px; text-align:center; margin:5px; border:5px dotted black;">
         Bild hierher ziehen oder  Klick in diese Box.
         </div>     
      </div>
         <div  style="position:relative; height:600px; width:450px">     

<Cropper zoomSpeed={0.2} aspect={450/600} {image} bind:crop bind:zoom on:cropcomplete={e => {format = e.detail}}/>      


         </div> 
         <button on:click={cutimage} style="width:100%;height:50px;max-width:450px;">Zuschneiden</button>       

  

        
         </div>
         </td>
         </tr>
      <tr>
        <td>Standort</td><td>
        <div>
    
      <GooglePlacesAutocomplete placeholder={$user.city}  value={$user.city} on:placeChanged={changelocation} apiKey="AIzaSyASSgTEVFjNXRP3ZFQp4qHRZBshME12RHI"/>
     
     </div>
       </td>
        </tr>
        <!--
         <tr>
           <td>Wer darf mir eine Nachricht senden?</td><td>
           <input id="mstype0"type="radio" name="messagetype" value="0" />
           <label htmlFor="mstype0">Jedes Mitglied darf mir eine Nachricht senden </label><br/> 
           <input id="mstype1"   type="radio" name="messagetype" value="1" />
           <label htmlFor="mstype1"> Nur Mitglieder deren witz ich mag (witz geliked)</label> <br/> 
           <input id="mstype2" type="radio" name="messagetype" value="2" />
           <label htmlFor="mstype2"> Ich möchte keine Nachrichten erhalten.</label> 
           </td>
      </tr> -->
      <tr>
      <td>Webseite</td><td>
       <input className="witzTitle" type="text"  bind:value={$user.webpage} /> 
         </td></tr>
         <tr>
       <td colSpan="2" ><h3>Informationen für andere Mitglieder</h3></td>
       </tr>
         <tr>
         <td colSpan="2">
       <div>
       <textarea style="width:100%; height:300px;"  bind:value={$user.description}  ></textarea>
       </div>
       </td></tr>
       <tr>
         <td>Interessen</td><td>
         <Tagbox tags={$tags} selectedtags={$user.tags} updateTags={updateTags}/> 
         </td> 
         </tr>
       </tbody>
       </table><br/>
       <div>
         <fieldset >
           <legend>    <h3>Geschreibene witzn</h3>  </legend>
       {#if $user.witze}        
       <div class="witzbox">
       {#each $user.witze  as witz }	   
         <a href="/witz/{witz.id}/{getShortTitle(witz.title)}">{witz.title}</a>
        {/each}
       </div>
        {/if}
        <br/> 
        <a style="text-decoration:none;" href="/witz/edit/new">
         <Button>Witz erstellen</Button></a><br>
         </fieldset>       
         <br> 





       </div>
       <fieldset>
         <legend><h3>Alben</h3></legend>
         <Gallerylist galleries={$user.gallerien} />
     <Gallery />
     </fieldset>
       <br/><br/>
       <br/><br/><br/><br/>
       <div id="editprofilefooter">
<Button on:click={Ausloggen}>Ausloggen</Button><br>
<br>
<Button on:click={DeleteProfile}>Mein Profil löschen</Button>
       </div>

 </div>
 {/if}
  
 {/if}