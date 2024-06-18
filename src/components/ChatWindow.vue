<template>
  <div class="chat-window">
    <h2>与 {{ contact.name }} 的聊天</h2>
    <div class="messages" ref="messagesContainer">
      <div v-for="message in messages" :key="message.id"
        :class="['message', message.sender === 'me' ? 'sent' : 'received']">
        <p style="line-height: 1.8;font-weight: 500;">{{ message.text }}</p>
        <small>{{ formatTime(message.time) }}</small>
      </div>
    </div>
    <div class="putbar">
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M11.97 12V15.5C11.97 17.43 13.54 19 15.47 19C17.4 19 18.97 17.43 18.97 15.5V10C18.97 6.13 15.84 3 11.97 3C8.1 3 4.97 6.13 4.97 10V16C4.97 19.31 7.66 22 10.97 22"
          stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      </svg>

      <input v-model="newMessage" @keyup.enter="handleSendMessage" placeholder="输入消息并按回车发送" class="sendmessage" />
      <button @click="handleSendMessage" class="sendbtn">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M16.14 2.96001L7.11 5.96001C1.04 7.99001 1.04 11.3 7.11 13.32L9.79 14.21L10.68 16.89C12.7 22.96 16.02 22.96 18.04 16.89L21.05 7.87001C22.39 3.82001 20.19 1.61001 16.14 2.96001ZM16.46 8.34001L12.66 12.16C12.51 12.31 12.32 12.38 12.13 12.38C11.94 12.38 11.75 12.31 11.6 12.16C11.4605 12.0189 11.3823 11.8284 11.3823 11.63C11.3823 11.4316 11.4605 11.2412 11.6 11.1L15.4 7.28001C15.69 6.99001 16.17 6.99001 16.46 7.28001C16.75 7.57001 16.75 8.05001 16.46 8.34001Z"
            fill="#fff" />
        </svg>

      </button>
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
  text: string;
  time: string;
  sender: string;
}

const props = defineProps<{ contact: Contact; messages: Message[] }>();
const emit = defineEmits<{ (e: 'sendMessage', message: string): void }>();

const newMessage = ref('');
const messagesContainer = ref<HTMLElement | null>(null);

function handleSendMessage() {
  if (newMessage.value.trim()) {
    emit('sendMessage', newMessage.value);
    newMessage.value = '';
    scrollToBottom();
  }
}

// Watch for messages prop changes and scroll to bottom when new message is added
watch(() => props.messages, async () => {
  await nextTick();
  scrollToBottom();
});

function scrollToBottom() {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
  }
}

// Watch for contact prop changes and reset newMessage
watch(() => props.contact, () => {
  newMessage.value = '';
});

// Function to format time
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
    height: 600px;
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
    width: 550px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: 120px;
    margin-top: 40px;
    svg{
      cursor: pointer;
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
    .sendbtn:active{
      transform: scale(0.95);
    }
  }
}
</style>
