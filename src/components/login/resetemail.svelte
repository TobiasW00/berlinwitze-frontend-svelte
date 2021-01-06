<script>
    import {addAction} from '../../api/dbconnection';
    import {user} from '../../userstore.js';
    import { createEventDispatcher } from "svelte";
    import Button from '../../components/button.svelte'
    import swal from 'sweetalert';
    
    
    const dispatch = createEventDispatcher();
    
    let email ="";

    
    function checkenter(e)
    {
      if(e.key ==="Enter")
      {
        loginUser();
      }
    }
    
    const  loginUser = () =>{
    
      var jsondata = {email:email,password:""};
      addAction("user.resetmail",jsondata,function(data)
            {           
                 if(data.state==="OK")
                 {               
               swal("E-Mail", "versendet, sofern diese Adresse registriert wurde.", "success");    
                 }else
            {
              swal({
      icon: 'error',
      title: 'Oops...',
      text: 'Bitte an den Support werden.'
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
    
    <div id="registerbox">
    <div style="background:pink;">
    <h2>Passwort zurücksetzen</h2>
    </div>
    <div style="padding:10px;">
    
      <label for="fname">E-Mail</label>
      <input type="text" on:keydown={checkenter}  bind:value={email} id="fname" name="fname">
    
   
    
    <Button  on:click={loginUser}>Passwort zusenden</Button><br/>
    </div>
    

    
    </div>