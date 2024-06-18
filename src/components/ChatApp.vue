<template>
  <div class="chat-app">
    <ContactList
      :contacts="contacts"
      @selectContact="selectContact"
      :activeContactId="selectedContact ? selectedContact.id : null"
    />
    <ChatWindow
      v-if="selectedContact"
      :contact="selectedContact"
      :messages="getMessages(selectedContact.id)"
      @sendMessage="sendMessage"
    />
    <input type="text" v-model="revice" @keyup.enter="test" class="test" placeholder="在此测试输入对方消息">
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ContactList from './ContactList.vue';
import ChatWindow from './ChatWindow.vue';

interface Contact {
  id: number;
  name: string;
  latestMessage?: string;
  latestMessageTime?: string;
  avatar?: string;
}

interface Message {
  id: number;
  contactId: number;
  text: string;
  time: string; // Add time property
  sender: string; // Add sender property
}

const contacts = ref<Contact[]>([
  { id: 1, name: '房产中介', avatar: 'https://picture.gptkong.com/20240611/222318cb5a43904f4e90bcadd028a5e6f8.jpg' },
  { id: 2, name: '浴皇大帝', avatar: 'https://picture.gptkong.com/20240611/22231da7215eff434caa2f683272d69e4c.jpeg' },
  { id: 3, name: 'Charlie', avatar: 'https://picture.gptkong.com/20240611/222318cb5a43904f4e90bcadd028a5e6f8.jpg' },
  { id: 4, name: 'Tifa爱tf', avatar: 'https://picture.gptkong.com/20240611/2223ed47c284844c9d94554e328ede0b56.jpg' },
]);

const messages = ref<Message[]>([
  { id: 1, contactId: 1, text: 'Hello Alice!', time: '2024/6/17 10:20', sender: 'me' },
  { id: 2, contactId: 2, text: 'Hi Bob!', time: '2024/6/17 11:30', sender: 'other' },
  { id: 3, contactId: 3, text: 'Hey Charlie!', time: '2024/6/17 12:40', sender: 'other' },
]);

const selectedContact = ref<Contact | null>(null);

function selectContact(contact: Contact) {
  selectedContact.value = contact;
}

function getMessages(contactId: number) {
  return messages.value.filter(message => message.contactId === contactId).sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());
}

function sendMessage(text: string) {
  if (selectedContact.value) {
    const currentTime = new Date().toLocaleString(); // Get current time
    const newMessage = {
      id: Date.now(),
      contactId: selectedContact.value.id,
      text: text,
      time: currentTime,
      sender: 'me',
    };
    messages.value.push(newMessage);
    updateLatestMessage(selectedContact.value.id, text, currentTime);
  }
}

const revice = ref('');
function receiveMessage(contactId: number, text: string) {
  const currentTime = new Date().toLocaleString(); // Get current time
  const newMessage = {
    id: Date.now(),
    contactId: contactId,
    text: text,
    time: currentTime,
    sender: 'other',
  };
  messages.value.push(newMessage);
  updateLatestMessage(contactId, text, currentTime);
}

const test = () => {
  if (selectedContact.value) {
    receiveMessage(selectedContact.value.id, revice.value);
    revice.value = ''
  }
};

function updateLatestMessage(contactId: number, text: string, time: string) {
  const contact = contacts.value.find(c => c.id === contactId);
  if (contact) {
    contact.latestMessage = text;
    contact.latestMessageTime = time;
  }
}
</script>

<style lang="scss">
.chat-app {
  display: flex;
  justify-content: flex-start;
  position: relative;
}
.test{
  position: absolute;
  left: 0;
  bottom: 40px;
  height: 40px;
  width: 200px;
  
}
</style>
