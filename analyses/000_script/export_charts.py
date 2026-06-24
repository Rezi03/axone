#!/usr/bin/env python3
"""
export_charts.py  -- regenere les 12 exhibits du pitchbook en PNG (matplotlib).
Lit pernod_ricard_valuation_v2.xlsx (valeurs en cache, donc OUVRIR+SAUVER dans Excel avant).
Marche sur Mac/Linux/Windows. Aucune dependance Office.
pip install openpyxl matplotlib
"""
import os, statistics
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import matplotlib.font_manager as fm
from matplotlib.colors import LinearSegmentedColormap
from openpyxl import load_workbook

# ---------- chemins ----------
BASE = os.path.dirname(os.path.abspath(__file__))
XL   = os.path.abspath(os.path.join(BASE, "..", "001_pernod_ricard", "pernod_ricard_valuation_v2.xlsx"))
OUT  = os.path.abspath(os.path.join(BASE, "..", "001_pernod_ricard", "exhibits"))
os.makedirs(OUT, exist_ok=True)

# ---------- charte bulge-bracket ----------
NAVY="#1F3864"; BLUE="#2E75B6"; GREY="#A6A6A6"; LGREY="#D9D9D9"; REDX="#C00000"; GREENX="#548235"
for fam in ["Arial","Helvetica","Liberation Sans","DejaVu Sans"]:
    if any(fam.lower() in f.name.lower() for f in fm.fontManager.ttflist):
        plt.rcParams["font.family"]=fam; break
plt.rcParams.update({"font.size":10,"axes.edgecolor":GREY,"axes.linewidth":0.8,
                     "axes.spines.top":False,"axes.spines.right":False,
                     "xtick.color":"#404040","ytick.color":"#404040","figure.dpi":110})
DPI=190

wb = load_workbook(XL, data_only=True)
def val(ws,cell):
    return wb[ws][cell].value
def rng(ws, cells):
    return [wb[ws][c].value for c in cells]

def style(ax, title=None, ygrid=True):
    if title: ax.set_title(title, fontsize=12, fontweight="bold", color=NAVY, loc="left", pad=12)
    ax.tick_params(length=0)
    if ygrid:
        ax.yaxis.grid(True, color=LGREY, lw=0.7); ax.set_axisbelow(True)

def save(fig, name):
    fig.tight_layout()
    p=os.path.join(OUT, name+".png"); fig.savefig(p, dpi=DPI, bbox_inches="tight",
                   facecolor="white"); plt.close(fig); print("ok", name)

# ============ 12) SENSITIVITY HEATMAP (Gordon + Exit) ============
def c12():
    import numpy as np
    g=[val("Sensitivity",c+"4") for c in "CDEFG"]
    wG=[val("Sensitivity","B"+str(r)) for r in range(5,12)]
    G=np.array([[val("Sensitivity",c+str(r)) for c in "CDEFG"] for r in range(5,12)],dtype=float)
    m=[val("Sensitivity",c+"14") for c in "CDEFG"]
    wE=[val("Sensitivity","B"+str(r)) for r in range(15,22)]
    E=np.array([[val("Sensitivity",c+str(r)) for c in "CDEFG"] for r in range(15,22)],dtype=float)
    cmap=LinearSegmentedColormap.from_list("rg",["#F8696B","#FFFFFF","#63BE7B"])
    fig,axs=plt.subplots(1,2,figsize=(11,4.4))
    for ax,M,xs,ys,xl,xfmt,ttl in [
        (axs[0],G,g,wG,"Perpetuity growth g","{:.1%}","Gordon growth"),
        (axs[1],E,m,wE,"Exit EV/EBITDA","{:.0f}x","Exit multiple")]:
        im=ax.imshow(M,cmap=cmap,aspect="auto")
        ax.set_xticks(range(len(xs))); ax.set_xticklabels([xfmt.format(x) for x in xs],fontsize=8)
        ax.set_yticks(range(len(ys))); ax.set_yticklabels([f"{y:.1%}" for y in ys],fontsize=8)
        ax.set_xlabel(xl,fontsize=9); ax.set_ylabel("WACC",fontsize=9)
        ax.set_title(ttl,fontsize=11,fontweight="bold",color=NAVY,loc="left",pad=8)
        for i in range(M.shape[0]):
            for j in range(M.shape[1]):
                ax.text(j,i,f"{M[i,j]:.0f}",ha="center",va="center",fontsize=7,color="#222222")
        for sp in ax.spines.values(): sp.set_visible(False)
        ax.tick_params(length=0)
    save(fig,"chart_12_heatmap")

for f in [c12]:
    f()
print("DONE ->", OUT)