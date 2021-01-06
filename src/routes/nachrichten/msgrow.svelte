<script>
import members  from '../../memberstore';
import {user}  from '../../userstore.js';
import {HTTP_URL} from '../../config';
import {onMount} from 'svelte';
import {addAction} from '../../api/dbconnection.js';
export let msg;

let userid = "";
onMount(()=> 
{
	userid = getMsgID(msg);
			if($members.find(f=> f.id === userid) === undefined)
			{				
				addAction("user.single",userid,(data)=>{
							members.updateMember(data.content);
  
				});
			}
}
);
$: member = $members.find(f=>f.id === userid);





$: name = (member) ? member.name : "";
function getMsgID(msg)
{
	if(msg.sender === $user.id)
	{
		return msg.receiver;
	}else
	{
		return msg.sender;
	}
}


function getPictureURL(msg)
{
	if(msg.sender === $user.id)
	{
		return HTTP_URL +"/berlinwitzepictures/tumb_" + msg.receiver + ".jpg";
	}
	return HTTP_URL +"/berlinwitzepictures/tumb_" + msg.sender + ".jpg";
}

</script>


<style>
.singlemessagebox
{
	width:100%;
	padding: 10px;
	background: var(--main-msg-color);
	border-radius: 8px;
	border:1px solid transparent;
}
.singlemessagebox:hover
{
	background:#ff748c;
	border:1px solid black;
}
.msglink
{
text-decoration: none;
color:white;
}
.namelabel
{  
    color:black;
    background:white;
	display: inline;
	padding:5px;
	border-radius: 10px;
}
</style>



<a class="msglink" href="/nachrichten/{getMsgID(msg)}"><div class="singlemessagebox">
<div style="display:inline-block;">
<img style="height:100px;" src={getPictureURL(msg)} alt={name} />
</div>
<div style="vertical-align:top;display:inline-block;">
<div class="namelabel">{name}</div><br>
{msg.content}
</div>
</div></a>