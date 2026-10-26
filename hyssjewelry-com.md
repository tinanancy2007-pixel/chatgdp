# www.hyssjewelry.com 项目资料（从旧项目「Www.hyssjewelry.com」搬过来）

来源：旧会话 `session_01VR4nhxKSn9oLm6ZzP8zvsX`，在你的 Windows 电脑（HS-2505X79R）上运行，工作目录 `D:\ClaudeWork\hyss_jewelry\`。
旧会话最后活动时间：2026-10-22 晚（北京时间 10-23 凌晨）。

> 安全说明：旧对话里出现过 root 密码，这里**没有**抄过来。请确认已经在 VPS 上改掉（`passwd`）。

## 1. 服务器

| 项目 | 内容 |
|---|---|
| IP / 端口 | 43.166.154.207 / 22 |
| 系统 | CentOS 7.9，主机名 VM-16-11-centos |
| 面板 | 宝塔（BT-Panel），Nginx + PHP 7.4.33 + MySQL |
| 登录方式 | SSH 钥匙登录，用户 root。私钥只在你电脑上：`~/.ssh/hyssjewelry_ed25519`（公钥备注 `claude@hyssjewelry`） |
| 网站目录 | `/www/wwwroot/www.hyssjewelry.cn` |
| Nginx 配置 | `/www/server/panel/vhost/nginx/www.hyssjewelry.cn.conf` |
| 域名 | hyssjewelry.cn、www.hyssjewelry.cn、hyssjewelry.com、www.hyssjewelry.com |
| 数据库 | `www_hyssjewelry_`，表前缀 `wp_`，localhost |
| 占用 | 整站 7.3G，其中 uploads 2.2G |

登录时发现：上次成功登录后有 **147 次登录失败**，有人在猜 root 密码。

## 2. 网站技术栈

- WordPress 7.1.3，WooCommerce 11.0.1，主题 **Woodmart 8.1.2**（`xts-woodmart-options`）
- 已启用插件：all-in-one-wp-migration, code-snippets, contact-form-7, customer-reviews-woocommerce, duplicate-page, duplicator-pro, elementor, elementor-pro, fluent-smtp, gtranslate, image-optimization, mailchimp-for-wp, psmwoo-multi-currency, safe-svg, google-site-kit, wiser-review, woocommerce, woocommerce-paypal-payments, woocommerce-gateway-stripe, woodmart-core, wpforms, wps-hide-login, wp-statistics
- mu-plugins：`elementor-safe-mode.php`、`hyss-arabic-rtl.php`、`hyss-preserve-com-host.php`
- 服务器上有 wp-cli：`wp --allow-root --skip-plugins --skip-themes ...`

### Code Snippets（已启用的）

| id | 名称 |
|---|---|
| 17 | Wishlist |
| 18 | HYSS 客户修改第一批 |
| 19 | HYSS 启用 WordPress 应用密码 |
| 21 | HYSS 客户修改第二批 |
| 23 | HYSS 国家币种配送联动 |
| 24 | HYSS WooPayments 授权修复助手 |
| 28 | HYSS Contact Us 参考表单 |
| 29 | HYSS Our Review 隐藏搜索排序栏 |
| 30 | HYSS Privacy Policy 页面布局 |
| 31 | HYSS Jewelry Care 页面布局 |
| 33 | HYSS Size Guides 手链项链尺寸 |
| 37 | HYSS Personal Center 账户中心 |
| 40 | HYSS Two-Year Warranty 弹窗 |
| 42 | HYSS 产品尺码入口仅戒指 |
| 47–49 | HYSS 客户修改第三、四、五批 |
| 51 | HYSS Newsletter 客户确认邮件 |
| 52 | HYSS 结账界面布局 |
| 56 | HYSS 文档十项站点修复（10 项修改要求的前端 CSS/JS） |

其余（1–16、20、22、25–27、32、34–36、38、39、41、43–46、50、53–55）为停用或一次性临时片段。

## 3. 你提的要求

**总要求：**
1. 全面分析并解决网站的样式问题，手机、电脑在各种分辨率和浏览器下都要适配好。
2. 按附件（Word 文档）的 10 条修改。
3. 不可以改出新 bug。

**附件里的 10 条：**
1. 全站字体统一，包括页尾。
2. 手机端 Shopping 页筛选样式改成参考图（item 部分小一些，另外两个选项框拉大）。
3. 电脑端 Shopping 页价格筛选拖动后不能按金额筛选，要修好。
4. 手机端页尾更紧凑。
5. 手机端首页底部图片：戒指底图向左移，左边空白太大。
6. 产品页 Featured products：删掉 view more；手机端左右滑动看更多，电脑端改成和 Shopping 页一样的 1/2/3/4/5 翻页。
7. 产品评论区统一（手机和电脑一致）：去掉“24 Review for Daylight”这类文字；删掉原来的添加评论区，把添加评论移到评论区开头；点 Leave a review 和 Ask a question 都弹窗。
8. 尺寸没选时不要弹窗，而是在尺码选择下方显示红色小字 `*This is a required field`。
9. 手机端登录/注册改成左右切换，不要上下排列。
10. 结账付款时，未登录用户自动注册。

附件原件和图片在你电脑上：`D:\ClaudeWork\hyss_jewelry\req\`。

## 4. 做到哪了

- ✅ 生成 SSH 钥匙，你装到 VPS 上后钥匙登录成功。
- ✅ 摸清服务器、WordPress、主题、插件和 Code Snippets。
- ✅ 读完 10 条要求和附件图片。
- 🔄 正在用 Playwright 对首页、Shop、产品页、My Account 做手机/电脑多分辨率截图检查（只读，脚本 `audit.js`）。旧对话在这一步停了，**10 条修改还没有确认全部完成并验收**。
- ⏳ 安全措施还没做：改 root 密码、关闭密码登录只留钥匙、装 fail2ban。

## 5. 接着做的注意事项

- 私钥只在你电脑上，**云端会话登录不了这台 VPS**。要改服务器上的网站，需要在电脑上用 `claude remote-control` 开会话（和旧项目一样），或者另给云端配一把钥匙。
- 改动前先备份（Code Snippet 可以先停用/克隆，数据库用 `wp db export`）。
- 改完用手机和电脑两种宽度截图对比，确认没有新 bug。
