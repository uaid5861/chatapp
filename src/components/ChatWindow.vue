<template>
  <div class="chat-window">
    <h2>与 {{ contact.name }} 的聊天</h2>
    <div class="messages" ref="messagesContainer">
      <div v-for="message in messages" :key="message.id"
        :class="['message', message.sender === 'me' ? 'sent' : 'received']">
        <p v-if="message.text" style="line-height: 1.8;font-weight: 500;">{{ message.text }}</p>
        <img v-if="message.imageUrl" :src="message.imageUrl" alt="Image"
          style="max-width: 100%; border-radius: 10px;" />
        <small>{{ formatTime(message.time) }}</small>
      </div>
    </div>
    <div class="putbar">
      <!-- 图片预览 -->
      <div v-if="newImageUrl" class="image-preview">
        <img :src="newImageUrl" alt="Image Preview" />
        <button @click="clearImage" class="remove-btn">x</button>
      </div>
      <input type="file" @change="handleImageUpload" v-if="!newImageUrl" class="imgboxbtn" />
      <input v-model="newMessage" @keyup.enter="handleSendMessage" placeholder="输入消息并按回车发送" class="sendmessage" />
      <button @click="handleSendMessage" class="sendbtn">发送</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue';
import { defineProps, defineEmits } from 'vue';

interface Contact {
  id: number;
  name: string;
}

interface Message {
  id: number;
  contactId: number;
  text?: string;
  imageUrl?: string;
  time: string;
  sender: string;
}

const props = defineProps<{ contact: Contact; messages: Message[] }>();
const emit = defineEmits<{ (e: 'sendMessage', message: Message): void }>();

const newMessage = ref('');
const newImageUrl = ref('');
const messagesContainer = ref<HTMLElement | null>(null);

function handleSendMessage() {
  if (newMessage.value.trim() || newImageUrl.value) {
    const message = {
      id: Date.now(),
      contactId: props.contact.id,
      text: newMessage.value.trim() || undefined,
      imageUrl: newImageUrl.value || undefined,
      time: new Date().toISOString(),
      sender: 'me',
    };
    emit('sendMessage', message);
    newMessage.value = '';
    newImageUrl.value = '';
    scrollToBottom();
  }
}

function handleImageUpload(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      newImageUrl.value = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }
}

function clearImage() {
  newImageUrl.value = '';
}

watch(() => props.messages, async () => {
  await nextTick();
  scrollToBottom();
});

function scrollToBottom() {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
  }
}

watch(() => props.contact, () => {
  newMessage.value = '';
  newImageUrl.value = '';
});

function formatTime(time: string) {
  const currentTime = new Date();
  const messageTime = new Date(time);
  const diffTime = currentTime.getTime() - messageTime.getTime();
  const oneDay = 24 * 60 * 60 * 1000;

  if (diffTime < oneDay && currentTime.getDate() === messageTime.getDate()) {
    return messageTime.toTimeString().slice(0, 5);
  } else if (diffTime < oneDay * 2 && currentTime.getDate() - messageTime.getDate() === 1) {
    return '昨天 ' + messageTime.toTimeString().slice(0, 5);
  } else {
    return messageTime.toISOString().slice(0, 10) + ' ' + messageTime.toTimeString().slice(0, 5);
  }
}
</script>

<style scoped lang="scss">
.chat-window {
  width: 900px;

  h2 {
    width: 900px;
    height: 80px;
    border-bottom: 1px solid #eee;
    line-height: 80px;
    margin-left: 20px;
    font-weight: 600;
    font-size: 20px;
  }

  .messages {
    height: 500px;
    overflow-y: scroll;
    width: 900px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    &::-webkit-scrollbar {
      width: 5px;
      height: 12px;
    }

    &::-webkit-scrollbar-track {
      background: #f1f1f1;
      border-radius: 10px;
    }

    &::-webkit-scrollbar-thumb {
      background: #bababa;
      border-radius: 10px;

      &:hover {
        background: #b0b0b0;
      }
    }
  }

  .message {
    max-width: 300px;
    padding: 10px;
    margin: 5px;
    border-radius: 10px;
    white-space: pre-wrap;

    &.sent {
      // background-color: #daf8cb;
      background-color: #615EF0;
      color: #fff;
      margin-left: auto;
    }

    &.received {
      background-color: #f1f0f0;
    }

    small {
      font-size: 12px;
    }
  }

  .putbar {
    width: 650px;
    height: 140px;
    // background-color: pink;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: 50px;
    margin-top: 40px;
    // .imgboxbtn{
      
      
    // }

    .image-preview img {
      max-width: 100px;
      max-height: 100px;
      margin-right: 10px;
      
      
    }
    .image-preview{
      
      position: relative;
    }
    .remove-btn {
      width: 20px;
      height: 20px;
      box-sizing: border-box;
      border-radius: 999px;
      // padding: 5px 10px;
      cursor: pointer;
      border: none;
      background-color: rgba($color: #c7c6c6, $alpha: 0.6);
      text-align: center;
      position: absolute;
      right: 0px;
      top: -8px;
      z-index: 100000;

      &:hover {
        background-color: rgba($color: #c7c6c6, $alpha: 1.0);
      }
    }

   

    .sendimg {
      svg {
        cursor: pointer;
      }
    }

    .sendmessage {
      width: 400px;
      height: 45px;
      outline: none;
      border: 2px solid #e2e8f0;
      border-radius: 12px;
      white-space: pre-wrap;
      // margin-left: 100px;
      transition: all 0.1s ease-in-out;

      &:focus {
        border: 3px solid #615ef0;
      }
    }

    .sendbtn {
      border: none;
      outline: none;
      width: 70px;
      height: 35px;
      background-color: #615ef0;
      border-radius: 999px;
      color: #fff;
      // text-align: center;
      // cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: all 0.2s ease-in-out;
      cursor: pointer;
    }

    .sendbtn:active {
      transform: scale(0.95);
    }
  }
}
</style>
