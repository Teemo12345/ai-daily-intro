#!/usr/bin/env python3
"""
AI 每日一荐 - 片头音效合成器 V2
生成 4 种冲击力风格供选择：品牌Jingle / 大片预告 / 电子节拍 / 播客电台
"""
import numpy as np
from scipy.io import wavfile

SR = 44100
DURATION = 6.0
TOTAL = int(SR * DURATION)

# ============ 波形 & 工具 ============
def sine(f, t): return np.sin(2*np.pi*f*t)
def saw(f, t): return 2*(t*f - np.floor(t*f + 0.5))
def square(f, t): return np.sign(np.sin(2*np.pi*f*t))
def triangle(f, t): return 2*np.abs(2*(t*f - np.floor(t*f + 0.5))) - 1

def exp_decay(n, tau=0.3):
    return np.exp(-np.arange(n)/SR/tau)

def adsr(n, a=0.005, d=0.1, s=0.7, r=0.2):
    """ADSR 包络，参数为比例"""
    na,nd,nr = int(n*a),int(n*d),int(n*r)
    ns = n - na - nd - nr
    if ns < 0: ns = 0
    env = np.concatenate([
        np.linspace(0,1,na) if na>0 else [],
        np.linspace(1,s,nd) if nd>0 else [],
        np.full(ns,s),
        np.linspace(s,0,nr) if nr>0 else [],
    ])
    if len(env) < n: env = np.pad(env,(0,n-len(env)))
    return env[:n]

def soft_clip(x, drive=1.0):
    """软削波，增加温暖失真"""
    return np.tanh(x * drive) / np.tanh(drive)

def make_stereo(mono):
    return np.column_stack([mono, mono])

def normalize(track, peak=0.95):
    """归一化到指定峰值"""
    m = np.max(np.abs(track))
    if m > 0: track = track * (peak / m)
    return track

def save(track, name):
    track = normalize(track, 0.95)
    # 淡入淡出防爆音
    fade = int(SR * 0.005)
    track[:fade] *= np.linspace(0,1,fade)[:,None]
    track[-fade:] *= np.linspace(1,0,fade)[:,None]
    track16 = (track * 32767).astype(np.int16)
    path = f"/workspace/ai-daily-intro/public/audio/{name}.wav"
    wavfile.write(path, SR, track16)
    print(f"  ✅ {name}.wav | 峰值 {np.max(np.abs(track)):.3f}")
    return path

# ============ 1. 品牌 Jingle 风 ============
# 标志性 4 音符上升琶音 C5-E5-G5-C6 + 明亮合成音色
def make_jingle():
    print("合成 [品牌 Jingle 风]...")
    track = np.zeros((TOTAL, 2), dtype=np.float32)
    
    def add(sig, t, g=1.0):
        s = int(t*SR); e = min(s+len(sig), TOTAL)
        if s < TOTAL: track[s:e] += (sig[:e-s])[:,None] * g
    
    # --- 粒子爆发 whoosh (0.0s) ---
    n = int(SR*0.4); t = np.arange(n)/SR
    freq = 100 + 300*(t/0.4)**2
    phase = 2*np.pi*np.cumsum(freq)/SR
    whoosh = 0.4*saw(1, t)  # 噪声基底
    whoosh = np.random.randn(n)*0.3 * exp_decay(n, 0.1)
    whoosh += 0.3*np.sin(phase) * exp_decay(n, 0.2)
    add(whoosh, 0.0, 0.7)
    
    # --- 4 音符 jingle C5-E5-G5-C6 ---
    notes = [(523.25, 0.15), (659.25, 0.15), (783.99, 0.15), (1046.50, 0.5)]
    times = [0.3, 0.8, 1.3, 1.9]
    for (f, dur), start in zip(notes, times):
        n = int(SR*dur); t = np.arange(n)/SR
        # sawtooth 基音 + 谐波，明亮品牌音色
        sig = 0.35*saw(f, t) + 0.2*sine(f*2, t) + 0.1*sine(f*3, t) + 0.08*sine(f*4, t)
        env = adsr(n, 0.003, 0.05, 0.6, 0.3 if dur < 0.3 else 0.6)
        sig = sig * env
        # 加一点失真让音色更亮
        sig = soft_clip(sig, 1.5)
        add(sig, start, 0.6)
    
    # --- 打字声 (1.8-2.8s) ---
    for ct in [1.85, 1.97, 2.09, 2.21, 2.33, 2.45]:
        cn = int(SR*0.03); ct_arr = np.arange(cn)/SR
        click = 0.4*square(1500, ct_arr) * exp_decay(cn, 0.008)
        add(click, ct, 0.3)
    
    # --- 日期 ding (3.0s) ---
    n = int(SR*0.5); t = np.arange(n)/SR
    ding = 0.4*sine(2093, t) + 0.2*sine(4186, t)  # C7 + C8
    ding *= exp_decay(n, 0.15)
    add(ding, 3.0, 0.5)
    
    # --- 标语 C6 和弦延音 (4.2s) ---
    n = int(SR*1.8); t = np.arange(n)/SR
    chord = 0.2*saw(1046.50, t) + 0.15*saw(1318.51, t) + 0.12*saw(1567.98, t)  # C6-E6-G6
    chord += 0.1*sine(2093, t)  # 高频亮闪
    env = np.minimum(t*8, 1.0) * np.exp(-t*1.5)
    chord = chord * env
    add(chord, 4.2, 0.5)
    
    # --- 收束 (5.5s) ---
    n = int(SR*0.5); t = np.arange(n)/SR
    end = 0.3*sine(523.25, t) * np.minimum(t*15,1.0) * np.minimum((0.5-t)*5,1.0)
    add(end, 5.5, 0.4)
    
    return save(track, "soundtrack-jingle")

