# 梦环翠海指南（HITWITH GUIDE）

基于 Vue 3 + Vite 的电子杂志站点，聚焦「哈工大威海校区周边美食」的实地探访内容。页面采用双页翻阅形式，并支持一键导出 A4 PDF。

## 功能亮点

- 封面 / 目录 / 跨页内容 / 尾页完整杂志结构
- 店铺评分、地址与评论展示
- 图片缩略图与灯箱查看
- 一键导出 PDF（客户端渲染）

## 技术栈

- Vue 3
- Vite
- TypeScript
- UnoCSS
- html2canvas + jsPDF

## 本地运行

```bash
cd magazine
npm install
npm run dev
```

浏览器访问终端提示的本地地址即可。

## 构建与预览

```bash
cd magazine
npm run build
npm run preview
```

## 内容与资源维护

- `src/data/locations.ts`：店铺数据、评分与评论
- `public/photos/<id>/`：每个店铺的图片资源（与 `id` 对应）
- `public/avatars/`：评论者头像
- `public/cover.png`：封面图

## PDF 导出

页面右上角点击「导出 PDF」即可生成完整杂志文件（默认文件名：`梦环翠海指南-HITWITH-GUIDE.pdf`）。

## 致谢

加入社群快一年了，能为社群做一点小贡献对我来说是件很开心的事，望大家每天开心，探索美食，吃好喝好。
