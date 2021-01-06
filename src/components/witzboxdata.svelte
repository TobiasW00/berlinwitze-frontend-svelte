<script>
	export let views;
    export let avgrating;
    export let timetoread;
</script>

<style>
.child
{
    border:1px solid white;
    margin:2px;
    border-radius: 3px;
    padding:2px;
}
.boxinfo
{
    color:white;
    font-size: 1.3rem;
    display: flex;
    justify-content: center;
}
.boxinfo div
{
    display: inline-block;
}

</style>

<div class="boxinfo">
<div class="child" title="{views} Mal wurde diese witz aufgerufen.">⤓ {views}</div> &nbsp;&nbsp; <div class="child" title="{avgrating} von 10 Punkte haben unsere Mitglieder vergeben">♥ {avgrating}</div> &nbsp;&nbsp; <div title="Du benötigst eine Minute für diese Witz." class="child">⌛ {1}</div>
</div>

