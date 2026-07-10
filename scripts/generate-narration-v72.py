#!/usr/bin/env python3
"""
V7.2 旁白生成 — 晓伊女声 + 句间停顿 = 节奏感
每句话单独生成，用 ffmpeg 精确控制句间停顿
"""
import asyncio
import edge_tts
import subprocess
import os
import numpy as np
from scipy.io import wavfile

SR = 44100

# 5 段旁白，每段拆成句子，控制句间停顿
segments = [
    {
        "name": "01-what",
        "sentences": [
            ("今天介绍 find-skills", "+0%"),
            ("一个帮你搜索和安装 AI 技能的工具", "-5%"),
        ],
        "pauses": [400],  # 句间停顿 ms
    },
    {
        "name": "02-github",
        "sentences": [
            ("Vercel 公司出品", "+0%"),
            ("GitHub 上 2.5 万人收藏", "-5%"),
            ("累计安装 230 万次", "-5%"),
        ],
        "pauses": [300, 350],
    },
    {
        "name": "03-how",
        "sentences": [
            ("它怎么工作？", "+5%"),
            ("你说'帮我做个 PPT'", "-5%"),
            ("它会自动搜索，找到最合适的技能", "-5%"),
            ("一键装好，直接能用", "+0%"),
            ("不用自己找，不用记命令", "-5%"),
        ],
        "pauses": [400, 300, 350, 400],
    },
    {
        "name": "04-install",
        "sentences": [
            ("安装只需要一行命令", "+0%"),
            ("Claude Code、Cursor、Trae", "+5%"),
            ("72 种 AI 工具都能装", "-5%"),
            ("装完说人话就行", "-5%"),
        ],
        "pauses": [350, 300, 400],
    },
    {
        "name": "05-end",
        "sentences": [
            ("免费、开源", "+0%"),
            ("你最想找什么 AI 技能？", "-5%"),
            ("评论区告诉我", "+0%"),
            ("关注我，明天见", "-5%"),
        ],
        "pauses": [400, 400, 350],
    },
]

VOICE = "zh-CN-XiaoyiNeural"  # 晓伊，活泼女声
OUT_DIR = "/workspace/ai-daily-intro/public/audio"
TMP_DIR = "/tmp/tts-segments"

async def generate_sentence(text, rate, output_path):
    """生成单句语音"""
    communicate = edge_tts.Communicate(text, VOICE, rate=rate)
    await communicate.save(output_path)

def get_duration(path):
    """获取音频时长"""
    result = subprocess.run(
        ['ffprobe', '-v', 'quiet', '-print_format', 'json', '-show_format', path],
        capture_output=True, text=True
    )
    import json
    info = json.loads(result.stdout)
    return float(info['format']['duration'])

def create_silence(duration_ms, output_path):
    """生成指定时长的静音"""
    duration = duration_ms / 1000.0
    cmd = [
        'ffmpeg', '-y', '-f', 'lavfi',
        '-i', f'anullsrc=channel_layout=mono:sample_rate={SR}',
        '-t', str(duration),
        '-c:a', 'libmp3lame', output_path,
    ]
    subprocess.run(cmd, capture_output=True)

def concat_audio(files, output_path):
    """拼接音频文件"""
    list_file = os.path.join(TMP_DIR, "concat_list.txt")
    with open(list_file, 'w') as f:
        for fp in files:
            f.write(f"file '{fp}'\n")
    cmd = ['ffmpeg', '-y', '-f', 'concat', '-safe', '0', '-i', list_file,
           '-c:a', 'libmp3lame', '-q:a', '2', output_path]
    subprocess.run(cmd, capture_output=True)

async def main():
    os.makedirs(TMP_DIR, exist_ok=True)

    for seg in segments:
        name = seg["name"]
        sentences = seg["sentences"]
        pauses = seg["pauses"]

        print(f"生成 {name}...", end=" ")

        files = []
        for i, (text, rate) in enumerate(sentences):
            sent_path = os.path.join(TMP_DIR, f"{name}-{i}.mp3")
            await generate_sentence(text, rate, sent_path)
            files.append(sent_path)

            # 句间停顿
            if i < len(pauses):
                silence_path = os.path.join(TMP_DIR, f"{name}-silence-{i}.mp3")
                create_silence(pauses[i], silence_path)
                files.append(silence_path)

        # 拼接
        output_path = os.path.join(OUT_DIR, f"narration-{name}.mp3")
        concat_audio(files, output_path)

        dur = get_duration(output_path)
        print(f"{dur:.1f}s ✅")

    print("\n✅ 全部旁白生成完成")

asyncio.run(main())
