<template>
  <div id="questionsSubmitView">
    <!--    <a-space style="margin-left: 25%" direction="vertical" size="large">-->
    <!--      <a-input-search-->
    <!--        @change="doSearch"-->
    <!--        :style="{ width: '35vw' }"-->
    <!--        placeholder="输入语言、用户进行搜索"-->
    <!--      />-->
    <!--    </a-space>-->
    <!--    <ADivider size="1"></ADivider>-->
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
      <template #username="{ record }">
        <a-space wrap>
          {{ record.userVO.userName }}
        </a-space>
      </template>
      <template #status="{ record }">
        <a-tag v-if="record.status == 20000" color="green">
          {{ "通过" }}
        </a-tag>
        <!--                  todo 补充完整错误类型-->
        <a-tag v-else color="red">
          {{ "错误" }}
        </a-tag>
      </template>
      <template #updateTime="{ record }">
        {{
          moment(record.updateTime).locale("zh-cn").startOf("second").fromNow()
        }}
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import {
  QuestionControllerService,
  QuestionSubmitControllerService,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import moment from "moment";

const columns = [
  {
    title: "#",
    slotName: "id",
  },
  {
    title: "提交用户",
    slotName: "username",
  },
  {
    title: "提交语言",
    dataIndex: "language",
  },
  {
    title: "提交状态",
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

// todo 添加搜索功能 （语言、时间）
const searchParams = ref({
  pageSize: 10,
  current: 1,
  sortField: "updateTime",
  sortOrder: "descend",
});

const loadData = async () => {
  const res =
    await QuestionSubmitControllerService.listQuestionSubmitByPageUsingPost(
      searchParams.value
    );
  if (res.code === 0) {
    total.value = res.data.total;
    data.value = res.data.records;
    console.log(data.value);
  } else {
    message.error("系统错误", res.message);
  }
};

// const doSearch = async (e: string) => {
//   searchParams.value = {
//     ...searchParams.value,
//     current: 1,
//   };
//   const res = await QuestionControllerService.listQuestionVoByPageUsingPost(
//     searchParams.value
//   );
//   if (res.code === 0) {
//     data.value = res.data.records;
//     total.value = res.data.total;
//   } else {
//     message.error("搜索失败" + res.message);
//   }
// };

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
  margin: 0 auto;
  width: 80vw;
}
</style>
