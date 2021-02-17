<template>
  <main>
    <Header />
    <div class="d-flex flex-column justify-content-center align-items-center py-5">
      <h1>{{ $t("auth.header") }}</h1>
      <Nuxt />
    </div>
  </main>
</template>

<script>
import Header from "~/components/Header";
export default {
  components: { Header },
  beforeMount() {
    const browserLang = (window.navigator
      ? window.navigator.language ||
        window.navigator.systemLanguage ||
        window.navigator.userLanguage
      : "en"
    )
      .toLowerCase()
      .substr(0, 2);

    const findLanguage = this.$i18n.locales.find(
      (lang) => lang.code === browserLang
    );

    this.$i18n.setLocale(
      findLanguage ? findLanguage.code : this.$i18n.defaultLocale || "en"
    );
  },
};
</script>

<style>
main {
  height: 100vh;
}
h1 {
  font-size: 1.3rem !important;
}
</style>