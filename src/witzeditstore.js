import { writable } from 'svelte/store';

const default_witz = {allowcomments: false,
	comments: null,
	created: "2020-06-24T12:05:28.020977Z",
	id: "",
	likecount: 0,
	modified: "2020-06-24T12:05:28.020977Z",
	owner: "",
	ownerid: "",
	public: false,
	roles: [],
	tags: "",
	timetoread: "",
	title: "",
	views:0 };


function createwitzedit()
{
	const { subscribe, set, update } = writable(default_witz);



	function updateTags(tagid)
	{
		update(function witz(fs)
			{
				if(fs.tags.includes(tagid))
				{
				  fs.tags =  fs.tags.replace(tagid +";","");
				}else
				{
				  fs.tags =  fs.tags + (tagid +";");
				}
				return fs;
			})

	}


function addRolle()
{

		update(function witz(fs)
		{
		const rolle = {id:String(fs.roles.length+1), name:"",age:"",genre:"",storyteller:false,description:"",witzid:fs.id};
			return {...fs,roles:[...fs.roles,rolle]};
		});
}

function removeRolle(id)
{
	update(function witz(fs)
	{
		return {...fs,roles:[...fs.roles.filter(f=>f.id !==id)]};
	});
}




	return {
		subscribe,
		increment: () => update(n => n + 1),
		reset: () => set(default_witz),
		set,
		updateTags,
		addRolle,
		removeRolle
	};
}
export const witzedit = createwitzedit();
