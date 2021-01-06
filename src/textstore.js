import { writable } from 'svelte/store';

function createTextstore()
{
	const { subscribe, set, update } = writable([]);

	function addHeaderwidget()
	{
		update(texts=> {
				let headerwidget = {widgettypeid:"12f622cb-657f-45df-bc7e-439446248935",widgetid:"", content:{content:"",size:""}};
					return [...texts,headerwidget];
		
		  });
	}
	function addImagewidget()
	{
		update(texts=> {
				let headerwidget = {widgettypeid:"6edd644a-e2f8-4995-acb5-b5585f94d181",widgetid:"", content:{pictureid:"",content:"",description:""}};
					return [...texts,headerwidget];
		
		  });
	}

	function addSoundwidget()
	{
		update(texts=> {
				let headerwidget = {widgettypeid:"ecddbf43-15f3-4db2-b468-c2260b24c284",widgetid:"", content:{soundid:"",content:"",description:""}};
					return [...texts,headerwidget];
		
		  });
	}

	

	
	function addTextwidget()
	{
		update(texts=> {
				let textwidget = {widgettypeid:"3710c8fd-7115-4d86-b42f-5ba5e9d96687",widgetid:"", content:{content:""}};
					return [...texts,textwidget];
		
		  });
	}

	function hochschieben(index)
	{
		update(texts=> {
			if(index===0)
			{
			return texts;
			}

			let temp = texts[index-1];
			texts[index-1] = texts[index] 
			texts[index] = temp;
			return texts;
		  });
	}

	function runterschieben(index)
	{
		update(texts=> {
			console.log(index);
			console.log(texts.length);
			if(index===texts.length-1)
			{
				return texts;
			}

			let temp = texts[index+1];
			texts[index+1] = texts[index] 
			texts[index] = temp;
			return texts;
		  });
	}
	function loeschen(index)
	{
		update(texts=> {

			return texts.filter((f,i)=>{return i!==index });;
		  });
	}



return {
		subscribe,
		set,		
		hochschieben,
		addTextwidget,
		addHeaderwidget,
		runterschieben,
		loeschen,
		addImagewidget,
		addSoundwidget,
		reset: () => set([]),
	};
}
export default createTextstore();