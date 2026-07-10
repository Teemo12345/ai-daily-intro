import asyncio
import edge_tts

TEXT = """今天介绍 find-skills，一个帮你搜索和安装 AI 技能的工具。
GitHub 2.5 万人收藏，安装 230 万次。
它怎么工作？你说"帮我做个 PPT"，它自动搜到最合适的技能，一键装好，直接能用。不用自己找，不用记命令。
安装一行命令，72 种 AI 工具都能装。装完说人话就行。
免费、开源。关注我，明天见。"""

async def main():
    communicate = edge_tts.Communicate(TEXT, "zh-CN-YunxiNeural", rate="+8%")
    await communicate.save("/workspace/ai-daily-intro/public/audio/narration.mp3")
    print("✅ narration.mp3 生成完成")

asyncio.run(main())
