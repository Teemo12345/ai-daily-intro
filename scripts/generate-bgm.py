#!/usr/bin/env python3
"""
生成有节奏感的背景音乐 — Lo-Fi 电子节拍
BPM 110, 适合知识分享类短视频
"""
import numpy as np
from scipy.io import wavfile

SR = 44100
BPM = 110
BEAT = 60.0 / BPM  # 0.545s per beat
TOTAL_BEATS = 120  # ~65 seconds
N = int(SR * TOTAL_BEATS * BEAT)

track = np.zeros(N, dtype=np.float32)

t = np.arange(N) / SR

def kick(beat_start, dur=0.15):
    """Kick drum — 低频正弦波快速衰减"""
    n = int(SR * dur)
    tt = np.arange(n) / SR
    freq = 120 * np.exp(-tt * 30) + 45
    phase = 2 * np.pi * np.cumsum(freq) / SR
    env = np.exp(-tt * 8)
    s = int(beat_start * SR)
    e = min(s + n, N)
    track[s:e] += 0.5 * np.sin(phase[:e-s]) * env[:e-s]

def hihat(beat_start, dur=0.05):
    """Hi-hat — 高频白噪声短促"""
    n = int(SR * dur)
    noise = np.random.randn(n) * 0.15
    env = np.exp(-np.arange(n) / SR * 60)
    s = int(beat_start * SR)
    e = min(s + n, N)
    track[s:e] += noise[:e-s] * env[:e-s]

def snare(beat_start, dur=0.12):
    """Snare — 噪声 + 中频"""
    n = int(SR * dur)
    noise = np.random.randn(n) * 0.2
    tone = 0.1 * np.sin(2 * np.pi * 200 * np.arange(n) / SR)
    env = np.exp(-np.arange(n) / SR * 25)
    s = int(beat_start * SR)
    e = min(s + n, N)
    track[s:e] += (noise[:e-s] + tone[:e-s]) * env[:e-s]

def bass(freq, beat_start, dur=None):
    """Bass — 低频锯齿波"""
    dur = dur or BEAT * 2
    n = int(SR * dur)
    tt = np.arange(n) / SR
    wave = 0.2 * (2 * (tt * freq - np.floor(tt * freq + 0.5)))  # sawtooth
    env = np.minimum(tt * 20, 1.0) * np.exp(-tt * 2)
    s = int(beat_start * SR)
    e = min(s + n, N)
    track[s:e] += wave[:e-s] * env[:e-s]

def melody(freq, beat_start, dur=None, vol=0.12):
    """旋律 — 正弦波 + 谐波"""
    dur = dur or BEAT
    n = int(SR * dur)
    tt = np.arange(n) / SR
    wave = vol * np.sin(2 * np.pi * freq * tt)
    wave += vol * 0.3 * np.sin(2 * np.pi * freq * 2 * tt)
    env = np.minimum(tt * 30, 1.0) * np.exp(-tt * 3)
    s = int(beat_start * SR)
    e = min(s + n, N)
    track[s:e] += wave[:e-s] * env[:e-s]

# ===== 生成节拍 =====
# 鼓点模式：4拍一个循环
# 拍1: kick, 拍2: hihat, 拍3: kick+snare, 拍4: hihat
for bar in range(TOTAL_BEATS // 4):
    base = bar * 4 * BEAT
    # Beat 1: kick
    kick(base)
    hihat(base + 0.5 * BEAT)
    # Beat 2: hihat
    hihat(base + 1 * BEAT)
    hihat(base + 1.5 * BEAT)
    # Beat 3: kick + snare
    kick(base + 2 * BEAT)
    snare(base + 2 * BEAT)
    hihat(base + 2.5 * BEAT)
    # Beat 4: hihat
    hihat(base + 3 * BEAT)
    hihat(base + 3.5 * BEAT)

# ===== Bass 线 =====
# C 小调进行: Cm - Ab - Eb - Bb
bass_notes = [
    65.41, 65.41,  # C2 (2 beats)
    51.91, 51.91,  # Ab1
    77.78, 77.78,  # Eb2
    58.27, 58.27,  # Bb1
]
for bar in range(TOTAL_BEATS // 8):
    base = bar * 8 * BEAT
    for i, freq in enumerate(bass_notes):
        bass(freq, base + i * BEAT, BEAT)

# ===== 旋律 =====
# 简单的 5 音符循环，高八度
melody_notes = [
    (523.25, 1.0),  # C5
    (622.25, 0.5),  # Eb5
    (659.25, 0.5),  # E5 (blue note)
    (783.99, 1.0),  # G5
    (622.25, 1.0),  # Eb5
]
for bar in range(TOTAL_BEATS // 4):
    base = bar * 4 * BEAT
    pos = 0
    for freq, dur in melody_notes:
        melody(freq, base + pos * BEAT, dur * BEAT)
        pos += dur

# ===== 混音 =====
# 归一化
peak = np.max(np.abs(track))
if peak > 0:
    track = track * (0.7 / peak)

# 淡入淡出
fade = int(SR * 1.0)
track[:fade] *= np.linspace(0, 1, fade)
track[-fade:] *= np.linspace(1, 0, fade)

# 保存
output = "/workspace/ai-daily-intro/public/audio/bgm-rhythmic.wav"
track_int16 = (track * 32767).astype(np.int16)
wavfile.write(output, SR, track_int16)

dur = len(track) / SR
print(f"✅ 背景音乐生成完成: {output}")
print(f"   时长: {dur:.1f}s | BPM: {BPM} | 峰值: {peak:.3f}")
