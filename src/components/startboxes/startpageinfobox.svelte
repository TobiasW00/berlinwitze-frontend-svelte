<style>
.box
{
	border:2px solid black;
	display: inline-block;
	border-radius: 20px;
	overflow: hidden;
    width:100%;
}
.box > div:first-child
{
	background:blueviolet;
	overflow:hidden;
	text-align: center;
	color:white;
}

.boxcontent h3
{
	margin:0;
	font-size: 1.1rem;
}
.boxcontent
{
    padding:10px;
}
h2
{
	font-size: 1.5rem;
	margin:0;
}
.box a
{
    text-decoration: none;
}

</style>
    <div class="boxcontent">
  
		<div class="box" data-test="warumbox">
            <div>
            <h2>Warum?</h2>
            </div>
            <div class="boxcontent">
                Dies ist eine Svelte/Sapper Testanwendung, um erste Erfahrungen zu sammeln.
                <ul>
                <li><h3><a href="/witz">Witzesammlung</a></h3>
                    Sammlung an Witzen, primär über Berlin.</li>
                <li><h3><a href="/member">Mitglieder</a></h3>
                    Profilseiten der Witzbolde</li>
                <li><h3><a href="/videos">Videos</a></h3>
                Sammlung lustiger YouTube Clips</li>
                <li><h3><a href="/gallery">Bilder</a></h3>
                Comics und Bilder zum Schmunzeln.</li>
            </ul>
                
            </div>
        </div>
</div>

 