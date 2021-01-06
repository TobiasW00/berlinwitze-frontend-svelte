import {HTTP_URL} from '../config.js';

export function getDescriptionByContent(widgets)
{
    try
    {
let test = widgets.find(f=>f.widgettypeid==="3710c8fd-7115-4d86-b42f-5ba5e9d96687");
return (test) ? test.content.content.substring(0,200) : "";
    }catch(ex)
    {
        console.log(ex);
        return ""
    }
}
export function getImageUrlbyContent(widgets)
{
    try
    {
    let image = widgets.find(f=> f.widgettypeid==="6edd644a-e2f8-4995-acb5-b5585f94d181");
    return (image) ? HTTP_URL + "/berlinwitzepictures/image/" +image.content.pictureid + ".webp": "https://svelte.berlin-witze.de/anleitung.jpg";   
}catch(ex)
{
    console.log(ex);
    return ""
}
}
/*
$: image = (anleitung) ? anleitung.content.find(f=> f.widgettypeid==="6edd644a-e2f8-4995-acb5-b5585f94d181"):'';
$: imageurl = (image) ? HTTP_URL + "/berlinwitzepictures/image/" +image.content.pictureid + ".webp": "https://svelte.berlin-witze.de/anleitung.jpg"; 
*/