<template>
  <div class="message-item">
    <ul class="messages">
      <li>
        <span class="teal-text" >{{ name }}</span>
        <span class="message-content">{{text}}</span>
        <span class="gray-text time">{{time.toDate().toLocaleTimeString()}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["displayName", "text", "time", "name"]
}
</script>

<style>
.message-item {
  display: flex;
  align-items: flex-end;
  margin-bottom: 15px;}
  .message-content {
  position: relative;
  background: #FFF;
  border-radius: 4px;
  box-shadow: 0px 1px 2px #BDCCD7;
  padding: 10px;
  font-family: 'Roboto', sans-serif;
  font-weight: normal;
  font-size: 13px;
  line-height: 21px;
  color: #2D313F;
  mix-blend-mode: normal;
  opacity: 0.8;
  max-width: 280px;
  min-width: 100px;
  margin-left: 10px;}
  .message-item.outgoing {
  flex-direction: row-reverse;}
  .message-item.outgoing .message-content {
  margin-left: 0;
  margin-right: 10px;}
  .message-item.outgoing .message-content {
  background: #1B47DB;
  color: #FFF;
  opacity: 1;}
  .message-content:after {
  content: '';
  position: absolute;
  top: calc(100% - 20px);
  width: 0;
  height: 0;
  border: 12px solid transparent;
  margin-top: -12px;
  z-index: 1;
  transform: skew(0, 30deg);}
  .message-item.incoming .message-content:after {
  left: 0;
  border-right-color: #ffffff;
  border-left: 0;
  margin-left: -10px;}
  .message-item.outgoing .message-content:after {
  right: 0;
  border-left-color: #1B47DB;
  border-right: 0;
  margin-right: -11px;}
  .message-content:before {
  content: '';
  position: absolute;
  z-index: 0;
  top: calc(100% - 20px);
  width: 0;
  height: 0;
  border: 10px solid transparent;
  filter: blur(1px);
  margin-top: -10px;
  transform: skew(0, 30deg);}
  .message-item.incoming .message-content:before {
  left: 0;
  border-right-color: #ffffff;
  border-left: 0;
  margin-left: -10px;
  border-right-color: rgba(0, 0, 0, 0.2);}
  .message-item.outgoing .message-content:before {
  right: 0;
  border-left-color: #1B47DB;
  border-right: 0;
  margin-right: -11px;
  border-right-color: rgba(0, 0, 0, 0.2)}
  @media (max-width: 635px){
  .avatar {
    display: none;}
  .message-content:before,
  .message-content:after {
    display: none}
  .message-item {
    width: 100%}
  .message-item.outgoing .message-content,
  .message-item.incoming .message-content {
    margin-left: 0;
    margin-right: 0;
    width: 100%;
    max-width: 100%;}}
</style>