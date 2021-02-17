<template>
  <div class="register p-4">
    <div class="d-flex justify-content-between align-items-center">
      <h2>{{ $t("auth.register") }}</h2>
      <nuxt-link to="/tr/login">{{ $t("auth.loginRoute") }}</nuxt-link>
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
            <td>
              <label>{{ $t("contact.name") }} :</label>
            </td>
            <td><input type="text" v-model="form.name" /></td>
          </tr>
          <tr>
            <td>
              <label>{{ $t("contact.surname") }} :</label>
            </td>
            <td><input type="text" v-model="form.surname" /></td>
          </tr>
          <tr>
            <td>
              <label>{{ $t("contact.phone") }} :</label>
            </td>
            <td><input type="text" v-model="form.phone" /></td>
          </tr>
          <tr>
            <td height="70" colspan="2" align="end">
              <button :disabled="loading" type="submit">
                {{ $t("auth.register") }}
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
      name: "",
      surname: "",
      phone: "",
    },
  }),
  methods: {
    async submit() {
      this.loading = true;

      let data = {
        username: this.form.identifier,
        email: this.form.identifier,
        password: this.form.password,
        phone: this.form.phone,
        name: this.form.name,
        surname: this.form.surname,
      };

      await this.$axios
        .post("/auth/local/register", data)
        .then(async (response) => {
          this.$auth.setUserToken(response.data.jwt)
          this.$auth.setUser(response.data.user)
          await this.$auth.fetchUser()
          this.$toast.success(this.$t("auth.registerSuccess")).goAway(1500);
          this.loading = false;
        })
        .catch((error) => {
          console.log(error);
          this.$toast.error(this.$t("auth.registerError")).goAway(1500);
          this.loading = false;
        });

      // window.location.href = "/";
    },
  },
};
</script>

<style scoped>
.register {
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