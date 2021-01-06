<style>
.wrapper{
cursor: pointer;
margin-top:0.8rem;
margin-bottom:0.8rem;
}
.abutton{
  display: inline-block;
  font-size: 18px;
  font-family: sans-serif;
  text-decoration: none;
  color: #333;
  border: 2px solid #333;
  border-radius: 10px;
  letter-spacing: 2px;
  text-align: center;
  position: relative;
  transition: all .35s;
  padding:5px;
}
@media (max-width: 1000px) {
  .abutton {
    font-size: 10px;
}
}
.abutton span{
  position: relative;
  z-index: 2;
}
.abutton:after{
  position: absolute;
  content: "";
  top: 0;
  left: 0;
  width: 0;
  height: 100%;
  background: #ff003b;
  transition: all .35s;
  border-radius: 8px;
}
.abutton:hover{
  color: #fff;
}
.abutton:hover:after{
  width: 100%;
}
</style>


<div class="wrapper" on:click>
  <div class="abutton"><span>
  <slot></slot>
  </span></div>
</div>
