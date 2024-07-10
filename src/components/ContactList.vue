<!-- contactlist.vue -->
<template>
  <div class="messagecontainer">
    <div class="top">
      <div class="userinfo">
        <div class="left">
          <span>TF_test</span>
          <div>12</div>
        </div>
        <div class="right">+</div>
      </div>
    </div>
    <div class="search">
      <input type="text" placeholder="search" />
    </div>
    <div class="contact-list">
      <ul>
        <li 
          v-for="contact in contacts" 
          :key="contact.id" 
          @click="() => selectContact(contact)"
          :class="{ active: contact.id === activeContactId }"
        >
          <img :src="contact.avatar" alt="">
          <div class="namemassage">
            <p class="name">{{ contact.name }}</p>
            <p class="message">{{ contact.latestMessage || '暂无新消息' }}</p>
          </div>
          <span>{{ contact.latestMessageTime || '' }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

interface Contact {
  id: number;
  name: string;
  latestMessage?: string;
  latestMessageTime?: string;
  avatar?: string;
}

const props = defineProps<{ contacts: Contact[], activeContactId: number | null }>();
const emit = defineEmits<{ (e: 'selectContact', contact: Contact): void }>();

function selectContact(contact: Contact) {
  emit('selectContact', contact);
}
</script>

<style scoped lang="scss">
.messagecontainer {
  width: 350px;
  height: 800px;
  box-sizing: border-box;
  border-right: 1px solid #eee;

  .top {
    width: 350px;
    height: 120px;
    padding-top: 20px;
    box-sizing: border-box;
    padding-left: 15px;
    border-bottom: 1px solid #eee;

    .userinfo {
      width: 320px;
      height: 80px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .left {
        display: flex;
        justify-content: flex-start;

        span {
          font-size: 24px;
          font-weight: 600;
        }

        div {
          width: 40px;
          height: 25px;
          background-color: #EDF2F7;
          border-radius: 20px;
          text-align: center;
          line-height: 25px;
          margin-left: 60px;
          font-weight: 600;
        }
      }

      .right {
        width: 35px;
        height: 35px;
        background-color: #615ef0;
        border-radius: 999px;
        line-height: 30px;
        text-align: center;
        color: #fff;
        font-size: 26px;
        font-weight: 900;
      }
    }
  }

  .search {
    width: 350px;
    height: 80px;
    padding-top: 17px;
    box-sizing: border-box;

    input {
      margin: auto auto;
      background-color: #f3f3f3;
      display: block;
      outline: none;
      width: 300px;
      border: none;
      height: 40px;
      font-size: 14px;
      border-radius: 12px;
      padding-left: 20px;
    }
  }

  .contact-list {
    width: 350px;
    height: 600px;
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      display: none;
    }

    ul {
      width: 350px;
      position: relative;

      li {
        width: 350px;
        height: 80px;
        padding: 0 10px;
        // margin-left: 10px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        box-sizing: border-box;
        cursor: pointer;
        transition: background-color 0.3s;

        &.active {
          background-color: #e0e0e0;
        }

        &:hover {
          background-color: #f0f0f0;
        }

        img {
          width: 50px;
          height: 50px;
          border-radius: 12px;
          object-fit: cover;
        }

        .namemassage {
          margin-left: 20px;

          .name {
            width: 150px;
            font-weight: 600;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .message {
            font-size: 14px;
            margin-top: 5px;
            color: #858585;
           

            width: 150px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }

        span {
          right: 10px;
          position: absolute;
          font-size: 12px;
          color: #a8a6a6
        }
      }
    }
  }
}
</style>
