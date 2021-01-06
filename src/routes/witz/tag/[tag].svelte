
<script>
    import Infobox from '../../../components/witzboxdata.svelte';
    import {HTTP_URL} from '../../../config.js';
    import {getShortTitle} from '../../../help/witz.js';
    import DisplayTextsWidget from '../../../components/widgets/displaytext.svelte';

    
    export let tag;
    export let tags;
    export let witzess;
    $: tagid = (tags.length > 1 && tag) ? tags.find(f=>getShortTitle(f.name.toLowerCase()) === getShortTitle(tag.toLowerCase())).id : "-------------";

    $: filter = witzess.filter(f=>  f.tags.indexOf(tagid) > -1);

    
   
    </script>
    <script context="module">
    import witze  from '../../../witzestore.js';
    import {tags}  from '../../../searchfilterstore.js';
    import { get } from 'svelte/store';

	export async function preload(page, session) {
        console.log("in Preload");
        const promTags = new Promise((resolve,reject)=> {
        if(get(tags).length === 0)
            {
                console.log("lade tags");
                this.fetch(`${HTTP_URL}/api/tags`).then(r => r.json()).then(data => {
                                     tags.set(data.content);
                                     console.log("tags geladen");
                                       resolve(data.content);
                }).catch((err) =>
                {
                    console.log(err);
                    reject(err);
                });
            }else
            {
                resolve(get(tags));
            }
        });

        const promwitze = new Promise((resolve,reject)=> {

            if(get(witze).length < 2)
            {
                console.log("lade witzn");
            this.fetch(`${HTTP_URL}/api/witze`).then(r => r.json()).then(data => {
                        witze.set(data.content);		
                        resolve(data.content);
                        console.log("witzn geladen");
                    }).catch((err) => {
                        console.log(err);
                        reject(err);
                    });
            }else
            {
                resolve(get(witze));
            }
        });






      const myResultPromise = new Promise((resolve, reject) => {  
        Promise.all([promwitze,promTags]).then((values) => {
                const returnresult = {witzess: values[0],tag:page.params.tag,tags:values[1] }              
                    resolve(returnresult);
        }).catch((err)=>
        {
            console.log(err);
            reject(err);
        });
        

            });
      
  
          return myResultPromise; 
	}
       </script> 
    
    <style>
    .grid-item { text-align: center;  width: 300px; height:500px; border-radius: 8px; box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 2px 0px;	display: inline-block; background:var(--main-witze-color);margin:10px;}
    .grid-item-body { background:white; text-align: left; overflow: hidden;  height:360px; padding: 5px;}
    .grid-item-header{
        color: white; height:100px;  display:flex;
        align-items: center; justify-content: center;}
    a {text-decoration: none;color:black;}
    h1
    {
        font-size: 1.3rem;
    }
    
    @media (max-width: 400px) {
            .grid-item 
            {
                width:90%;
            }
        }
    </style>
    
    <svelte:head>
        <title>{filter.length} {tag} witzn</title>
        <meta property="og:title" content="{filter.length} {tag} witzn" />
        <meta property="og:description" content="Lustvolle {tag} Gesichte." />
        <meta property="og:image" content="https://svelte.berlin-witze.de/preview.jpg"  />
        <meta property="og:type" content="website">
        <meta property="og:url" content="https://svelte.berlin-witze.de/witz/tag/{tag}"  />
    </svelte:head>

    <div style="text-align: center;">
            {#each filter as witz (witz.id)}	   
            <div class="grid-item">
                <a  href='witz/{witz.id}/{getShortTitle(witz.title)}' >
            <div class="grid-item-header">
            <h1>{witz.title}</h1>
            </div>
            <div class="grid-item-body">
                <DisplayTextsWidget content={witz.content} />			
            </div>
                </a>
    
            <Infobox views={witz.views} avgrating={witz.avgrating} timetoread={witz.timetoread} />
            </div>		
    {/each}
    </div>
 
    