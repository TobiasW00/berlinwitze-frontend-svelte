<script  lang="ts">
export let rollen = [];



function roleIcon(rolle)
{

    if(rolle.genre==="Mann")
    return "/roles/male.jpg";

    return "/roles/fem.jpg";

}
function getErzaehler(geschlecht)
{
    switch(geschlecht)
    {
        case "Mann":
        return "Erzähler";
        case "Frau":
            return "Erzählerin";

            return "";
    }
}



</script>


<style>
.rolbox
{
    border:3px solid black;
    border-radius: 20px;
    margin:10px;
    padding:10px;
    background:var(--main-witze-color);
    width:190px;
    text-align: center;
    display: inline-block;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    overflow: hidden;
}
.rolbox .usericon
{
    border-radius: 50%;
    height:100px;
}
h1
{
    margin:0px;
}


@media (max-width: 1000px) {
    .rolbox {
    width:100%;
}
}
</style>

<div style="text-align:center; vertical-align:top;">
{#if rollen}
{#each rollen as rolle (rolle.id)}	   
    <div class="rolbox">
    <img class="usericon" src={roleIcon(rolle)} alt="Icon" />
    <h1>{rolle.name}</h1> 
    {rolle.description}
    <h3>
        {#if rolle.storyteller}
    {getErzaehler(rolle.genre)}
    {/if}
    </h3>
    </div>
{/each}
{/if}
</div>