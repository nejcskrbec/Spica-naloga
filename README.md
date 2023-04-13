# Spica-naloga

## Navodila za namestitev

Za uporabo aplikacije morate imeti naloženo verzijo Angular CLI 15.2.4, ki pa zahteva Node.js verzijo najmanj 14.20.1, zato pred uporabo najprej posodobite Node.js, če uporabljate starejšo verzijo.

#### Angular CLI
Po tem, ko ste posodobili Node.js, lahko globalno namestite Angular CLI. Če imate Angular CLI že nameščen, lahko ta korak preskočite. To storite z ukazom v terminalu:

`npm install -g @angular/cli@15.2.4`

Uspešno namestitev Angular CLI lahko preverite z ukazom:

`ng version`

#### Kloniranje git repozitorija in zagon aplikacije
Ko ste uspešno namestili Angular CLI, se premaknite v direktorij, kjer želite imeti shranjeno aplikacijo, ter klonirajte njen repozitorij z ukazom:
`git clone https://github.com/nejcskrbec/Spica-naloga.git`

Nato pa se premaknite v mapo z aplikacijo z ukazoma:
`cd Spica-naloga` in `cd spicaNaloga`

Ko ste v direktoriju **spicaNaloga**, zaženite naslednja ukaza:
`npm install --force` in `npm install @angular/localize --save --force`

#### Zagon aplikacije
Aplikacijo lahko zaženete z ukazom:
`ng serve --open`




