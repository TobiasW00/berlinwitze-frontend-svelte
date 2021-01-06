<script>
import {addAction} from '../../api/dbconnection';
import {user} from '../../userstore.js';
import { createEventDispatcher } from "svelte";
import Button from '../../components/button.svelte'
import ResetMail from './resetemail.svelte';
import swal from 'sweetalert';
let passwordreset = false;

const dispatch = createEventDispatcher();

let email ="";
let password ="";

function checkenter(e)
{
  if(e.key ==="Enter")
  {
    loginUser();
  }
}

const  loginUser = () =>{

  var jsondata = {email,password};
  addAction("user.login",jsondata,function(data)
        {           
             if(data.state==="OK")
             {  
               localStorage.setItem("token",data.content);          
           swal("Willkommen!", "zurück auf unserem Portal.", "success");

        addAction("user.mydata",null,function(data)
        {
          user.set(data.content);
        });
          }else
        {
          swal({
  icon: 'error',
  title: 'Oops...',
  text: 'Deine Zugangsdaten funktionieren nicht. Neuer Versuch?'
})         
             }
             
        });

    }
</script>

<style>
#registerbox
{
    border:3px solid red;
    background: white;
    border-radius: 20px;
    display: inline-block;
    padding:0;
    overflow:hidden;
    max-width:300px;
        margin-left:1rem;
}
label
{
    display:block;
    font-size: 0.8rem;
}
h2
{
    margin:0;
    padding: 5px;
    text-align: center;
    font-size: 1.5rem;
}
input
{
    width:100%;
}


</style>
{#if passwordreset}
<ResetMail/>
{:else}
<div id="registerbox">
<div style="background:pink;">
<h2>Login</h2>
</div>
<div style="padding:10px;">
  <label for="fname">Name oder E-Mail</label>
  <input type="text" on:keydown={checkenter}  bind:value={email} id="fname" name="fname">
  <label for="fpassword">Passwort</label>
  <input type="password" on:keydown={checkenter} bind:value={password} id="fpassword" name="fpassword">
<Button  on:click={loginUser}>Login</Button><br/>
</div>
<div style="font-size:0.8rem; text-align:center; cursor:pointer; padding:5px;">
  <span on:click={()=>passwordreset=true}>Passwort vergessen? <span style="color:blue;text-decoration:underline;">Passwortreset</span></span>
</div>
<div style="font-size:0.8rem; text-align:center; padding:5px;">
Noch nicht registeriert?
<span style="color:blue;text-decoration:underline; cursor:pointer;"  on:click|once={()=>{dispatch("showregisterform")}}>Registrieren</span>
</div>

</div>
{/if}