import {addAction} from '../api/dbconnection';
import Conversationstore from './conversation_store';


export function getMyConversations()
{
addAction("msg.getmgs", null, function(data)
		{
			if(data.content !== null)
			{
            Conversationstore.set(data.content);
			}
        });
}
