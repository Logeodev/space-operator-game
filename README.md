# Communication des sockets

L'ensemble des communications se font _via_ des objets :
```json
{
    "type": "",
    "data": {
        ...
    }
}
```
Le `type` indique de quel message il s'agit, qu'elle es l'action réalisée et donc comment traiter les `data`.

## Connexion à une partie existante

```json
{
    "type": "connect",
    "data": {
        "gameId": "565630",
        "playerId": "1",
        "playerName": "M1chelle"
        }   
}
```

## Démarrer une partie

Un joueur envoie le message suivant pour déclarer que la partie indiquée peut commencer.
Les joueurs connectés à cette partie et prêt veront alors la partie commencer.

```json
{
    "type": "start",
    "data": {
        "gameId": "565630"
        }
}
```

## Finir une opération

Un joueur opération ayant reçu une opération (un _set_ d'instructions) à réaliser que son instructeur lui communiquera, communiquera son échec (le _timer_ est dépassé ou l'opération n'a pas été bien réalisée) ou succès (il a correctement réaliser l'opération dans le temps impartit).

```json
{
    "type": "finish",
    "data": {
        "operator": "code",
        "success": true
        }
}
```

# TODO

- modifier les endpoints join et create 
- deplacer la generation game id dans le back
- ecran de partie en attente (une fois rejointe)
- ecran de jeu : composants clicables et utilisation des endpoints / sockets
> integerer les ws : https://reactnative.dev/docs/network#websocket-support
- ecran win / defaite puis retour au menu