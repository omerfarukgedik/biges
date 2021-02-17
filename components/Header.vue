<template>
  <header>
    <div class="container d-flex justify-content-between align-items-center">
      <img class="logo" alt="Biges Logo" src="~/assets/images/logo.png" />

      <div class="d-flex flex-column justify-content-center align-items-center">
        <nuxt-link
          v-for="locale in $i18n.locales"
          :key="locale.code"
          :to="switchLocalePath(locale.code)"
        >
          <div v-if="locale.code !== $i18n.locale">
            <img
              class="flag"
              :src="require(`~/assets/images/flag/${locale.code}.png`)"
              :alt="`${locale.name} Flag`"
            />
          </div>
        </nuxt-link>

        <span class="mt-1 mt-lg-2" v-if="$auth.user">{{
          `${$auth.user.name} ${$auth.user.surname}`
        }}</span>

        <span
          v-if="$auth.user"
          class="mt-1 mt-lg-2 logout"
          style="cursor: pointer"
          @click="logout"
          >{{ $t("auth.logout") }}</span
        >
      </div>
    </div>
  </header>
</template>

<script>
export default {
  methods: {
    logout() {
      localStorage.removeItem("auth._token.local");
      this.$cookies.removeAll();
      this.$router.go(this.$router.currentRoute);
    },
  },
};
</script>

<style scoped>
header {
  background: #aee1e1;
  padding: 2rem 0;
  border-bottom: 1px dashed #ddd;
}

img.logo {
  width: 153px;
  height: 40px;
}

img.flag {
  width: 30px;
  height: 30px;
  border: 1px solid #000;
  border-radius: 50%;
}

.logout {
  padding: .2rem .4rem;
  background: #b67171;
  color: white;
  border-radius: 3px;;
}

@media (max-width: 991px) {
  header {
    padding: 1rem 0;
  }
  img.logo {
    width: 113px;
    height: 30px;
  }
  img.flag {
    width: 20px;
    height: 20px;
  }
}
</style>