# ============ 2. 大片预告风 ============
# 低频 braam 轰鸣 + riser + 808 大鼓 + 金属冲击
def make_cinematic():
    print("合成 [大片预告风]...")
    track = np.zeros((TOTAL, 2), dtype=np.float32)
    
    def add(sig, t, g=1.0):
        s = int(t*SR); e = min(s+len(sig), TOTAL)
        if s < TOTAL: track[s:e] += (sig[:e-s])[:,None] * g
    
    # --- Riser 上升扫频 (0.0-1.0s) ---
    n = int(SR*1.0); t = np.arange(n)/SR
    # 噪声 riser
    noise = np.random.randn(n) * np.linspace(0.05, 0.5, n)
    # 频率扫描 200->2000
    freq = 200 * (10 ** (t/1.0))
    phase = 2*np.pi*np.cumsum(freq)/SR
    sweep = 0.3*saw(1, t)  # placeholder
    sweep = 0.35*np.sin(phase) * np.linspace(0.1, 1.0, n)
    riser = noise + sweep
    add(riser, 0.0, 0.5)
    
    # --- 808 大鼓 (0.0s, 0.8s, 1.8s, 4.2s) ---
    for bt in [0.0, 0.8, 1.8, 4.2]:
        n = int(SR*0.5); t = np.arange(n)/SR
        # 频率从 150 快速降到 40
        f = 150 * np.exp(-t*30) + 40
        phase = 2*np.pi*np.cumsum(f)/SR
        kick = 0.6*np.sin(phase) * exp_decay(n, 0.15)
        kick = soft_clip(kick, 2.0)
        add(kick, bt, 0.8)
    
    # --- BRAAM 低频轰鸣 (0.8-5.5s) ---
    n = int(SR*5.0); t = np.arange(n)/SR
    braam = 0.5*saw(55, t) + 0.3*saw(110, t) + 0.15*saw(165, t)
    # 长包络
    env = np.minimum(t*2, 1.0) * np.minimum((5.0-t)*1.5, 1.0)
    # 中间加强（4.2s 高潮）
    swell = 1.0 + 0.5*np.exp(-((t-3.4)**2)/0.5)
    braam = braam * env * swell
    braam = soft_clip(braam, 1.8)
    add(braam, 0.8, 0.6)
    
    # --- 金属冲击 (1.8s, 3.0s) ---
    for mt in [1.8, 3.0]:
        n = int(SR*0.3); t = np.arange(n)/SR
        metal = 0.4*sine(3000, t) + 0.3*sine(4500, t) + 0.2*np.random.randn(n)
        metal *= exp_decay(n, 0.05)
        add(metal, mt, 0.4)
    
    # --- 打字声 (1.8-2.8s) ---
    for ct in [1.85, 1.97, 2.09, 2.21, 2.33, 2.45]:
        cn = int(SR*0.025)
        click = 0.3*square(2000, np.arange(cn)/SR) * exp_decay(cn, 0.006)
        add(click, ct, 0.25)
    
    # --- 收束 sub-bass (5.5s) ---
    n = int(SR*0.5); t = np.arange(n)/SR
    sub = 0.5*np.sin(2*np.pi*35*t) * np.minimum(t*10,1.0) * np.exp(-t*3)
    sub = soft_clip(sub, 1.5)
    add(sub, 5.5, 0.7)
    
    return save(track, "soundtrack-cinematic")

