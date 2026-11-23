"""Margin guard. Run before pushing price/catalogue changes:  python3 scripts/margin_check.py
Cost model (ESTIMATES, replace with real costs when known): item = 0.31 x pre-reset price (molds x1.24),
stress = item +25%, freight $6 ($26 molds), 6% + $0.30 Stripe fee, 10% welcome code, 15% Black Friday where listed.
Exits 1 if any variant with a cost basis loses money under that stress."""
import json,subprocess,re,sys
new=json.load(open('data/products.json'))['products']
old={p['handle']:p for p in json.loads(subprocess.check_output(['git','show','51f10f69^:data/products.json']))['products']}
bf=set(re.findall(r'"([a-z0-9\-]{20,})"',open('lib/flash-sale.ts').read()))
bad=[]
for p in new:
    o=old.get(p['handle'])
    if not o or p['status']!='active': continue
    mold=bool(re.search(r'\b(mold|mould|press)\b',p['title'].lower()))
    for v in p['variants']:
        ov=[x for x in o['variants'] if x['title']==v['title']]
        if not ov: continue
        P=float(v['price']); item=0.31*float(ov[0]['price'])*(1.24 if mold else 1)*1.25; ship=26 if mold else 6
        rev=P*(0.85 if p['handle'] in bf else 1)*0.9; net=rev-(rev*0.06+0.3)-item-ship+(0 if rev>45 else 12.95*0.94)
        if net<0: bad.append((p['handle'],v['title'],P,round(net,2)))
print(len(bad),'losing variants'); [print(b) for b in bad]; sys.exit(1 if bad else 0)
