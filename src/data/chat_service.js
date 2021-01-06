import {addAction} from '../api/dbconnection';
import swal from 'sweetalert';
import Chatstore from './chat_store';
import { goto,stores } from '@sapper/app';



export function getChat(memberid)
{
   console.log(memberid);
   addAction("msg.getconversation",memberid,function getConversation(data)
   {      
      console.log(memberid);
      Chatstore.updateMemberChat(data.requestguid,data.content);
   });
}

export function deleteChat(memberid)
{
   addAction("msg.deleteconversation",memberid,(data)=>{
      if(data.state ==="OK")
      {
         goto("/nachrichten");
      }
      else
      {
         console.log(data);
      }
      });
}

export async function sendMessage(memberid,content)
{
   let myPromise = new Promise(function(myResolve, myReject)
   {
   let jsondata = {};
   jsondata.content = content;
   jsondata.receiver = memberid;
  addAction("msg.add",jsondata, function(data)
  {
                     if(data.state==="authrequired")
                              {              
                                    myReject("Benutzer nicht authentifiziert.");                                
                                   goto('/');                        
                              }else
                              {                                 
                                 if(data.state==="error")
                                 {
                                    myReject(data.msg);
                                  swal("Oops...", data.msg, "error");                                        
                                 }else
                                 {
                                    getChat(memberid);
                                    myResolve(data.content);
                                 }
                                 
                              }   
  }); 
});

return myPromise;
}