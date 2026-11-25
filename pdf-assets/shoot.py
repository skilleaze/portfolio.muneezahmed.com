import asyncio
from playwright.async_api import async_playwright
KILL = """()=>{for(const e of [...document.querySelectorAll('body *')]){const s=getComputedStyle(e);
 if((s.position==='fixed'||s.position==='sticky')&&e.getBoundingClientRect().height>120&&!/header|nav/i.test(e.tagName+e.className)){e.style.display='none'}}
 document.documentElement.style.overflow='auto';document.body.style.overflow='auto'}"""
async def shoot(b, url, name, close=False):
    pg = await b.new_page(viewport={'width': 1440, 'height': 900}, device_scale_factor=2)
    await pg.goto(url, wait_until='networkidle', timeout=90000)
    await pg.wait_for_timeout(12000)
    if close:
        await pg.keyboard.press('Escape'); await pg.wait_for_timeout(800)
        for sel in ['[aria-label*="lose" i]', 'button:has-text("×")', 'button:has-text("✕")', '.close', '[class*="close" i]']:
            try:
                el = pg.locator(sel).first
                if await el.count() and await el.is_visible(): await el.click(timeout=2000); await pg.wait_for_timeout(800)
            except Exception: pass
        await pg.evaluate(KILL); await pg.wait_for_timeout(800)
    await pg.screenshot(path=f'pdf-assets/ws/{name}_top.png')
    h = await pg.evaluate('document.body.scrollHeight')
    for y in range(0, h, 450):
        await pg.evaluate(f'window.scrollTo(0,{y})'); await pg.wait_for_timeout(450)
    await pg.wait_for_timeout(4000)
    if close: await pg.evaluate(KILL)
    await pg.evaluate('window.scrollTo(0,0)'); await pg.wait_for_timeout(4000)
    await pg.screenshot(path=f'pdf-assets/ws/{name}_full.png', full_page=True)
    await pg.close()
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        await shoot(b, 'https://liveeze.com', 'liveeze')
        await shoot(b, 'https://adminempire.ae', 'adminempire', close=True)
        await shoot(b, 'https://whatseaze.com', 'whatseaze')
        await b.close()
asyncio.run(main())
