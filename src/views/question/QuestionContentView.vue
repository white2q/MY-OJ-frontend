<template>
  <div id="questionContentView">
    <a-split
      :style="{
        height: '100vh',
        width: '100%',
        border: '1px solid var(--color-border)',
      }"
      v-model:size="size"
      min="80px"
    >
      <template #first>
        <a-typography-paragraph>
          <a-tabs>
            <a-tab-pane key="title">
              <template #title>
                <icon-file />
                题目
              </template>

              <div class="content">
                <h2>{{ value.title }}</h2>
                <a-space wrap>
                  <a-tag
                    v-for="(tag, index) of JSON.parse(value.tags || null)"
                    :key="index"
                    color="green"
                  >
                    {{ tag }}
                  </a-tag>
                </a-space>
                <MdViewer :value="value.content"></MdViewer>
                <a-descriptions
                  v-for="(e, index) of judgeCase"
                  :key="index"
                  style="margin-top: 20px"
                  :data="[
                    { label: '输入', value: `${e['input']}` },
                    { label: '输出', value: `${e['output']}` },
                  ]"
                  :title="`示例${index + 1}`"
                  :column="1"
                />
              </div>
            </a-tab-pane>
            <a-tab-pane key="answer">
              <template #title>
                <icon-code-square />
                题解
              </template>
              Content of Tab Panel 2
            </a-tab-pane>
            <a-tab-pane key="submitLog">
              <template #title>
                <icon-clock-circle />
                提交记录
              </template>
              Content of Tab Panel 3
            </a-tab-pane>
          </a-tabs>
        </a-typography-paragraph>
      </template>
      <template #second>
        <div>
          <a-split direction="vertical" size="0.6" :style="{ height: '100vh' }">
            <template #first>
              <a-typography-paragraph>
                <a-layout style="height: 400px">
                  <a-layout-header>
                    <a-select
                      v-model="form.language"
                      :style="{ width: '160px' }"
                      placeholder="Java"
                      default-active-first-option
                      :trigger-props="{ autoFitPopupMinWidth: true }"
                    >
                      <a-option>Java</a-option>
                      <a-option>C++</a-option>
                      <a-option>C</a-option>
                    </a-select></a-layout-header
                  >
                  <a-layout-content>
                    <CodeEditor
                      :value="form.code"
                      :language="form.language"
                      :handle-change="codeChange"
                    ></CodeEditor
                  ></a-layout-content>
                  <a-layout-footer>
                    <a-space>
                      <a-button>运行</a-button>
                      <a-button status="success">提交</a-button>
                    </a-space></a-layout-footer
                  >
                </a-layout>
              </a-typography-paragraph>
            </template>
            <template #second>
              <a-typography-paragraph>测试用例</a-typography-paragraph>
            </template>
          </a-split>
        </div>
      </template>
    </a-split>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { onMounted, ref, watchEffect } from "vue";
import { QuestionControllerService } from "../../../generated";
import MdViewer from "@/components/MdViewer.vue";
import CodeEditor from "@/components/CodeEditor.vue";

const route = useRoute();
const size = ref(0.5);
const value = ref({});
const judgeCase = ref([{}]);
const form = ref({
  code: "",
  language: "Java",
});

const loadData = async () => {
  console.log(form.value.language);
  const id = route.params.id;
  const res = await QuestionControllerService.getQuestionByIdUsingGet(
    Number(id)
  );
  if (res.code === 0) {
    value.value = { ...res.data };
    judgeCase.value = JSON.parse(value.value.judgeCase);
  }
};

watchEffect(() => {
  loadData();
});

const codeChange = (v: string) => {
  form.value.code = v;
};

onMounted(() => {
  loadData();
});
</script>

<style>
::-webkit-scrollbar {
  display: none;
}

#questionContentView {
}
</style>
