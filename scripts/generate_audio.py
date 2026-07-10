#!/usr/bin/env python3
"""
AI 每日一荐 - 片头音效合成器
为奶油晨光风片头生成完整的 6 秒背景音轨
采样率 44100Hz, 立体声, WAV 格式
"""
import numpy as np
from scipy.io import wavfile

SR = 44100  # 采样率
DURATION = 6.0  # 总时长 6 秒
TOTAL = int(SR * DURATION)

# 立体声空轨
track = np.zeros((TOTAL, 2), dtype=np.float32)

def add_to_track(signal, start_sec, gain=1.0):
    """将单声道信号叠加到主轨指定时间点"""
    start = int(start_sec * SR)
    end = start + len(signal)
    if end > TOTAL:
        signal = signal[:TOTAL - start]
        end = TOTAL
    if start >= TOTAL:
        return
    # 立体声：左右声道相同
    track[start:end, 0] += signal * gain
    track[start:end, 1] += signal * gain

def envelope_adsr(length, attack=0.01, decay=0.1, sustain=0.7, release=0.3):
    """ADSR 包络"""
    a = int(length * attack)
    d = int(length * decay)
    s = int(length * (1 - attack - decay - release))
    r = int(length * release)
    s = max(s, 0)
    # 补齐
    total = a + d + s + r
    if total < length:
        s += length - total
    env = np.concatenate([
        np.linspace(0, 1, a, endpoint=False) if a > 0 else np.array([]),
        np.linspace(1, sustain, d, endpoint=False) if d > 0 else np.array([]),
        np.full(s, sustain),
        np.linspace(sustain, 0, r, endpoint=False) if r > 0 else np.array([]),
    ])
    if len(env) < length:
        env = np.pad(env, (0, length - len(env)))
    return env[:length]

def exponential_decay(length, tau=0.3):
    """指数衰减包络"""
    t = np.arange(length) / SR
    return np.exp(-t / tau)

# ============================================================
# 1. 粒子爆发音效 (0.0s - 0.8s)
#    低频 whoosh 扫频 + 白噪声冲击
# ============================================================
def make_burst():
    dur = 0.8
    n = int(SR * dur)
    t = np.arange(n) / SR

    # 频率从 80Hz 扫到 400Hz
    freq = 80 + 320 * (t / dur) ** 2
    phase = 2 * np.pi * np.cumsum(freq) / SR
    whoosh = 0.3 * np.sin(phase)

    # 白噪声冲击（前 0.15s）
    noise_len = int(SR * 0.3)
    noise = np.random.randn(noise_len) * 0.5
    noise_env = exponential_decay(noise_len, tau=0.08)
    noise = noise * noise_env

    # 低频 thump
    thump = 0.4 * np.sin(2 * np.pi * 60 * t) * exponential_decay(n, tau=0.15)

    signal = np.zeros(n)
    signal[:noise_len] += noise
    signal += whoosh * exponential_decay(n, tau=0.4)
    signal += thump

    # 整体包络
    env = np.minimum(1.0, t * 20)  # 快速 attack
    signal = signal * env
    return signal * 0.5

# ============================================================
# 2. 图标聚合上升音 (0.8s - 1.8s)
#    正弦波从 200Hz 上升到 880Hz，带泛音
# ============================================================
def make_rise():
    dur = 1.0
    n = int(SR * dur)
    t = np.arange(n) / SR

    # 基频上升
    freq = 200 * (440 / 200) ** (t / dur)  # 指数上升 200->880
    phase = 2 * np.pi * np.cumsum(freq) / SR

    # 基频 + 泛音
    sig = 0.4 * np.sin(phase)
    sig += 0.15 * np.sin(phase * 2)  # 八度
    sig += 0.08 * np.sin(phase * 3)  # 十二度

    # 渐入渐出
    env = np.minimum(t * 5, 1.0) * np.minimum((dur - t) * 3, 1.0)
    sig = sig * env

    # 末尾加一个亮闪
    flash_t = 0.85
    flash_n = int(SR * 0.15)
    flash = 0.3 * np.sin(2 * np.pi * 880 * np.arange(flash_n) / SR)
    flash *= exponential_decay(flash_n, tau=0.05)
    sig[int(flash_t * SR):int(flash_t * SR) + flash_n] += flash

    return sig * 0.4

