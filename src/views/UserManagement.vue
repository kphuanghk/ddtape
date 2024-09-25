<template>
  <div class="bg-contain h-screen overflow-y-scroll">
    <!-- User List Page -->
    <div class="p-3 text-2xl text-black dark:text-white">
      User Management
    </div>
    <!-- Search Box -->
    <div class="flex flex-row items-center text-black">
      <div>
        <input class="p-2 rounded-md" placeholder="Search user name" v-model="searchInput" />
      </div>
      <span><button class="newBtn" @click="fNewUserBtn">New +</button></span>
    </div>
    <!-- User List -->
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
      <div v-for="(val, idx) in currentRecords" class="cardBox" @click="fSearchUserByUserId(val.userId)" :key="idx">
        <div class="mr-2 float-right rounded-md p-1 m-1 text-xs w-[100px] text-center "
          :class="val.name ? 'bg-[#cdeece] text-green-700' : 'bg-[#f5d0cd] text-red-700'">
          {{ val.name }}
        </div>
        <div class="p-3">
          <span><button class="w-12 h-12 bg-green-300 rounded-full p-3 font-bold uppercase">
              {{ val.name.charAt(0) }}
            </button></span><span class="m-5 font-bold text-blue-900">{{ val.name }}</span>
        </div>

        <div class="table p-2">
          <div class="table-row">
            <div class="table-cell p-0.5">
              <button class="labelBtn border-lime-300">Login Name</button>
            </div>
            <div class="table-cell">
              <p class="font-semibold pl-2">{{ val.loginName }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div class="pagination">
      <p class="p-2.5 mr-5">
        {{ (currentPage - 1) * recordsPerPage + 1 }} -
        {{ currentPage * recordsPerPage > userList.length ? userList.length : currentPage * recordsPerPage }}
        of
        {{ userList.length }}
      </p>
      <button v-for="pageNumber in totalPages" :key="pageNumber" @click="setCurrentPage(pageNumber)"
        :class="{ active: currentPage === pageNumber }">
        {{ pageNumber }}
      </button>
    </div>
  </div>
  <!-- User Info -->
  <Transition name="fade">
    <div class="custDialog" v-if="userInfoDialog">
      <a @click="userInfoDialog = false" class="custDialogBackground"></a>
      <div class="custDialogInner">
        <div class="custDialogHeader">
          <button class="close" @click="userInfoDialog = false">X</button>
          <h4>
            {{ userInfo.userId > 0 ? userInfo.name : 'New User' }}
          </h4>
        </div>
        <div class="custDialogContent">
          <div class="">
            <div class="rowHeader">General Info</div>
            <label>Name</label>
            <input class="inputBox" placeholder="Your name" v-model="userInfo.name" />

            <div class="rowHeader">Login Info</div>
            <div class="grid grid-cols-1 md:grid-cols-3">
              <div>
                <label>Email</label>
                <input class="inputBox" placeholder="Email" v-model="userInfo.email" />
              </div>
              <div class="md:pl-1">
                <label>Password</label>
                <input class="inputBox" placeholder="Your password" type="password" v-model="userInfo.password" />
              </div>
            </div>
          </div>

          <div class="flex justify-between m-2">
            <p class="text-red-700 text-left p-2 h-10">{{ userInfo.errorMsg }}</p>
            <button class="saveBtn" @click="fSaveUserBtn">Save</button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import api from '@/utils/api'
import { fInitUser, User } from '@/types'
import { filterData, fSampleUsers } from '@/utils'

const userList = ref<User[]>([])
const userInfo = ref<User>(fInitUser())
const searchInput = ref('')
const userInfoDialog = ref(false)
const currentPage = ref(1) // Current page
const recordsPerPage = 6 // Number of records per page

// Calculate the total number of pages
const totalPages = computed(() => {
  return Math.ceil(userList.value.length / recordsPerPage)
})

// Slice the records based on the current page and records per page
const currentRecords = computed(() =>
  filterData(currentPage.value, recordsPerPage, userList.value, searchInput.value, 'name')
)

// Update the current page
const setCurrentPage = (pageNumber: number) => {
  currentPage.value = pageNumber
}

onMounted(async () => {
  userList.value = fSampleUsers()
})

const fNewUserBtn = () => {
  userInfo.value = fInitUser()
  userInfoDialog.value = true
}

const fSearchUserByUserId = async (userId: number | string) => {
  const { data } = await api.get('user/' + userId)
  userInfo.value = data
  userInfoDialog.value = true
}

const fSaveUserBtn = async () => {
  const userId = userInfo.value.userId

  const postData: { user: User; password?: string } = {
    user: userInfo.value
  }
  const password = userInfo.value.password
  if (password) {
    postData.password = userInfo.value.password
  }
  userInfo.value.errorMsg = ''
  if (userId > 0) {
    // Update user info
    console.log(postData.user)

    const result = await api.put('/user', postData.user)
    console.log('Create user', result)
    const { data, status } = result

    if (status == 400) {
      userInfo.value.errorMsg = data.error
    }
    if (status == 200) {
      userInfo.value.errorMsg = 'Record has been updated.'
      const index = userList.value.findIndex((d) => d.userId === userId)
      userList.value[index] = Object.assign({}, data)
    }
  } else if (userId == 0) {
    // Create a new user
    const { data, status } = await api.post('/user', postData.user)

    if (status == 400) {
      userInfo.value.errorMsg = data.error
    }

    if (status == 200) {
      userInfo.value = data
      userInfo.value.errorMsg = 'Record has been created.'
      const newData = Object.assign({}, data)
      userList.value.push(newData)
    }
  }
}
</script>

<style scoped>
@import '@/assets/custDialog.css';

.cardBox {
  @apply bg-gray-100 dark:bg-blue-300 m-2 p-2 rounded-lg
}

.fade-enter-active,
.fade-leave-active {
  @apply transition-opacity duration-300 ease-linear;
}

.fade-enter-from,
.fade-leave-to {
  @apply opacity-0;
}
</style>
