<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'

const router = useRouter()

const firstName = ref('')
const lastName = ref('')
const email = ref('')
const telephone = ref('')
const userInfo = ref([])

// Regex for basic email validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const isEmailValid = computed(() => {
  return emailRegex.test(email.value.trim())
})

const isFormValid = computed(() => {
  return (
    firstName.value.trim() !== '' &&
    lastName.value.trim() !== '' &&
    isEmailValid.value &&
    telephone.value.trim() !== ''
  )
})

const saveUserInfo = () => {
  const newUser = {
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    telephone: telephone.value,
  }

  userInfo.value.push(newUser)
  console.log(newUser)

  toast.success(`You're now logged in, ${firstName.value}.`)

  setTimeout(() => {
    router.push('/movieHome')
  }, 5000)

  // Reset form
  firstName.value = ''
  lastName.value = ''
  email.value = ''
  telephone.value = ''
}
</script>

<template>
  <div class="min-h-screen bg-[#911b1b] flex items-center justify-center p-3">
    <div class="max-w-sm w-full bg-white p-6 sm:p-8 rounded-2xl shadow-md sm:shadow-lg">
      <div class="flex justify-center mb-5">
        <div
          class="w-14 h-14 sm:w-16 sm:h-16 bg-[#911b1b] rounded-full flex items-center justify-center"
        >
          <img
            src="/ChatGPT_Image_Jul_7__2025__12_00_58_PM-removebg-preview.png"
            class="w-7 h-7 sm:w-8 sm:h-8"
          />
        </div>
      </div>

      <h2 class="text-xl sm:text-2xl font-bold text-gray-800 text-center mb-5">Sign Up</h2>

      <form @submit.prevent="saveUserInfo" class="space-y-4 sm:space-y-5">
        <div>
          <label class="block text-sm font-medium text-gray-700">First Name</label>
          <input
            type="text"
            v-model="firstName"
            class="w-full mt-1 px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#911b1b] text-sm"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Last Name</label>
          <input
            type="text"
            v-model="lastName"
            class="w-full mt-1 px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#911b1b] text-sm"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            v-model="email"
            class="w-full mt-1 px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#911b1b] text-sm"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Phone Number</label>
          <input
            type="tel"
            v-model="telephone"
            class="w-full mt-1 px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#911b1b] text-sm"
          />
        </div>

        <div>
          <button
            :disabled="!isFormValid || telephone.length < 10"
            @click="saveUserInfo"
            :class="[
              !isFormValid || telephone.length < 10
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-[#911b1b] text-white hover:bg-[#b01e1e]',
              'w-full py-2 rounded-lg font-medium text-sm transition duration-300',
            ]"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
