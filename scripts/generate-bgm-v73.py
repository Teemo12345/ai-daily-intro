#!/usr/bin/env python3
"""
V7.3 背景音乐 — 更强节奏感的 Lo-Fi 电子节拍
BPM 115, 鼓点更突出, bass 更重, 旋律更抓耳
"""
import numpy as np
from scipy.io import wavfile

SR = 44100
BPM = 115
BEAT = 60.0 / BPM  # 0.522s
TOTAL_BEATS = 130  # ~68 seconds
N = int(SR * TOTAL_BEATS * BEAT)

track = np.zeros(N, dtype=np.float32)

def kick(t_start, dur=0.15, vol=0.6):
    n = int(SR * dur)
    tt = np.arange(n) / SR
    freq = 130 * np.exp(-tt * 35) + 48
    phase = 2 * np.pi * np.cumsum(freq) / SR
    env = np.exp(-tt * 7)
    s = int(t_start * SR); e = min(s + n, N)
    track[s:e] += vol * np.sin(phase[:e-s]) * env[:e-s]

def snare(t_start, dur=0.12, vol=0.35):
    n = int(SR * dur)
    noise = np.random.randn(n) * 0.5
    tone = 0.15 * np.sin(2 * np.pi * 220 * np.arange(n) / SR)
    env = np.exp(-np.arange(n) / SR * 22)
    s = int(t_start * SR); e = min(s + n, N)
    track[s:e] += vol * (noise[:e-s] + tone[:e-s]) * env[:e-s]

def hihat(t_start, dur=0.04, vol=0.18):
    n = int(SR * dur)
    noise = np.random.randn(n) * 0.3
    env = np.exp(-np.arange(n) / SR * 80)
    s = int(t_start * SR); e = min(s + n, N)
    track[s:e] += vol * noise[:e-s] * env[:e-s]

def bass(freq, t_start, dur, vol=0.28):
    n = int(SR * dur)
    tt = np.arange(n) / SR
    wave = vol * (2 * (tt * freq - np.floor(tt * freq + 0.5)))
    # 低通滤波感（取前 3 次谐波）
    wave = vol * np.sin(2 * np.pi * freq * tt)
    wave += vol * 0.4 * np.sin(2 * np.pi * freq * 2 * tt)
    env = np.minimum(tt * 25, 1.0) * np.exp(-tt * 1.8)
    s = int(t_start * SR); e = min(s + n, N)
    track[s:e] += wave[:e-s] * env[:e-s]

def melody(freq, t_start, dur, vol=0.14):
    n = int(SR * dur)
    tt = np.arange(n) / SR
    wave = vol * np.sin(2 * np.pi * freq * tt)
    wave += vol * 0.4 * np.sin(2 * np.pi * freq * 2 * tt)
    wave += vol * 0.15 * np.sin(2 * np.pi * freq * 3 * tt)
    env = np.minimum(tt * 40, 1.0) * np.exp(-tt * 2.5)
    s = int(t_start * SR); e = min(s + n, N)
    track[s:e] += wave[:e-s] * env[:e-s]

# ===== 鼓点（每个 bar 4 拍）=====
for bar in range(TOTAL_BEATS // 4):
    b = bar * 4 * BEAT
    # Beat 1: kick + hihat
    kick(b)
    hihat(b + 0.5 * BEAT)
    # Beat 2: snare + hihat
    hihat(b + 1 * BEAT, vol=0.12)
    snare(b + 1 * BEAT)
    hihat(b + 1.5 * BEAT)
    # Beat 3: kick + hihat
    kick(b + 2 * BEAT)
    hihat(b + 2.5 * BEAT)
    # Beat 4: snare + hihat
    hihat(b + 3 * BEAT, vol=0.12)
    snare(b + 3 * BEAT)
    hihat(b + 3.5 * BEAT)
    # 每个 bar 末尾加一个 ghost kick
    if bar % 2 == 1:
        kick(b + 3.75 * BEAT, vol=0.3)

# ===== Bass 线（Cm - Ab - Eb - Bb 循环）=====
bass_pattern = [
    (65.41, 2), (51.91, 2),  # C2 x2, Ab1 x2
    (77.78, 2), (58.27, 2),  # Eb2 x2, Bb1 x2
]
for bar in range(TOTAL_BEATS // 8):
    b = bar * 8 * BEAT
    pos = 0
    for freq, beats in bass_pattern:
        bass(freq, b + pos * BEAT, beats * BEAT)
        pos += beats

# ===== 旋律（更抓耳的 5 音符循环）=====
# Cm 音阶: C, D, Eb, F, G, Ab, Bb
melody_pattern = [
    (523.25, 0.5),   # C5
    (622.25, 0.5),   # Eb5
    (659.25, 0.5),   # E5 (blue note)
    (783.99, 1.0),   # G5
    (622.25, 0.5),   # Eb5
    (523.25, 1.0),   # C5
]
for bar in range(TOTAL_BEATS // 4):
    b = bar * 4 * BEAT
    pos = 0
    for freq, dur in melody_pattern:
        melody(freq, b + pos * BEAT, dur * BEAT)
        pos += dur

# ===== 混音 =====
peak = np.max(np.abs(track))
if peak > 0:
    track = track * (0.75 / peak)

# 淡入淡出
fade = int(SR * 0.8)
track[:fade] *= np.linspace(0, 1, fade)
track[-fade:] *= np.linspace(1, 0, fade)

output = "/workspace/ai-daily-intro/public/audio/bgm-rhythmic.wav"
wavfile.write(output, SR, (track * 32767).astype(np.int16))
print(f"✅ 背景音乐: {len(track)/SR:.1f}s | BPM {BPM} | 峰值 {peak:.3f}")