# ============ 3. 电子节拍风 ============
# EDM 140bpm kick + hi-hat + sawtooth bass + 上升 synth riff
def make_edm():
    print("合成 [电子节拍风]...")
    track = np.zeros((TOTAL, 2), dtype=np.float32)
    
    def add(sig, t, g=1.0):
        s = int(t*SR); e = min(s+len(sig), TOTAL)
        if s < TOTAL: track[s:e] += (sig[:e-s])[:,None] * g
    
    BPM = 140
    beat = 60.0/BPM  # 0.4286s per beat
    
    # --- Kick drum (每拍) ---
    def kick(n=None):
        n = n or int(SR*0.15); t = np.arange(n)/SR
        f = 120*np.exp(-t*25) + 45
        phase = 2*np.pi*np.cumsum(f)/SR
        return 0.6*np.sin(phase) * exp_decay(n, 0.08)
    
    # --- Hi-hat (每半拍) ---
    def hihat():
        n = int(SR*0.05)
        return 0.2*np.random.randn(n) * exp_decay(n, 0.015)
    
    # --- Snare (第2,4拍) ---
    def snare():
        n = int(SR*0.1)
        return (0.3*np.random.randn(n) + 0.2*triangle(200, np.arange(n)/SR)) * exp_decay(n, 0.04)
    
    # 0-4.2s 全程节拍
    t = 0.0
    beat_idx = 0
    while t < 5.5:
        add(kick(), t, 0.7)  # kick 每拍
        if beat_idx % 2 == 1:
            add(snare(), t, 0.4)  # snare 第2,4拍
        add(hihat(), t + beat/2, 0.3)  # hihat 半拍
        t += beat
        beat_idx += 1
    
    # --- Riser (0.0-0.8s) ---
    n = int(SR*0.8); tt = np.arange(n)/SR
    freq = 100 * (20 ** (tt/0.8))
    phase = 2*np.pi*np.cumsum(freq)/SR
    riser = 0.3*np.sin(phase) * np.linspace(0.1, 1.0, n)
    riser += 0.2*np.random.randn(n) * np.linspace(0.05, 0.3, n)
    add(riser, 0.0, 0.4)
    
    # --- Sawtooth bass (0.8-4.2s) ---
    bass_notes = [55, 55, 73.42, 55]  # A1, A1, D2, A1
    for i, f in enumerate(bass_notes):
        n = int(SR*beat*2); t = np.arange(n)/SR
        bass = 0.35*saw(f, t) + 0.15*saw(f*2, t)
        env = adsr(n, 0.003, 0.05, 0.5, 0.15)
        add(bass*env, 0.8 + i*beat*2, 0.5)
    
    # --- 上升 synth riff (1.8-3.0s) ---
    riff_notes = [440, 554.37, 659.25, 880]  # A4, C#5, E5, A5
    for i, f in enumerate(riff_notes):
        n = int(SR*0.2); t = np.arange(n)/SR
        synth = 0.25*saw(f, t) + 0.15*saw(f*2, t) + 0.1*sine(f*3, t)
        synth *= exp_decay(n, 0.08)
        synth = soft_clip(synth, 1.3)
        add(synth, 1.8 + i*0.25, 0.45)
    
    # --- 日期 synth hit (3.0s) ---
    n = int(SR*0.3); t = np.arange(n)/SR
    hit = 0.3*saw(1046.50, t) + 0.2*saw(1567.98, t)
    hit *= exp_decay(n, 0.1)
    add(hit, 3.0, 0.5)
    
    # --- 标语 melody (4.2-5.5s) ---
    melody = [659.25, 783.99, 1046.50, 1318.51]  # E5-G5-C6-E6
    for i, f in enumerate(melody):
        n = int(SR*0.25); t = np.arange(n)/SR
        note = 0.25*saw(f, t) + 0.15*saw(f*2, t) + 0.1*sine(f*3, t)
        note *= exp_decay(n, 0.1)
        note = soft_clip(note, 1.3)
        add(note, 4.2 + i*0.2, 0.4)
    
    # --- 收束大 hit (5.5s) ---
    add(kick(int(SR*0.4)), 5.5, 0.8)
    n = int(SR*0.4); t = np.arange(n)/SR
    final = 0.3*saw(110, t) * exp_decay(n, 0.2)
    add(final, 5.5, 0.5)
    
    return save(track, "soundtrack-edm")

