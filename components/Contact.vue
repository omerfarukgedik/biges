<template>
  <!-- <a :href="`tel:${contact.phone}`"> -->
  <div :class="`contact py-2 ${loading && 'loading'}`">
    <div class="container d-flex align-items-center justify-content-between">
      <div class="d-flex align-items-center">
        <img
          v-if="contact.photo"
          :alt="contact.name"
          :src="`https://bigesapi.gedik.dev${contact.photo.url}`"
        />
        <div v-else class="image">
          {{ contact.name[0] + contact.surname[0] }}
        </div>
        {{ `${contact.name} ${contact.surname}` }}
      </div>

      <div class="actions">
        <span @click.prevent="dial(contact.phone)">{{
          $t("contactList.call")
        }}</span>
        <span @click.prevent="share(contact)">{{
          $t("contactList.share")
        }}</span>
        <span @click.prevent="del(contact.id)">{{
          $t("contactList.delete")
        }}</span>
      </div>
    </div>

    <Modal
      v-if="$store.state.shareModal && sharedContact"
      @close="$store.state.shareModal = false"
    >
      <div
        class="d-flex justify-content-between align-items-center"
        slot="header"
      >
        <h3 class="m-0">{{ $t("modalHeader.shareModal") }}</h3>
        <span
          style="cursor: pointer; font-size: 20px"
          @click="$store.state.shareModal = false"
          >X</span
        >
      </div>

      <div slot="body">
        <form @submit.prevent="chooseIt">
          <v-select v-model="selectedToShare" label="email" :options="users"></v-select>

          <button
            class="d-flex justify-self-center mt-3"
            type="submit"
            :disabled="sharedLoading"
          >
            {{ $t("shareModal.buttonText") }}
          </button>
        </form>
      </div>
    </Modal>
  </div>
</template>

<script>
import { GET_DEL_CONTACT } from "@/store/types/actions.type";
import { mapGetters } from "vuex";

export default {
  data: () => ({
    loading: false,
    sharedLoading: false,
    sharedContact: null,
    selectedToShare: null,
  }),
  props: { contact: Object },
  computed: {
    ...mapGetters({
      getUsersWithoutMe: "users/getUsersWithoutMe",
    }),
    users() {
      return this.getUsersWithoutMe(this.$auth.user.id);
    },
  },
  methods: {
    dial: (phone) => { window.open("tel:" + phone, "_self") },
    share(contact) {
      this.sharedContact = contact;
      this.$store.state.shareModal = true;
    },
    async chooseIt() {
      if (this.selectedToShare === null)
        this.$toast.error(this.$t("shareModal.error")).goAway(1500);
      else {
        this.sharedLoading = true;
        this.sharedContact.user = this.selectedToShare.id;

        await this.$axios
            .get(`/contacts?user=${this.selectedToShare.id}`)
            .then(async response => {
                const foundContact = response.data.find(contact => contact.phone === this.sharedContact.phone);
                if(foundContact)
                    this.$toast.error(this.$t("shareModal.alreadyHas")).goAway(1500);
                else {
                    await this.$axios.post('/contacts', this.sharedContact);
                    this.$store.state.shareModal = false;
                    this.$toast.success(this.$t("shareModal.success")).goAway(1500);
                }
            })

        this.sharedLoading = false;
      }
    },
    del(id) {
      this.loading = true;
      this.$axios
        .delete(`/contacts/${id}`)
        .then((response) => {
          if (response.status !== 200) throw err;
          this.$store.dispatch(`contacts/${GET_DEL_CONTACT}`, id);
          this.$toast
            .success(this.$t("contactActions.success.delete"))
            .goAway(1500);
          this.loading = false;
        })
        .catch((err) => {
          console.log(err);
          this.loading = false;
          this.$toast.error(this.$t("contactActions.fail.delete")).goAway(1500);
        });
    },
  },
};
</script>

<style scoped>
.contact {
  background: #f4f9f9;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  font-size: 1.2rem;
}

.loading {
  opacity: 0.3;
}

.image {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
  background: #c7ffd8;
  display: flex;
  justify-content: center;
  align-items: center;
}

img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
  object-fit: cover;
}

span {
  font-size: 0.8rem;
  padding: 0.2rem 0.4rem;
  background: #f0e5d8;
  border-radius: 10px;
  cursor: pointer;
}

@media (max-width: 991px) {
  .contact {
    font-size: 0.9rem;
  }

  img {
    width: 40px;
    height: 40px;
  }

  .image {
    width: 40px;
    height: 40px;
  }

  span {
    font-size: 0.7rem;
    padding: 0.1rem 0.2rem;
  }
}
</style>