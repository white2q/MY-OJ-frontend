<template>
  <div id="questionView">
    <a-space style="margin-left: 25%" direction="vertical" size="large">
      <a-input-search
        @change="doSearch"
        :style="{ width: '35vw' }"
        placeholder="输入标题、标签进行搜索"
      />
    </a-space>
    <ADivider size="1"></ADivider>
    <a-table
      :pagination="{
        total,
        showTotal: true,
        pageSize: searchParams.pageSize,
        current: searchParams.current,
      }"
      :columns="columns"
      :data="data"
      @page-change="onPageChange"
    >
      <template #title="{ record }">
        <a-space wrap>
          <a-link @click="doQuestion(record.id)">{{ record.title }}</a-link>
        </a-space>
      </template>
      <template #id="{ record }">
        <a-space wrap>
          {{ data.indexOf(record) + 1 }}
        </a-space>
      </template>
      <template #tags="{ record }">
        <a-space wrap>
          <a-tag v-for="(tag, index) of record.tags" :key="index" color="green">
            {{ tag }}
          </a-tag>
        </a-space>
      </template>
      <template #acceptedRate="{ record }">
        <a-space wrap>
          {{
            record.submitNum === 0
              ? 0
              : `${((record.submitNum / record.acceptedNum) * 10).toFixed(2)}%`
          }}
        </a-space>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import { QuestionControllerService } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";

const columns = [
  {
    title: "#",
    slotName: "id",
  },
  {
    title: "标题",
    slotName: "title",
  },
  {
    title: "通过率",
    slotName: "acceptedRate",
  },
  {
    title: "标签",
    slotName: "tags",
  },
];

const data = ref([]);
const total = ref(0);
const router = useRouter();

const searchParams = ref({
  pageSize: 10,
  current: 1,
  title: "",
});

const loadData = async () => {
  const res = await QuestionControllerService.listQuestionVoByPageUsingPost(
    searchParams.value
  );
  if (res.code === 0) {
    total.value = res.data.total;
    data.value = res.data.records;
  } else {
    message.error("添加失败", res.message);
  }
};

const onPageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    current: page,
  };
};

watchEffect(() => {
  loadData();
});

onMounted(() => {
  loadData();
});

const doSearch = async (e: string) => {
  searchParams.value = {
    ...searchParams.value,
    current: 1,
    title: e,
  };
  const res = await QuestionControllerService.listQuestionVoByPageUsingPost(
    searchParams.value
  );
  if (res.code === 0) {
    data.value = res.data.records;
    total.value = res.data.total;
  } else {
    message.error("搜索失败" + res.message);
  }
};

const doQuestion = (id: number) => {
  router.push({
    path: `/question/content/${id}`,
  });
};
</script>

<style scoped>
#questionView {
  margin: 0 auto;
  width: 80vw;
}
</style>
