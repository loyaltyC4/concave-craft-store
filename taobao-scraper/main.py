import os
from fastapi import FastAPI
from pydantic import BaseModel

try:
    # CloakBrowser is a drop-in Playwright replacement with a stealth Chromium binary.
    from cloakbrowser import sync_playwright
except ImportError:
    from playwright.sync_api import sync_playwright

app = FastAPI()
STATE_PATH = os.environ.get("STATE_PATH", "/data/taobao_state.json")


@app.get("/health")
def health():
    return {"ok": True, "state_saved": os.path.exists(STATE_PATH)}


class RenderJob(BaseModel):
    url: str
    wait_ms: int = 6000
    full: bool = True


def _launch(p):
    try:
        return p.chromium.launch(headless=True, humanize=True)
    except TypeError:
        return p.chromium.launch(headless=True)


def _context(browser, use_state=True):
    kwargs = {"locale": "zh-CN", "viewport": {"width": 1280, "height": 900}}
    if use_state and os.path.exists(STATE_PATH):
        kwargs["storage_state"] = STATE_PATH
    return browser.new_context(**kwargs)


@app.post("/render")
def render(job: RenderJob):
    """Render a page with the stealth browser and return its final HTML."""
    with sync_playwright() as p:
        browser = _launch(p)
        try:
            ctx = _context(browser)
            page = ctx.new_page()
            page.goto(job.url, wait_until="domcontentloaded", timeout=90000)
            page.wait_for_timeout(job.wait_ms)
            html = page.content()
            os.makedirs(os.path.dirname(STATE_PATH), exist_ok=True)
            try:
                ctx.storage_state(path=STATE_PATH)
            except Exception:
                pass
            title = page.title()
            browser.close()
            if job.full:
                return {"ok": True, "title": title, "html": html}
            return {"ok": True, "title": title, "length": len(html)}
        finally:
            try:
                browser.close()
            except Exception:
                pass


class LoginJob(BaseModel):
    user: str
    password: str


@app.post("/login")
def login(job: LoginJob):
    """Best-effort password login. May fail if Taobao demands SMS/slider verification."""
    status = {"ok": False, "verification_required": False, "note": ""}
    with sync_playwright() as p:
        browser = _launch(p)
        try:
            ctx = _context(browser, use_state=False)
            page = ctx.new_page()
            page.goto("https://login.taobao.com/member/login.jhtml", wait_until="domcontentloaded", timeout=60000)
            page.wait_for_timeout(3000)
            # Password tab
            try:
                page.click("text=密码登录", timeout=5000)
            except Exception:
                pass
            page.fill('input[name="fm-login-id"]', job.user, timeout=15000)
            page.fill('input[name="fm-login-password"]', job.password, timeout=15000)
            page.wait_for_timeout(800)
            page.click('button[type="submit"]', timeout=15000)
            page.wait_for_timeout(8000)
            body = page.content()
            if any(k in body for k in ("验证码", "滑块", "拖动滑块", "npc ")) or page.query_selector("iframe[src*='nocaptcha']"):
                status["verification_required"] = True
                status["note"] = "Taobao is asking for slider/SMS verification. Re-run /login after completing it manually or via a session with fresh cookies."
            elif "login.taobao.com" in page.url and "member/login" in page.url:
                status["note"] = "Still on the login page; credentials may be wrong or the form changed."
            else:
                status["ok"] = True
                status["note"] = f"Logged in, landed on {page.url[:80]}"
            os.makedirs(os.path.dirname(STATE_PATH), exist_ok=True)
            try:
                ctx.storage_state(path=STATE_PATH)
                status["state_saved"] = True
            except Exception:
                status["state_saved"] = False
            browser.close()
        finally:
            try:
                browser.close()
            except Exception:
                pass
    return status
