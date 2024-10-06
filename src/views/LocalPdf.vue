<template>
	<div class="w-screen h-screen z-30 absolute left-0 top-0 overflow-auto">
		<iframe ref="pdfviewer" class="w-full h-full"></iframe>
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

const pdfviewer = ref<HTMLIFrameElement>()

onMounted(() => {
	// create a document the same way as above
	const doc = new PDFDocument({ margin: 5 })
	doc.fontSize(25).text('XXXSome text with standard font!', 100, 100)
	doc.fontSize(25).text('学习如划船，不进则退', 100, 200)
	doc.fontSize(25).text('學習如划船，不進則退', 100, 300)
	doc.strokeColor('red').rect(100, 300, 200, 200)

	const secondpage = doc.addPage()
	secondpage.fontSize(20).text('Simply as that', 50, 100)
	console.log('OK')

	// see the range of buffered pages
	const { start, count } = doc.bufferedPageRange()
	const end = start + count
	console.log(start, count, end)
	for (let i = start; i < end; i++) {
		doc.switchToPage(i)
		doc.text(`Page ${i + 1} of ${count}`)
	}
	doc.flushPages()
	// pipe the document to a blob
	// @ts-ignore
	const stream = doc.pipe(blobStream())
	console.log('Not ok')
	// add your content to the document here, as usual
	// get a blob when you're done
	doc.end()
	stream.on('finish', () => {
		// get a blob you can do whatever you like with
		// const blob = stream.toBlob('application/pdf');
		// or get a blob URL for display in the browser
		const url = stream.toBlobURL('application/pdf')
		pdfviewer.value!.src = url
	})
})
</script>
