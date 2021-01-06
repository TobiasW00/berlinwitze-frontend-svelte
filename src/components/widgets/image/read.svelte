<script>
export let content;
import {HTTP_URL} from '../../../config.js';

</script>
<style>
    img
    {
        max-width: 100%;
    }
    .picturebox
    {
        text-align: center;
    }
    h3{
        margin:0;
    }
    .picturedescription{
    font-style: italic;
    }
</style>
<div class="picturebox">
    <img src="{HTTP_URL}/berlinwitzepictures/image/{content.pictureid}.webp" alt={content.content} /><br>
    <h3>{content.content}</h3>
    <div class="picturedescription">{content.description}</div>
</div>