# Spica-naloga

## Navodila za namestitev

#### Angular CLI
Če imate Angular CLI že nameščen, lahko ta korak preskočite. Po tem, ko ste posodobili Node.js, lahko globalno namestite Angular CLI 15.2.4 z ukazom v terminalu. Če uporabljate starejšo verzijo Node.js, jo boste morali na tej točki verjetno posodobiti.

`npm install -g @angular/cli@15.2.4`

Ali imate nameščen Angular CLI lahko preverite z ukazom:

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




