<template>
  <div class="Loading">
    <div class="circle"></div>
  </div>
</template>

<style>
.circle
{
  
  position: relative;
  box-sizing: border-box;
  display: block;
  margin: auto;
  height: 32px;
  width: 32px;
  -webkit-animation: rotation 1.35s linear infinite;
  animation: rotation 1.35s linear infinite;
  border: 6px solid rgb(241, 241, 241);
  border-top: 6px solid #407f7f;
  border-radius: 50%;
}

@-webkit-keyframes rotation
{
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>