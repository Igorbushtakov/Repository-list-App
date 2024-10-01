<template>
  <div ref="scrollContainer"
       class="repositories-list-wrapper"
       @scroll="handleScroll"
  >
    <ul v-if="!isLoading">
      <li v-for="repo in repositories" :key="repo.id"
          v-long-click="() => showDialog(repo)"
          :style="{backgroundColor: repo?.has_wiki ? 'white' : 'lightblue'}"
      >
        <strong> {{ `Name:${repo.name}` }}</strong>
        <p> {{ `Description: ${repo.description}` }}</p>
        <small> {{ `Owner login: ${repo.owner.login}` }}</small>
      </li>
    </ul>
    <h4 v-else>
      Items is loading...
    </h4>
    <RepoLinksDialog
        v-model="dialogVisible"
    >
      <template v-slot:title>
        <h2>Go to:</h2>
      </template>
      <template v-slot:body>
        <button @click="openUrl(repoSelected.html_url)">Repository</button>
        <button @click="openUrl(repoSelected.owner.html_url)">Owner</button>
      </template>
    </RepoLinksDialog>

  </div>
</template>

<script setup>
import {onMounted, reactive, ref} from "vue";
import {getRepositoriesList} from "@/services/api/github.js";
import RepoLinksDialog from "@/components/RepoLinksDialog.vue";
import {debounce} from "@/helpers/debounceHelper.js";

let repositories = reactive([]);
const isLoading = ref(false);
const page = ref(1);
const dialogVisible = ref(false);
const repoSelected = ref(null);
const scrollContainer = ref(null);


const showDialog = (repo) => {
  repoSelected.value = repo;
  dialogVisible.value = true;
};

const closeDialog = () => {
  dialogVisible.value = false;
};

const openUrl = (url) => {
  window.open(url, '_blank');
  closeDialog();
};

const fetchGithubRepositories = async (showLoader = true) => {
  try {
    isLoading.value = showLoader;
    const {data} = await getRepositoriesList(page.value, 10);
    repositories.push(...data)
  } catch (e) {
    throw new Error(e);
  } finally {
    isLoading.value = false;
  }
}

const handleScroll = debounce(() => {
  const container = scrollContainer.value;
  const nearBottom = container.scrollHeight - container.scrollTop <= container.clientHeight + 50; // Trigger 50px before reaching bottom
  if (nearBottom && !isLoading.value) {
    loadMore();
  }
}, 300)

const loadMore = () => {
  page.value++;
  fetchGithubRepositories(false);
};

onMounted(async () => {
  document.body.scrollTop = 0
  await fetchGithubRepositories()
})

</script>

<style lang="scss" scoped>
.repositories-list-wrapper {
  width: 100%;
  height: 1000px;
  overflow-y: auto;
  margin: 0;
  padding: 0;

  h2 {
    color: #000000;
    text-align: center;
    margin: 0;
  }

  h4 {
    text-align: center;
  }

  ul {
    width: 100%;
    padding: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    li {
      width: 50%;
      cursor: pointer;
      box-sizing: border-box;
      list-style: none;
      margin-bottom: 10px;
      padding: 10px;
      border: 1px solid #ddd;
      color: #000000;
    }
  }

  @media screen and (max-width: 768px) {
    ul {
      padding: 0 24px;
      width: calc(100% - 48px);

      li {
        width: 100%;
        margin: 10px;
      }
    }
  }
}
</style>
