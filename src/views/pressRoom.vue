<script setup></script>

<template>
  <section class="max-w-3xl mx-auto px-4 py-12 text-gray-800">
    <h1 class="text-4xl sm:text-5xl font-extrabold mb-8 text-center text-[#911b1b]">Press Room</h1>

    <div class="space-y-6 leading-relaxed text-[17px]">
      <p>
        Welcome to our Press Room. Here you’ll find the latest news, media kits, and official
        statements from our team. Feel free to download assets and reach out for interviews or press
        inquiries.
      </p>
      <p>
        <strong>Latest Release:</strong> Our new feature rollout is live! Check out the details and
        media assets below for more information.
      </p>
    </div>

    <RouterLink
      to="/movieHome"
      class="inline-block mt-10 px-6 py-3 bg-[#911b1b] text-white font-semibold rounded-lg shadow-md hover:bg-[#b01e1e] transition duration-300"
    >
      ← Back to main page
    </RouterLink>
  </section>
</template>
