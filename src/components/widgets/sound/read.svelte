<script>
    export let content;
    import {HTTP_URL} from '../../../config.js';
    
    </script>
    <style>
        h3{
            margin:0;
        }
        .sounddescription{
        font-style: italic;
        }
    </style>
    <div class="picturebox">
        <audio controls>
            <source src="{HTTP_URL}/berlinwitzepictures/sound/{content.soundid}.mp3"   type="audio/mp3" >
            Your browser does not support the audio element.
            </audio>
        <h3>{content.content}</h3>
        <div class="sounddescription">{content.description}</div>
    </div>

