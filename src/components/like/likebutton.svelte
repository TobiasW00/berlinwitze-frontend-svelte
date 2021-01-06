<script>
export let likecount = 0;
export let objectid = "";
export let avgrating = 0;
$: userrating = 0; 
import {addAction} from '../../api/dbconnection.js';
import swal from 'sweetalert';
import { user } from '../../userstore.js'

const like = "/like.png";
const likeblack = "/likeblack.png";
const likeblue = "/likeblue.png";


function clickLike(rating)
{
if(!$user)
{
    swal("Oops..","Nur registrieter Mitglieder können einen Bewertung abgeben.", "error");
    return;
}


 let data = {
     rating,
     objectid: objectid
 }
 userrating = rating;

   addAction("witz.addlike",data,function likeadded(data)
    {
       if(data.state ==="OK")
       {
           likecount = likecount+1;
       }else
       {
           console.log(data.content);
        swal("Achtung", data.content, "error");
       }
    });
}


</script>
<style>
.likebox
{
   text-align: center;
   display: inline-block;
}
.likebox img
{
    cursor: pointer;
}
</style>
<div class="likebox">
<img alt="1 Stern vergeben" on:click="{()=>{clickLike(1)}}" src={userrating >= 1 ? like : (avgrating >= 1) ? likeblue : likeblack }/>
<img alt="2 Stern vergeben" on:click="{()=>{clickLike(2)}}" src={userrating >= 2 ? like : (avgrating >= 2) ? likeblue : likeblack } />
<img alt="3 Stern vergeben" on:click="{()=>{clickLike(3)}}" src={userrating >= 3 ? like : (avgrating >= 3) ? likeblue : likeblack } />
<img alt="4 Stern vergeben" on:click="{()=>{clickLike(4)}}" src={userrating >= 4 ? like : (avgrating >= 4) ? likeblue : likeblack }/>
<img alt="5 Stern vergeben" on:click="{()=>{clickLike(5)}}" src={userrating >= 5 ? like : (avgrating >= 5) ? likeblue : likeblack }/>
<img alt="6 Stern vergeben" on:click="{()=>{clickLike(6)}}" src={userrating >= 6 ? like : (avgrating >= 6) ? likeblue : likeblack } />
<img alt="7 Stern vergeben" on:click="{()=>{clickLike(7)}}" src={userrating >= 7 ? like : (avgrating >= 7) ? likeblue : likeblack } />
<img alt="8 Stern vergeben" on:click="{()=>{clickLike(8)}}" src={userrating >= 8 ? like : (avgrating >= 8) ? likeblue : likeblack } />
<img alt="9 Stern vergeben" on:click="{()=>{clickLike(9)}}" src={userrating >= 9 ? like : (avgrating >= 9) ? likeblue : likeblack } />
<img alt="10 Stern vergeben" on:click="{()=>{clickLike(10)}}" src={userrating >= 10 ? like : (avgrating >= 10) ? likeblue : likeblack } /><br>
{likecount} Stimmen  Ø {avgrating} von 10 Punkten
</div>