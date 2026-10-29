<script setup>
import AppHeader from './components/layout/AppHeader.vue'
import HeroSection from './components/sections/HeroSection.vue'
import CoreIntegrationSection from './components/sections/CoreIntegrationSection.vue'
import ClientsSection from './components/sections/ClientsSection.vue'
import NextVisionSection from './components/sections/NextVisionSection.vue'
import ContactSection from './components/sections/ContactSection.vue'
import AppFooter from './components/layout/AppFooter.vue'
</script>

<template>
  <div class="ebrsoft-app">
    <AppHeader />
    <main>
      <HeroSection />
      <CoreIntegrationSection />
      <ClientsSection />
      <NextVisionSection />
      <ContactSection />
    </main>
    <AppFooter />
  </div>
</template>

