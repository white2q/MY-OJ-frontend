<template>
  <div id="questionsSubmitView">
    <a-table
      class="table"
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
      <template #id="{ record }">
        <a-space wrap>
          {{ data.indexOf(record) + 1 }}
        </a-space>
      </template>
      <template #status="{ record }">
        {{ record.status }}
      </template>
      <template #updateTime="{ record }">
        {{ moment(record.updateTime).format("YYYY-MM-DD") }}
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import { QuestionSubmitControllerService } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import moment from "moment";

const columns = [
  {
    title: "#",
    slotName: "id",
  },
  {
    title: "语言",
    dataIndex: "language",
  },
  {
    title: "状态",
    slotName: "status",
  },
  {
    title: "提交时间",
    slotName: "updateTime",
  },
];

const data = ref([]);
const total = ref(0);
const router = useRouter();

const searchParams = ref({
  pageSize: 10,
  current: 1,
  language: "java",
  sortField: "updateTime",
  sortOrder: "descend",
});

const loadData = async () => {
  const res =
    await QuestionSubmitControllerService.listQuestionSubmitByPageUsingPost(
      searchParams.value
    );
  if (res.code === 0) {
    console.log(res.data);
    total.value = res.data.total;
    data.value = res.data.records;
  } else {
    message.error("系统错误", res.message);
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
</script>

<style scoped>
#questionsSubmitView {
  display: flex;
  justify-content: space-around;
}
#questionsSubmitView .table {
  width: 80%;
}
</style>
