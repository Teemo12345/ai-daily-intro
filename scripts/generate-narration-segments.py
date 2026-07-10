import asyncio
import edge_tts
import subprocess
import json

# 5 段旁白，对应 5 个场景
segments = [
    ("01-what", "今天介绍 find-skills，一个帮你搜索和安装 AI 技能的工具。"),
    ("02-github", "Vercel 公司出品，GitHub 上 2.5 万人收藏，累计安装 230 万次。"),
    ("03-how", "它怎么工作？你说'帮我做个 PPT'，它会自动搜索，找到最合适的技能，一键装好，直接能用。不用自己找，不用记命令。"),
    ("04-install", "安装只需要一行命令。Claude Code、Cursor、Trae，72 种 AI 工具都能装。装完说人话就行。"),
    ("05-end", "免费、开源。你最想找什么 AI 技能？评论区告诉我。关注我，明天见。"),
]

async def main():
    durations = {}
    for name, text in segments:
        path = f"/workspace/ai-daily-intro/public/audio/narration-{name}.mp3"
        # rate=-5% 稍慢，更自然
        communicate = edge_tts.Communicate(text, "zh-CN-YunxiNeural", rate="-5%")
        await communicate.save(path)

        # 获取时长
        result = subprocess.run(
            ['ffprobe', '-v', 'quiet', '-print_format', 'json', '-show_format', path],
            capture_output=True, text=True
        )
        info = json.loads(result.stdout)
        dur = float(info['format']['duration'])
        durations[name] = dur
        print(f"  ✅ narration-{name}.mp3 | {dur:.1f}s | {text[:30]}...")

    print(f"\n总时长: {sum(durations.values()):.1f}s")
    print("+ 片头 4s =", sum(durations.values()) + 4, "s")

    # 打印每段帧数（30fps）
    print("\n场景帧数分配:")
    for name, dur in durations.items():
        frames = int(dur * 30) + 15  # 加15帧（0.5s）缓冲
        print(f"  {name}: {dur:.1f}s → {frames} 帧")

asyncio.run(main())
