<template>
  <Modal
    v-if="$store.state.addContactModal"
    @close="$store.state.addContactModal = false"
  >
    <div
      class="d-flex justify-content-between align-items-center"
      slot="header"
    >
      <h3 class="m-0">{{ $t("modalHeader.addContactModal") }}</h3>
      <span
        style="cursor: pointer; font-size: 20px"
        @click="
          $store.state.addContactModal = false;
          clear();
        "
        >X</span
      >
    </div>

    <div slot="body">
      <form @submit.prevent="addContact">
        <table>
          <tbody>
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
                <label>{{ $t("contact.email") }} :</label>
              </td>
              <td><input type="email" v-model="form.email" /></td>
            </tr>
            <tr>
              <td>
                <label>{{ $t("contact.phone") }} :</label>
              </td>
              <td><input type="text" v-model="form.phone" /></td>
            </tr>
            <tr>
              <td>
                <label>{{ $t("contact.photo") }} :</label>
              </td>
              <td>
                <input
                  type="file"
                  id="photo"
                  v-on:change="onFileChange"
                  accept="image/*"
                />
              </td>
            </tr>

            <tr>
              <td height="70" colspan="2" align="end">
                <button
                  :disabled="loading"
                  type="submit"
                  class="modal-default-button"
                >
                  {{ $t("contactList.add") }}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  </Modal>
</template>

<script>
import Modal from "~/components/Modal";
import { GET_ADD_CONTACT } from "@/store/types/actions.type";

export default {
  components: { Modal },
  data: () => ({
    loading: false,
    photo: null,
    form: {
      name: "",
      surname: "",
      phone: "",
      email: "",
    },
  }),
  methods: {
    clear() {
      this.photo = null;
      this.form = {
        name: "",
        surname: "",
        phone: "",
        email: "",
      };
    },
    async addContact() {
      this.loading = true;

      let formData = new FormData();
      this.form.user = this.$auth.user.id;
      this.photo !== null &&
        formData.append("files.photo", this.photo, this.photo.name);
      formData.append("data", JSON.stringify(this.form));
      await this.$axios
        .post("/contacts", formData)
        .then((response) => {
          if (response.status !== 200) throw err;
          this.$store.dispatch(`contacts/${GET_ADD_CONTACT}`, response.data);
          this.$toast
            .success(this.$t("contactActions.success.add"))
            .goAway(1500);
          this.loading = false;
        })
        .catch((err) => {
          console.log(err);
          this.loading = false;
          this.$toast.error(this.$t("contactActions.fail.add")).goAway(1500);
        });

      this.$store.state.addContactModal = false;
      this.clear();
    },
    onFileChange(e) {
      this.photo = e.target.files[0];
    },
  },
};
</script>

<style scoped>
table {
  width: 100%;
}
input {
  width: 100%;
  font-size: 0.9rem;
  padding: 0.2rem;
}
tr {
  margin-top: 20px;
}
</style>