# ============ 4. 播客电台风 ============
# 马林巴/钟琴明快旋律 + 轻鼓拍 + 温暖和弦
def make_podcast():
    print("合成 [播客电台风]...")
    track = np.zeros((TOTAL, 2), dtype=np.float32)
    
    def add(sig, t, g=1.0):
        s = int(t*SR); e = min(s+len(sig), TOTAL)
        if s < TOTAL: track[s:e] += (sig[:e-s])[:,None] * g
    
    # 马林巴音色：正弦+谐波，快速衰减
    def marimba(f, dur):
        n = int(SR*dur); t = np.arange(n)/SR
        sig = 0.5*sine(f, t) + 0.15*sine(f*2, t) + 0.08*sine(f*4, t)
        env = np.minimum(t*30, 1.0) * np.exp(-t*4)
        return sig * env
    
    # --- 粒子爆发 whoosh (0.0s) ---
    n = int(SR*0.3); t = np.arange(n)/SR
    whoosh = 0.3*np.random.randn(n) * np.linspace(0.3, 0, n)
    whoosh += 0.2*sine(200+300*t/0.3, t) * exp_decay(n, 0.1)
    add(whoosh, 0.0, 0.5)
    
    # --- 明快旋律 G4-C5-E5-G5-E5-C5 ---
    melody = [(392.00, 0.0, 0.3), (523.25, 0.35, 0.3), (659.25, 0.7, 0.3),
              (783.99, 1.1, 0.35), (659.25, 1.55, 0.2), (523.25, 1.8, 0.15)]
    for f, start, dur in melody:
        add(marimba(f, dur), start, 0.55)
    
    # --- 打字声 (1.8-2.8s) ---
    for ct in [1.85, 1.97, 2.09, 2.21, 2.33, 2.45]:
        cn = int(SR*0.025)
        click = 0.25*sine(1800, np.arange(cn)/SR) * exp_decay(cn, 0.007)
        add(click, ct, 0.25)
    
    # --- 轻鼓拍 (0.8s 开始，每拍) ---
    BPM = 100
    beat = 60.0/BPM
    t = 0.8
    while t < 5.5:
        n = int(SR*0.08); tt = np.arange(n)/SR
        # 轻 kick
        kk = 0.2*sine(80*np.exp(-tt*20)+40, tt) * exp_decay(n, 0.05)
        add(kk, t, 0.4)
        # 轻 snare 在 2,4 拍
        if int((t-0.8)/beat) % 2 == 1:
            sn = 0.1*np.random.randn(int(SR*0.05)) * exp_decay(int(SR*0.05), 0.02)
            add(sn, t, 0.25)
        t += beat
    
    # --- 日期钟琴 ding (3.0s) ---
    n = int(SR*0.6); t = np.arange(n)/SR
    ding = 0.4*sine(1568, t) + 0.2*sine(3136, t) + 0.1*sine(4704, t)
    ding *= exp_decay(n, 0.2)
    add(ding, 3.0, 0.5)
    
    # --- 标语温暖和弦 (4.2s) ---
    n = int(SR*1.8); t = np.arange(n)/SR
    # C 大调 + 马林巴音色
    chord = np.zeros(n)
    for f in [523.25, 659.25, 783.99, 1046.50]:
        chord += 0.15*sine(f, t) + 0.05*sine(f*2, t)
    env = np.minimum(t*5, 1.0) * np.exp(-t*1.2)
    add(chord*env, 4.2, 0.5)
    
    # --- 标语上的旋律装饰 (4.4-5.4s) ---
    deco = [(1046.50, 4.4, 0.15), (1318.51, 4.6, 0.15), (1567.98, 4.8, 0.2)]
    for f, start, dur in deco:
        add(marimba(f, dur), start, 0.4)
    
    # --- 收束 (5.5s) ---
    n = int(SR*0.5); t = np.arange(n)/SR
    end = 0.3*sine(523.25, t) + 0.15*sine(659.25, t)
    end *= np.minimum(t*12, 1.0) * np.minimum((0.5-t)*6, 1.0)
    add(end, 5.5, 0.4)
    
    return save(track, "soundtrack-podcast")

# ============ 主程序 ============
if __name__ == "__main__":
    print("=" * 50)
    print("AI 每日一荐 - 音效合成器 V2")
    print("生成 4 种冲击力风格...\n")
    
    make_jingle()
    make_cinematic()
    make_edm()
    make_podcast()
    
    print("\n✅ 全部完成！4 个音轨已生成到 public/audio/")
