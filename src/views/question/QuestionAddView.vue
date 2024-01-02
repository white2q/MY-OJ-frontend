<template>
  <div id="questionAddView">
    <a-card title="创建题目" style="width: 60vw">
      <a-form layout="vertical" :model="form" @submit="handleSubmit">
        <a-form-item style="width: 20vw" field="title" label="标题">
          <a-input v-model="form.title" />
        </a-form-item>
        <a-form-item style="width: 40vw" field="tags" label="标签">
          <a-input-tag
            v-model="form.tags"
            :default-value="form.tags"
            allow-clear
          />
        </a-form-item>
        <a-form-item field="content" label="内容">
          <MdEditor
            :value="form.content"
            :handle-change="onContentChange"
          ></MdEditor>
        </a-form-item>
        <a-form-item field="answer" label="答案">
          <MdEditor
            :value="form.answer"
            :handle-change="onAnswerChange"
          ></MdEditor>
        </a-form-item>
        <a-form-item
          style="width: 20vw"
          label="判题配置"
          :content-flex="false"
          :merge-props="false"
        >
          <a-space direction="vertical" fill style="margin-top: 16px">
            <a-form-item field="judgeConfig.memoryLimit" label="内存限制">
              <a-input-number
                v-model="form.judgeConfig.memoryLimit"
                :default-value="0"
                mode="button"
                class="input-demo"
                min="0"
              />
            </a-form-item>
            <a-form-item field="judgeConfig.timeLimit" label="时间限制">
              <a-input-number
                v-model="form.judgeConfig.timeLimit"
                :default-value="0"
                mode="button"
                class="input-demo"
                min="0"
              />
            </a-form-item>
          </a-space>
        </a-form-item>

        <a-form-item
          v-for="(item, index) of form.judgeCase"
          :field="`judgeCase[${index}].input`"
          :label="`判题用例-${index + 1}`"
          :key="index"
        >
          <a-input v-model="item.input" placeholder="输入用例" />
          <div style="padding-right: 16px"></div>
          <a-input v-model="item.output" placeholder="输出用例" />

          <a-button
            status="danger"
            @click="handleDelete(index)"
            :style="{ marginLeft: '10px' }"
            >删除
          </a-button>
        </a-form-item>
        <a-form-item>
          <div>
            <a-button type="primary" @click="handleAdd">添加判题用例</a-button>
          </div>
        </a-form-item>

        <a-form-item>
          <a-button status="success" html-type="submit">提交</a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import MdEditor from "@/components/MdEditor.vue";
import { QuestionControllerService } from "../../../generated";

const form = reactive({
  title: "",
  answer: "",
  content: "",
  tags: [],
  judgeConfig: {
    memoryLimit: 0,
    timeLimit: 0,
  },
  judgeCase: [
    {
      input: "",
      output: "",
    },
  ],
});

const onContentChange = (v: string) => {
  form.content = v;
};

const onAnswerChange = (v: string) => {
  form.answer = v;
};

const handleAdd = () => {
  form.judgeCase.push({
    input: "",
    output: "",
  });
};
const handleDelete = (index: number) => {
  form.judgeCase.splice(index, 1);
};
const handleSubmit = async (data: any) => {
  console.log(data);
  const res = await QuestionControllerService.addQuestionUsingPost(form);
  console.log(res.data);
};
</script>

<style scoped>
#questionAddView {
  display: flex;
  justify-content: space-around;
}
</style>
