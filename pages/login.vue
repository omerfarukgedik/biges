<template>
  <div class="login p-4">
    <div class="d-flex justify-content-between align-items-center">
      <h2>{{ $t("auth.login") }}</h2>
      <nuxt-link to="/tr/register">{{ $t("auth.registerRoute") }}</nuxt-link>
    </div>
    <form @submit.prevent="submit">
      <table>
        <tbody>
          <tr>
            <td>
              <label>{{ $t("auth.email") }} :</label>
            </td>
            <td><input type="email" v-model="form.identifier" /></td>
          </tr>
          <tr>
            <td>
              <label>{{ $t("auth.password") }} :</label>
            </td>
            <td><input type="password" v-model="form.password" /></td>
          </tr>
          <tr>
            <td height="70" colspan="2" align="end">
              <button :disabled="loading" type="submit">
                {{ $t("auth.login") }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  </div>
</template>

<script>
export default {
  layout: "auth",
  middleware: 'guest',
  data: () => ({
    loading: false,
    form: {
      identifier: "",
      password: "",
    },
  }),
  methods: {
    async submit() {
      try {
        this.loading = true;
        await this.$auth.loginWith("local", {
          data: this.form,
        });
        this.$toast.success(this.$t("auth.loginSuccess")).goAway(1500);
        this.loading = false;
        window.location.href = "/";
        // this.$router.push("/tr");
      } catch (err) {
        this.$toast.error(this.$t("auth.loginError")).goAway(1500);
        console.log(err);
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.login {
  min-width: 340px;
  background: #ddd;
  border-radius: 10px;
}
table {
  width: 100%;
}
input {
  width: 100%;
  font-size: 1rem;
  padding: 0.2rem;
}
tr {
  margin-top: 20px;
}
a {
    color: blue !important;
}
</style>