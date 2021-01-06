<script>
    import { fly } from 'svelte/transition';
    import {addAction} from '../../api/dbconnection';
    import {user} from '../../userstore.js';
    import Teilnehmerbedingungen from '../../components/Teilnehmerbedinungen.svelte';
    import Datenschutzerklaerung from '../../components/Datenschutzerklaerung.svelte';
    import { createEventDispatcher } from "svelte";
    import swal from 'sweetalert';
    import { goto } from '@sapper/app';

let showteilnahmebedingungen = false;
let showdatenschutzerklaerung = false;

const dispatch = createEventDispatcher();

let username ="";
let email ="";
let password ="";
let acceptteilnahmebedingungen =false;
let passwordrepeat ="";


   function handleRegisterUser(){

       if(username.length < 5)
       {
           swal({
                title: 'Pseudonym',
                text: 'muss länger als 5 Zeichen sein.',
                icon: 'error',
                });
        return;
       }
       
       if(username.indexOf("@") > 0)
       {
           swal({
                title: 'E-Mail',
                text: 'enthält kein @ Zeichen.',
                icon: 'error',
                });
        return;
       }

       if(passwordrepeat.length===0 || password.length===0)
       {
           Swal.fire({
                title: 'Passwort',
                text: 'Bitte Passwortfeld ausfüllen',
                icon: 'error',
                });
        return;
       }

       if(passwordrepeat !== password)
       {
           swal({
                title: 'Passwort',
                text: 'Bitte zwei Mal das selbe Passwort eingeben. Danke.',
                icon: 'error',
                });
        return;
       }


       if(acceptteilnahmebedingungen===false)
       {

           swal({
                title: 'Teilnahmebedingungen',
                text: 'bitte akzeptieren.',
                icon: 'error',
                });
       }else        
			 var jsondata = {};
			 jsondata.email = email;
			 jsondata.username = username;
			 jsondata.password = password;			 
			 addAction("user.register",jsondata,function(data)
        {            
            if(data.state==="OK")
            {
              localStorage.setItem("token", data.content);
              swal("Registrierung erfolgreich.", "Sie können sich jetzt einloggen!", "success");
              addAction("user.mydata",null,function(data)
                        {
                        user.set(data.content);
                       //  window.location.href=
                         goto("/myprofile");
                        });
      
            }else
            {    
              localStorage.setItem("token", "");            
              swal("Oops...", "Fehler bei der Registrierung. Vielleicht existiert die E-Mail oder das Pseudonym bereits im System.", "error");      
            }
        });
    }

</script>

<style>
#registerbox input
{
    margin-bottom: 0px;;
}
#registerbox
{
    border:3px solid red;
    background: white;
    border-radius: 20px;
    display: inline-block;
    padding:0;
    overflow:hidden;
    max-width:300px;
}
label
{
    display:block;
    font-size: 0.8rem;
    font-style: italic;
    margin-bottom: 10px;;
}
h2
{
    margin:0;
    padding: 0;
    text-align: center;
    font-size: 1.5rem;
}
input, button
{
    width:100%;
}
button
{
    cursor: pointer;
    height:40px;
    border-radius: 10px;;
}
strong
{    
    cursor: pointer;
}
#textboxregister
{
    font-size: 1rem;
}

#textboxregister input[type=checkbox] {
        transform: scale(1.5);
        cursor: pointer;
}

</style>


{#if showteilnahmebedingungen ===true}
    <Teilnehmerbedingungen on:cancel={()=>{showteilnahmebedingungen=false;}}/>
{/if}
{#if showdatenschutzerklaerung === true}
<Datenschutzerklaerung on:cancel={()=>{showdatenschutzerklaerung=false;}}/>
{/if}
<div in:fly="{{ y: 500, duration: 2000 }}" id="registerbox">
<div style="background:red;color:white;">
<h2>Witzbold Anmeldung</h2>
</div>
<div style="padding:10px;">
<input  id="username" type="text" placeholder="Pseudonym"  bind:value={username} /> 
<label for="username">{(username.length>0)? 'Pseudonym':'*'}</label>
<input  id="email" type="text" placeholder="E-Mail"  bind:value={email} /> 
<label for="email">
{(email.length>0)? 'E-Mail':'*'}
</label>
<input id="password1"  type="password" placeholder="Passwort"  bind:value={password} /> <br/>
<label for="password1">
{(password.length>0)? 'Passwort':'*'}
</label>
<input id="password2" type="password" placeholder="Passwort wiederholen"  bind:value={passwordrepeat} /> <br/>
<label for="password2">{(passwordrepeat.length>0)? 'Passwort Bestätigung':'*'}</label><br/>
<div id="textboxregister">
<input type="checkbox" bind:checked={acceptteilnahmebedingungen}  style="display:inline; width:20px;" id="subscribeNews" name="subscribe" value="newsletter">
<strong on:click={()=>{showteilnahmebedingungen=true;}}>Teilnahmebedinungen</strong> und <strong on:click={()=>{showdatenschutzerklaerung=true;}}>Datenschutzerklärung</strong> akzeptieren.
</div>

<button  on:click={handleRegisterUser}>Registrieren</button>
<br/><br/>
<div style="font-size:0.8rem; text-align:center;">
Bereits registriert?
<span style="color:blue;text-decoration:underline; cursor:pointer;"  on:click|once={()=>{dispatch("showloginform")}}>Login</span>
</div>
</div>
</div>