# ============================================================
# 3. 故障打字声 (1.8s - 3.0s)
#    方波咔嗒 + bit-crush 噪声
# ============================================================
def make_glitch_type():
    dur = 1.2
    n = int(SR * dur)
    signal = np.zeros(n)

    # 打字咔嗒声 - 模拟 6 个字 "AI每日一荐"
    click_times = [0.0, 0.12, 0.24, 0.36, 0.48, 0.60]
    for ct in click_times:
        click_n = int(SR * 0.04)
        click_t = np.arange(click_n) / SR
        # 方波咔嗒
        click = 0.3 * np.sign(np.sin(2 * np.pi * 1200 * click_t))
        click *= exponential_decay(click_n, tau=0.01)
        start = int(ct * SR)
        if start + click_n <= n:
            signal[start:start + click_n] += click

    # 故障噪声 - 短促的数字噪声
    for gt in [0.02, 0.15, 0.3, 0.5]:
        glitch_n = int(SR * 0.08)
        glitch = np.random.randn(glitch_n) * 0.3
        # bit crush 效果
        glitch = np.round(glitch * 4) / 4
        glitch *= exponential_decay(glitch_n, tau=0.02)
        start = int(gt * SR)
        if start + glitch_n <= n:
            signal[start:start + glitch_n] += glitch

    # 末尾确认 ding
    confirm_n = int(SR * 0.2)
    confirm = 0.25 * np.sin(2 * np.pi * 1320 * np.arange(confirm_n) / SR)
    confirm *= exponential_decay(confirm_n, tau=0.08)
    signal[-confirm_n:] += confirm

    return signal * 0.35

# ============================================================
# 4. 日期叮声 (3.0s)
#    清脆的正弦波叮声，带泛音
# ============================================================
def make_ding():
    dur = 0.6
    n = int(SR * dur)
    t = np.arange(n) / SR

    sig = 0.4 * np.sin(2 * np.pi * 1318 * t)  # E6
    sig += 0.2 * np.sin(2 * np.pi * 2637 * t)  # E7 泛音
    sig += 0.1 * np.sin(2 * np.pi * 3956 * t)  # 更高泛音

    env = exponential_decay(n, tau=0.2)
    sig = sig * env
    return sig * 0.3

# ============================================================
# 5. 标语温暖和弦 (4.2s - 6.0s)
#    钢琴感的 C 大调和弦
# ============================================================
def make_piano_chord():
    dur = 1.8
    n = int(SR * dur)
    t = np.arange(n) / SR

    # C4 E4 G4 C5 - C 大调
    freqs = [261.63, 329.63, 392.00, 523.25]
    amps = [0.35, 0.25, 0.2, 0.15]

    sig = np.zeros(n)
    for f, a in zip(freqs, amps):
        # 钢琴包络：快速 attack + 长衰减
        env = np.minimum(t * 50, 1.0) * np.exp(-t * 2.5)
        sig += a * np.sin(2 * np.pi * f * t) * env

    # 加一点泛音模拟钢琴
    for f, a in zip(freqs, amps):
        env = np.minimum(t * 50, 1.0) * np.exp(-t * 4)
        sig += a * 0.3 * np.sin(2 * np.pi * f * 2 * t) * env

    return sig * 0.4

# ============================================================
# 6. 定格收束低音 (5.5s - 6.0s)
#    低频正弦波，缓慢收束
# ============================================================
def make_finish():
    dur = 0.6
    n = int(SR * dur)
    t = np.arange(n) / SR

    sig = 0.3 * np.sin(2 * np.pi * 130 * t)  # C3
    sig += 0.15 * np.sin(2 * np.pi * 196 * t)  # G3

    env = np.minimum(t * 10, 1.0) * np.minimum((dur - t) * 4, 1.0)
    sig = sig * env
    return sig * 0.4

# ============================================================
# 合成主轨
# ============================================================
print("合成音效...")

# 1. 粒子爆发 (0.0s)
add_to_track(make_burst(), 0.0, gain=0.7)
print("  [1/6] 粒子爆发 ✓")

# 2. 图标聚合上升 (0.8s)
add_to_track(make_rise(), 0.8, gain=0.6)
print("  [2/6] 图标聚合 ✓")

# 3. 故障打字 (1.8s)
add_to_track(make_glitch_type(), 1.8, gain=0.55)
print("  [3/6] 故障打字 ✓")

# 4. 日期叮声 (3.0s)
add_to_track(make_ding(), 3.0, gain=0.5)
print("  [4/6] 日期叮声 ✓")

# 5. 标语钢琴和弦 (4.2s)
add_to_track(make_piano_chord(), 4.2, gain=0.55)
print("  [5/6] 钢琴和弦 ✓")

# 6. 定格收束 (5.5s)
add_to_track(make_finish(), 5.5, gain=0.45)
print("  [6/6] 定格收束 ✓")

# 淡入淡出（避免爆音）
fade_n = int(SR * 0.02)
fade_in = np.linspace(0, 1, fade_n)
fade_out = np.linspace(1, 0, fade_n)
track[:fade_n] *= fade_in[:, np.newaxis]
track[-fade_n:] *= fade_out[:, np.newaxis]

# 归一化，防止削波
peak = np.max(np.abs(track))
if peak > 0.9:
    track = track * (0.9 / peak)

# 转为 16-bit PCM
track_int16 = (track * 32767).astype(np.int16)

output = "/workspace/ai-daily-intro/public/audio/intro-soundtrack.wav"
wavfile.write(output, SR, track_int16)
print(f"\n✅ 音轨已生成: {output}")
print(f"   时长: {DURATION}s | 采样率: {SR}Hz | 峰值: {peak:.3f}")
