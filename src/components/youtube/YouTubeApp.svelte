<script>
import { onMount } from "svelte";
import Youtube from './youtubecomponents/Youtube.svelte';
export let playlistId;
export let key;
let search = '';

let videocount =499;
let videos = [];

async function getYouTubeVideos(youtubetoken) {
		let url = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=' + 10  +"&playlistId="+ playlistId + "&key=" + key;
	   url = (youtubetoken.length===0) ? url : url + "&pageToken="  + youtubetoken;
		const res = await fetch(url);
		const json = await res.json();
		if (res.ok) {
				videocount = json.pageInfo.totalResults;
				json.items.filter((video,i)=>{
							try{
								return true;
							}catch(err)
							{
							 return false
							}
							}).forEach((video) =>
							{
							if(video.snippet.thumbnails)
							{	
								if(video.snippet.thumbnails.high)
								{
									let webpimageurl = video.snippet.thumbnails.high.url;							
									const v = {id:video.id,title:video.snippet.title,description:video.snippet.description,image:webpimageurl,videoId:video.snippet.resourceId.videoId};
									videos = [...videos,v];	
								}
							}
							});

		  if(json.pageInfo.totalResults > videos.length){
           loadMoreTrigger(json.nextPageToken);
		   }
		} else {
			throw new Error(text);
		}
		}

	  onMount(async function() {
			getYouTubeVideos("");
	 });



function loadMoreTrigger(newyoutubekotekn)
      {

   const sentinel =  document.getElementById("loadmore");

	if(sentinel ===null)
	return;

   const config = {
     rootMargin: '300px 0px',
     threshold: 0.01
   };
   
   let observer = new IntersectionObserver(onIntersection, config);
   observer.observe(sentinel);
   
   function onIntersection(entry) {
     if (entry[0].intersectionRatio > 0) {
       observer.unobserve(entry[0].target);
      getYouTubeVideos(newyoutubekotekn);
     }
   } 
   
   }


</script>


<svelte:head>
	<title>{videocount} YouTube Videos</title>
	<meta property="og:title" content="{videocount} YouTube Videos" />
</svelte:head>
<div style="text-align:center;">
{#each videos as video , i (video.id) }			
	<Youtube video={video} />			
{/each}
</div>
<div id="loadmore" />

