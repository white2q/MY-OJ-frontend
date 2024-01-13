<template>
  <div id="questionManageView">
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
      <template #tags="{ record }">
        <a-space wrap>
          <a-tag
            v-for="(tag, index) of JSON.parse(record.tags)"
            :key="index"
            color="green"
          >
            {{ tag }}
          </a-tag>
        </a-space>
      </template>
      <template #createTime="{ record }">
        {{ moment(record.createTime).format("YYYY-MM-DD") }}
      </template>
      <template #updateTime="{ record }">
        {{ moment(record.updateTime).format("YYYY-MM-DD") }}
      </template>
      <template #optional="{ record }">
        <a-button status="danger" @click="doDelete(record)">删除</a-button>
        <a-button type="primary" @click="doUpdate(record)">修改</a-button>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import { Question, QuestionControllerService } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import moment from "moment";

const columns = [
  {
    title: "id",
    dataIndex: "id",
  },
  {
    title: "标题",
    dataIndex: "title",
  },
  {
    title: "标签",
    slotName: "tags",
  },
  {
    title: "提交数",
    dataIndex: "submitNum",
  },
  {
    title: "通过数",
    dataIndex: "acceptedNum",
  },
  {
    title: "判题配置",
    dataIndex: "judgeConfig",
  },
  {
    title: "判题示例",
    dataIndex: "judgeCase",
  },
  {
    title: "创建时间",
    slotName: "createTime",
  },
  {
    title: "更新时间",
    slotName: "updateTime",
  },
  {
    title: "Optional",
    slotName: "optional",
  },
];

const data = ref([]);
const total = ref(0);
const router = useRouter();

const searchParams = ref({
  pageSize: 10,
  current: 1,
});

const loadData = async () => {
  const res = await QuestionControllerService.listQuestionByPageUsingPost(
    searchParams.value
  );
  if (res.code === 0) {
    total.value = res.data.total;
    data.value = res.data.records;
  } else {
    message.error("添加失败", res.message);
  }
};

const doDelete = async (record: Question) => {
  const res = await QuestionControllerService.deleteQuestionUsingPost({
    id: record?.id,
  });
  if (res.code === 0) {
    message.success("删除成功");
    loadData();
  } else {
    message.error("删除失败", res.message);
  }
};

const doUpdate = async (record: Question) => {
  router.push({
    path: "/update/question",
    query: {
      id: record.id,
    },
  });
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
#questionManageView {
  display: flex;
  justify-content: space-around;
}
</style>
