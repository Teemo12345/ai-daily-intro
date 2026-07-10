const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath: '/usr/bin/chromium',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu', '--disable-dev-shm-usage'],
  });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  });
  const page = await context.newPage();

  await page.goto('https://github.com/vercel-labs/skills', {
    waitUntil: 'commit',
    timeout: 30000,
  });
  try {
    await page.waitForSelector('h1 bdi', { timeout: 20000 });
  } catch (e) {}
  await page.waitForTimeout(5000);

  // 1. 顶部截图（已有）
  await page.screenshot({
    path: '/workspace/ai-daily-intro/public/images/github-top.png',
    type: 'png',
  });
  console.log('  ✅ github-top.png');

  // 2. 滚动到 README 安装命令区域
  await page.evaluate(() => {
    // 找到 "Install a Skill" 标题
    const headings = Array.from(document.querySelectorAll('h1, h2, h3'));
    const installHeading = headings.find(h => h.textContent && h.textContent.includes('Install a Skill'));
    if (installHeading) {
      installHeading.scrollIntoView({ block: 'start' });
    }
  });
  await page.waitForTimeout(2000);
  await page.screenshot({
    path: '/workspace/ai-daily-intro/public/images/github-install.png',
    type: 'png',
  });
  console.log('  ✅ github-install.png (Install 区域)');

  // 3. 滚动到 Supported Agents 表格
  await page.evaluate(() => {
    const headings = Array.from(document.querySelectorAll('h1, h2, h3'));
    const agentsHeading = headings.find(h => h.textContent && h.textContent.includes('Supported Agents'));
    if (agentsHeading) {
      agentsHeading.scrollIntoView({ block: 'start' });
    }
  });
  await page.waitForTimeout(2000);
  await page.screenshot({
    path: '/workspace/ai-daily-intro/public/images/github-agents.png',
    type: 'png',
  });
  console.log('  ✅ github-agents.png (Agent 列表)');

  // 4. 全页长截图
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(1000);
  await page.screenshot({
    path: '/workspace/ai-daily-intro/public/images/github-full.png',
    type: 'png',
    fullPage: true,
  });
  console.log('  ✅ github-full.png');

  // 5. 只截 Stars 按钮特写
  const starsButton = page.locator('a[id*="repo-stars-counter"], a:has-text("Star")').first();
  if (starsButton) {
    try {
      const box = await starsButton.boundingBox();
      if (box) {
        await page.screenshot({
          path: '/workspace/ai-daily-intro/public/images/github-stars-btn.png',
          type: 'png',
          clip: {
            x: Math.max(0, box.x - 20),
            y: Math.max(0, box.y - 20),
            width: box.width + 40,
            height: box.height + 40,
          },
        });
        console.log('  ✅ github-stars-btn.png');
      }
    } catch (e) {
      console.log('  ⚠️  Stars 按钮截图失败:', e.message);
    }
  }

  await browser.close();
  console.log('✅ 全部完成');
})();
