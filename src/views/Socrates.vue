<template>
  <div class="text-white overflow-auto">
    <div class="noto-sans-tc-300 text-lg p-4">
      {{ maskedfirst.showAnswer ? maskedfirst.solution : maskedfirst.result }}
    </div>


    <button @click="maskedfirst.showAnswer = !maskedfirst.showAnswer">Show Answer</button>

    <div class="noto-sans-tc-300 text-lg p-4">
      {{ maskedsecond.showAnswer ? maskedsecond.solution : maskedsecond.result }}
    </div>
    <button @click="maskedsecond.showAnswer = !maskedsecond.showAnswer">Show Answer</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';


const first = `蘇格拉底笑了笑，說:「但你們不一定能碰見它，即使碰上了，你們也會不能準確判斷而錯過採摘的時機的，是嗎？」`

const second = `有的人看見顆粒飽滿的「麥穗」，就把握時機摘下它；有的人東張西望，總在比較中躊躇着，一再錯失良機。得到最大的當然理想，但把眼前一棵飽滿的麥穗穩拿手中，才是最實在的。`

const dicts = [
  '蘇格拉底',
  '碰見',
  '碰上',
  '準確',
  '判斷',
  '採摘',
  '時機',
  '顆粒',
  '飽滿',
  '當然',
  '理想',
  '眼前',
  '東張西望',
  '躊躇',
  '錯失良機',
  '穩拿手中',
  '實在'
]

type KeyValueStringObject = { [key: string]: string }

type Paragraph = { result: string, solution: string, ans: KeyValueStringObject, showAnswer: boolean }

const mask = (input: string): Paragraph => {
  let result = input
  let solution = input
  let index = 1
  let ans: { [key: string]: string } = {}
  for (let i = 0; i < 5; i++) {
    const random = Math.floor(Math.random() * dicts.length)
    const text = dicts[random]
    if (result.includes(text)) {
      const placeholder = `(________)`
      const placeanswer = `(  ${text}  )`
      result = result.replace(text, placeholder)
      solution = solution.replace(text, placeanswer)
      ans[placeholder] = text
      index++
    }
  }

  //Calc solution

  return { result, solution, ans, showAnswer: false }
}
const maskedsecond = ref<Paragraph>(mask(second))
const maskedfirst = ref<Paragraph>(mask(first))

</script>

<style scoped>
.noto-sans-tc-300 {
  font-family: 'Noto Sans TC', system-ui;
  font-optical-sizing: auto;
  font-weight: 300;
  font-style: normal;
}
</style>
