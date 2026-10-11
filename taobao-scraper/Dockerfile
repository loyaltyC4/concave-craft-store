FROM mcr.microsoft.com/playwright/python:v1.49.0-jammy

WORKDIR /app
RUN pip install --no-cache-dir fastapi "uvicorn[standard]" cloakbrowser

COPY main.py /app/main.py

ENV STATE_PATH=/data/taobao_state.json
VOLUME /data
EXPOSE 8000

# Pre-pull the CloakBrowser Chromium binary at build time so boot is fast.
RUN python3 -c "from cloakbrowser import sync_playwright" || true

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
