import asyncio
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        for name, vp in [('desk', {'width': 1440, 'height': 900}), ('mob', {'width': 390, 'height': 844})]:
            pg = await b.new_page(viewport=vp, device_scale_factor=2)
            await pg.goto('https://whatseaze.com', wait_until='networkidle', timeout=60000)
            for t in (4, 10, 18, 28):
                await pg.wait_for_timeout((t - (0 if t == 4 else prev)) * 1000) if False else None
            waited = 0
            for t in (4, 10, 18, 28):
                await pg.wait_for_timeout((t - waited) * 1000); waited = t
                await pg.screenshot(path=f'pdf-assets/wz/{name}_{t:02d}.png')
            # full page after scrolling through to trigger animations
            h = await pg.evaluate('document.body.scrollHeight')
            for y in range(0, h, 400):
                await pg.evaluate(f'window.scrollTo(0,{y})'); await pg.wait_for_timeout(500)
            await pg.wait_for_timeout(6000)
            await pg.evaluate('window.scrollTo(0,0)'); await pg.wait_for_timeout(8000)
            await pg.screenshot(path=f'pdf-assets/wz/{name}_full.png', full_page=True)
            await pg.screenshot(path=f'pdf-assets/wz/{name}_top_after.png')
        await b.close()
asyncio.run(main())
