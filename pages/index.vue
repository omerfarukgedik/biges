<template>
  <div>
    <div class="d-flex justify-content-center py-1 py-lg-3">
        <input type="text" v-model="search" :placeholder="$t('search')" />
      </div>
    <div v-if="filteredContacts.length > 0">
      
      <div v-for="(contact, index) in filteredContacts" :key="index">
        <Contact :contact="contact" />
      </div>
    </div>

    <div v-else class="d-flex justify-content-center py-3">
      {{ $t("contactList.noContact") }}
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Contact from "~/components/Contact";

export default {
  components: { Contact },
  data: () => ({
    search: "",
  }),
  // async asyncData({ $axios, $auth }) {
  //   const response = await $axios.get(`/contacts?user=${$auth.user.id}`);
  //   return { users: response.data };
  // },
  computed: {
    ...mapGetters({
      contacts: "contacts/getContacts",
    }),
    filteredContacts() {
      if (!this.search) return this.contacts;
      let search = this.search.toLowerCase();

      return this.contacts.filter((c) => {
        return (
          c.name.toLowerCase().includes(search) ||
          c.surname.toLowerCase().includes(search) 
        )
      });
    },
  },
};
</script>

<style scoped>
  input {
    padding: .3rem;
    border-radius: 10px;
    width: 50%;
  }
</style>