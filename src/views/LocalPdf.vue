<template>
	<div class="w-screen h-screen">
		<iframe ref="pdfviewer" class="w-full h-full"></iframe>
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

const pdfviewer = ref<HTMLIFrameElement>()

onMounted(() => {
	// create a document the same way as above
	const doc = new PDFDocument()
	doc.fontSize(25).text('Some text with standard font!', 100, 100)

	console.log('OK')
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
