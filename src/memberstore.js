import { writable } from 'svelte/store';

function createMemberstore()
{

	const { subscribe, set, update } = writable([]);


	function updateMember(updatemember)
	{
		update(users=> {
				let isnew = users.find(f=>f.id === updatemember.id)
				if(!isnew)
				{
					return [...users,updatemember];
				}else
				{
					return users.map(member => {
						if(member.id === updatemember.id)
						{
						return updatemember;
						}else
						{
							return member;
						}
					});
		        }
		
		  });
	}


function setOnlineStatus(memberid,onlinestatus)
{

		update(function setonline(users)
		{
			return users.map(user => {
                if(user.id === memberid)
                {
                    user.online = onlinestatus;
                    return user;
                }else
                {
                    return user;
                }

            })
		});
}








return {
		subscribe,
		set,		
		setOnlineStatus,
		updateMember		
	};
}
export default createMemberstore();