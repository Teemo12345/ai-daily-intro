#!/usr/bin/env python3
"""
V7.3 旁白生成 — 晓伊女声，语速+10%，句间短停顿（200ms），节奏紧凑
"""
import asyncio
import edge_tts
import subprocess
import os
import json

SR = 44100
TMP_DIR = "/tmp/tts-segments-v73"
OUT_DIR = "/workspace/ai-daily-intro/public/audio"
VOICE = "zh-CN-XiaoyiNeural"

segments = [
    {
        "name": "01-what",
        "sentences": [
            ("今天介绍 find-skills", "+10%"),
            ("一个帮你搜索和安装 AI 技能的工具", "+5%"),
        ],
        "pauses": [200],
    },
    {
        "name": "02-github",
        "sentences": [
            ("Vercel 公司出品", "+10%"),
            ("GitHub 上 2.5 万人收藏", "+5%"),
            ("累计安装 230 万次", "+5%"),
        ],
        "pauses": [200, 200],
    },
    {
        "name": "03-how",
        "sentences": [
            ("它怎么工作？", "+15%"),
            ("你说'帮我做个 PPT'", "+5%"),
            ("它会自动搜索，找到最合适的技能", "+5%"),
            ("一键装好，直接能用", "+10%"),
            ("不用自己找，不用记命令", "+5%"),
        ],
        "pauses": [200, 200, 200, 250],
    },
    {
        "name": "04-install",
        "sentences": [
            ("安装只需要一行命令", "+10%"),
            ("Claude Code、Cursor、Trae", "+15%"),
            ("72 种 AI 工具都能装", "+5%"),
            ("装完说人话就行", "+5%"),
        ],
        "pauses": [200, 200, 250],
    },
    {
        "name": "05-end",
        "sentences": [
            ("免费、开源", "+10%"),
            ("你最想找什么 AI 技能？", "+5%"),
            ("评论区告诉我", "+10%"),
            ("关注我，明天见", "+5%"),
        ],
        "pauses": [250, 200, 200],
    },
]

def get_duration(path):
    result = subprocess.run(
        ['ffprobe', '-v', 'quiet', '-print_format', 'json', '-show_format', path],
        capture_output=True, text=True
    )
    return float(json.loads(result.stdout)['format']['duration'])

def create_silence(duration_ms, output_path):
    subprocess.run([
        'ffmpeg', '-y', '-f', 'lavfi',
        '-i', f'anullsrc=channel_layout=mono:sample_rate={SR}',
        '-t', str(duration_ms / 1000.0),
        '-c:a', 'libmp3lame', output_path,
    ], capture_output=True)

def concat_audio(files, output_path):
    list_file = os.path.join(TMP_DIR, "concat_list.txt")
    with open(list_file, 'w') as f:
        for fp in files:
            f.write(f"file '{fp}'\n")
    subprocess.run([
        'ffmpeg', '-y', '-f', 'concat', '-safe', '0', '-i', list_file,
        '-c:a', 'libmp3lame', '-q:a', '2', output_path,
    ], capture_output=True)

async def main():
    os.makedirs(TMP_DIR, exist_ok=True)
    for seg in segments:
        name = seg["name"]
        files = []
        for i, (text, rate) in enumerate(seg["sentences"]):
            sent_path = os.path.join(TMP_DIR, f"{name}-{i}.mp3")
            comm = edge_tts.Communicate(text, VOICE, rate=rate)
            await comm.save(sent_path)
            files.append(sent_path)
            if i < len(seg["pauses"]):
                silence_path = os.path.join(TMP_DIR, f"{name}-sil-{i}.mp3")
                create_silence(seg["pauses"][i], silence_path)
                files.append(silence_path)

        output_path = os.path.join(OUT_DIR, f"narration-{name}.mp3")
        concat_audio(files, output_path)
        dur = get_duration(output_path)
        print(f"  ✅ narration-{name}.mp3 | {dur:.1f}s")

    print("\n✅ 旁白生成完成")

asyncio.run(main())
