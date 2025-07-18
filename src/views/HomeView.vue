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
  // if (!isFormValid.value) {
  //   toast.error('Form must be filled out ❌')
  //   if (!isEmailValid.value) {
  //     toast.error('Please enter a valid email address!')
  //   }
  //   return
  // }

  const newUser = {
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    telephone: telephone.value,
  }

  userInfo.value.push(newUser)
  console.log(newUser)

  toast.success(`Welcome ${firstName.value} - ${lastName.value} ✅`)

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
  <div class="min-h-screen bg-[#911b1b] flex items-center justify-center p-4">
    <div class="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg">
      <div class="flex justify-center mb-6">
        <div class="w-16 h-16 bg-[#911b1b] rounded-full flex items-center justify-center">
          <img src="/ChatGPT_Image_Jul_7__2025__12_00_58_PM-removebg-preview.png" class="w-8 h-8" />
        </div>
      </div>

      <h2 class="text-2xl font-bold text-gray-800 text-center mb-6">Sign Up</h2>
      <form @submit.prevent="saveUserInfo" class="space-y-5">
        <div>
          <label class="block text-sm font-medium text-gray-700">First Name</label>
          <input
            type="text"
            v-model="firstName"
            class="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#911b1b]"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Last Name</label>
          <input
            type="text"
            v-model="lastName"
            class="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#911b1b]"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            v-model="email"
            class="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#911b1b]"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Phone Number</label>
          <input
            type="tel"
            v-model="telephone"
            class="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#911b1b]"
          />
        </div>
        <div>
          <button
            :disabled="!isFormValid"
            @click="saveUserInfo"
            :class="[
              isFormValid
                ? 'bg-[#911b1b] text-white hover:bg-[#b01e1e]'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed',
              'w-full py-3 rounded-lg font-semibold transition duration-300',
            ]"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
