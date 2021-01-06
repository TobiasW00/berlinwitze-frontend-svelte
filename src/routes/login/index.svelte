
<script>
import Button from '../../components/button.svelte'
import {addAction} from '../../api/dbconnection';
import swal from 'sweetalert';
let email = '';
let password = '';
let keyCode;

function handleKeydown(event) {
		//key = event.key;
                keyCode = event.keyCode;
                console.log("test");
}

function loginuser()
{

  var jsondata = { email,password};

  addAction("user.login",jsondata,function(data)
        {     
             
             if(data.state==="OK")
             {  
               localStorage.setItem("token",data.content);          
            //  swal("Willkommen!", "Viel Spaß auf svelte.berlin-witze.de", "success");      
            swal(
  'Login erfolgreich.',
  'success'
);
        alert("Login erfolgreich");

             }else
             {
                swal(
  'Login fehlgeschlagen.',
  'error'
);
            
             }
             
        });
}

</script>


<style>

</style>
<svelte:head>
<title>Login</title>
</svelte:head>
{keyCode}
<div>

            <div id="loginpage">
            <div className="loginblock">
            <table>
            <tbody>
            <tr><td>
            E-Mail
            </td><td><input id="email" type="text"  bind:value={email}   /></td></tr>
            <tr>
            <td>Passwort</td>
            <td>
            <input id="passwordfield" on:keydown={()=>alert("test")} type="text"  bind:value={password} />
            </td>
            </tr><tr>
    <td></td><td><br/>
    <button on:click={loginuser}>Login</button>
    <br/><br/>
            Kein Zugang?  <a href="/registeruser">Kostenlos registrieren</a>
   </td>
    </tr>
    </tbody>
            </table>
         
    </div>
    <br/>
    <div className="MemberLoginBlock">
            <h1>Vorteile als registriertes Mitglied</h1>
          <ul>
                <li>Sie können die <b>Autoren kontaktieren</b> (nur wenn diese eine Kontaktinformation hinterlegt haben)</li>
                <li>Eigene <b>witzn veröffentlichen</b></li>
                <li>Sie bleiben <b>anonym</b>, lediglich ein E-Mail Adresse und ein Deckname wird benötigt</li>
                <li><b>Kostenlos</b></li>
         </ul>  
   </div>
            
            </div>
            
</div>
