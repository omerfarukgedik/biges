<template>
  <main>
    <Header />
    <Nuxt />
    <AddNewIcon />
    <AddNewContact />
  </main>
</template>

<script>
import Header from "~/components/Header";
import AddNewIcon from "~/components/AddNewIcon";
import AddNewContact from "~/components/AddNewContact";

export default {
  middleware: "auth",
  components: { Header, AddNewIcon, AddNewContact },

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

