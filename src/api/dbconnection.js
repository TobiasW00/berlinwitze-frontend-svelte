
import { readyState } from '../websocktstore.js';
import { user } from '../userstore.js'
import members from '../memberstore.js'
import {WS_URL} from '../config';
import { goto } from '@sapper/app';
let actionarray = [];


   function setup(sendstr){


    if(!window.WebSocket)
    {
      readyState.set(99);
      return;
    }
    
    
    window.ws =  new WebSocket(WS_URL);

   readyState.set(window.ws.readyState);

   window.ws.onmessage = (message) => {
   
   const json = JSON.parse(message.data);
   if(json.action==="user.login" && json.state ==="OK")
    {
      localStorage.setItem("token",json.content);
     let originalaction = actionarray.find(f=>f.action === json.action);
     originalaction.callback(json);
      actionarray = actionarray.filter(f => f.action !== json.action);
      return;
    }

    if(json.action ==="user.authrequired")
    {
        if(localStorage.getItem("token"))
        {
          addAction("user.tokenlogin", localStorage.getItem("token"), function(data){
            if(data.action ==="user.tokenlogin" && data.state==="OK")
            {
              let originalaction = actionarray.find(f=>f.action === json.content);

                 
              user.set(data.content);
              addAction(json.content,originalaction.parameter,originalaction.callback);
            }else
            {
              //window.location.href =
               goto("/");
            }
          });
        }else
        {
          if(json.content!=="user.mydata")
          {
           // window.location.href = "/";
            goto("/");
          }          
        }
        return;
    }

  if(json.action.indexOf("PUBLIC_") > -1)
  {
      switch(json.action)
      {
          case 'PUBLIC_MEMBER_ONLINE':
          members.setOnlineStatus(json.content,true);
          break;
          case 'PUBLIC_MEMBER_OFFLINE':
          members.setOnlineStatus(json.content,false);
          break;
      }
  }else
  {

    const result = actionarray.find(f=>f.action === json.action);
    if(!result)
    {
      console.log("no receiver found");
      console.log(json);
    }else
    {
    result.callback(json);
    }
}
};

        
    window.ws.onopen = (event) => {
      readyState.set(window.ws.readyState);
      if(window.ws.readyState === 0)
      {
        setTimeout(()=>{window.ws.send(JSON.stringify(sendstr))},2000);
      }else
      {
          window.ws.send(JSON.stringify(sendstr));
      }
    };

    window.ws.onclose = (event) => {
      readyState.set(window.ws.readyState);
    };


    window.ws.onerror = (error) => {      
      readyState.set(window.ws.readyState);
      };

   } 

export function addAction(action,parameter, callback){
  if (typeof window === 'undefined') {
    return;
      }
  try{

      let sendstr ={
         action: action,
         parameter: parameter
       };
       let newelement = {action,parameter,callback};
       actionarray.push(newelement);


       if(!window)
       return;

    if(typeof(window.ws) === 'undefined')
        {
            setup(sendstr);
        }else
        {
      if(window.ws.readyState > 1)
          {
        setup(sendstr);  
          }else
          {
            if(window.ws.readyState ===0)
            {
              setTimeout(()=> window.ws.send(JSON.stringify(sendstr)),2000);
            }else
            {
             window.ws.send(JSON.stringify(sendstr));
            }
          }
        }
      }catch(ex)
      {
        console.log(ex);
      }
        
    }

