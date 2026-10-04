# 王亿宽 · 学术主页

- 中文：<https://onewide.github.io/>
- English: <https://onewide.github.io/en/>

独立制作的双语静态学术主页。包含研究方向、学术成果、竞赛奖项、荣誉、教育和学生工作经历，适配手机与桌面，支持奖项筛选、证书查看和邮箱复制。

## 修改内容

主要内容集中在 `content/profile.mjs`。无需安装依赖，使用 Node.js 18 或以上版本：

```sh
npm run build
npm run check
git add content scripts assets index.html en/index.html
git commit -m "Update academic profile"
git push origin main
```

GitHub Pages 从 `main` 分支根目录发布。`index.html` 与 `en/index.html` 为已生成页面，修改数据后需要重新生成并一起提交。`.nojekyll` 保证静态资源直接发布。

## 添加论文

在 `content/profile.mjs` 的 `publications` 数组中添加**已确认录用或发表**的论文。每条记录需要：

| 字段 | 内容 |
| --- | --- |
| `id` | 唯一英文短标识，用于页面锚点 |
| `title` | 真实论文标题 |
| `authors` | 按正式署名顺序填写的字符串数组，`Yikuan Wang` 或 `王亿宽` 自动加粗 |
| `venue` | 会议或期刊名称 |
| `year` | 年份，数字 |
| `status` | `accepted` 或 `published` |
| `summary` | 可选，`{ zh: '中文摘要', en: 'English summary' }` |
| `paper`, `code`, `doi` | 可选，真实 HTTPS 链接 |
| `equalContribution` | 可选，已确认的共同第一作者姓名数组，姓名须与 `authors` 一致；对应姓名显示星号 |
| `presentation` | 可选，展示形式，如 `Poster` |
| `overview` | 可选，包含 `thumbnail`、`full`、`width`、`height` 和双语 `alt` 的配图对象，文件放在 `assets/publications/` |
| `bibtex` | 可选，完整 BibTeX 引用，页面支持展开和复制 |

按年份降序展示；相同年份保留录入顺序。未提供的链接不会显示按钮。**不要把在投工作的标题、摘要或其他保密信息写入这个公开仓库。**

目前已收录本人确认录用的 **RIGOR（NeurIPS 2026 Poster）**，按提供的顺序展示全部 12 位作者，并标记王亿宽为共同第一作者。配图支持点击查看完整分辨率版本。

### 替换 RIGOR 论文链接

在 `content/profile.mjs` 中找到 `id: 'rigor'`，将 `paper` 字段的 OpenReview PDF URL 替换为正式论文链接，然后执行上方的生成、检查与推送命令。中英文页面的论文标题和 PDF 按钮会一起更新。

## 证书与素材

- 照片：`assets/portrait.webp`
- 证书：`assets/certificates/`，为原证书的压缩副本
- 论文配图：`assets/publications/`，含页面预览和完整分辨率版本
- 样式：`assets/site.css`，论文图文布局在 `assets/publications.css`
- 交互：`assets/site.js`
- 静态生成器：`scripts/build.mjs`

内容依据提供的简历、照片及学生会主席经历。竞赛省赛名称与优秀学生干部证书链接已按证书校对。部分证书与简历的年份表述不同，目前奖项年份遵循简历；如需调整，请修改数据文件。

原 Hexo 工程在独立的本地目录中，未修改。此仓库的已有历史文章路径仍保留；根首页已更换为学术主页。以后请从本项目发布，Hexo 的整站部署可能覆盖学术首页。
