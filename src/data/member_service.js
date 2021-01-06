import members from './member_store';
import {addAction} from '../api/dbconnection.js';

export function fetchMember(userid)
{
    addAction("user.single",userid,(data)=>{
        members.updateMember(data.content);

    });
}
export function fetchPeblicMembers()
{
    addAction("member.loadpublicmembers",null,(data)=>{
        members.set(data.content);

    });
}

export function fetchMembers()
{
    addAction("member.loadallmembers",null,(data)=>{
        members.set(data.content);

    });
}



