/** PDF 导出 — 将所有 .page-card 合并为一个 A4 PDF */
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'

export async function exportAllPages(filename = '梦环翠海指南.pdf') {
  const cards = document.querySelectorAll('.page-card') as NodeListOf<HTMLElement>
  if (cards.length === 0) {
    console.warn('没有找到可导出的页面')
    return
  }

  const pdf = new jsPDF('p', 'mm', 'a4')
  const pageW = 210
  const pageH = 297
  let isFirst = true

  for (const card of cards) {
    const canvas = await html2canvas(card, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#FAFAF7',
    })
    const imgData = canvas.toDataURL('image/jpeg', 0.92)
    const imgH = (canvas.height * pageW) / canvas.width

    if (isFirst) {
      pdf.addImage(imgData, 'JPEG', 0, 0, pageW, imgH)
      isFirst = false
    } else {
      pdf.addPage()
      pdf.addImage(imgData, 'JPEG', 0, 0, pageW, imgH)
    }

    // 如果单张卡片高度超过一页 A4（很少见），追加页面
    let remaining = imgH - pageH
    let offset = pageH
    while (remaining > 0) {
      pdf.addPage()
      pdf.addImage(imgData, 'JPEG', 0, -offset, pageW, imgH)
      remaining -= pageH
      offset += pageH
    }
  }

  pdf.save(filename)
}
