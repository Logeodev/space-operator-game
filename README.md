# Principe de jeu

Le jeu se déroule en plusieurs tours. Chaque tour implique la formation d'un couple composé d'un opérateur et d'un instructeur. Les joueurs sont assignés à des rôles spécifiques dans chaque tour.

Au début de chaque tour, les joueurs sont répartis aléatoirement en couples opérateur-instructeur. Chaque couple reçoit une opération spécifique à accomplir. L'opération est une série d'éléments d'interface tels que des boutons et des interrupteurs, accompagnés d'une description.

L'opérateur doit manipuler les éléments de l'interface en suivant les instructions données par l'instructeur. Les instructions peuvent inclure des actions telles que l'appui sur des boutons ou la modification de l'état des interrupteurs.

Le succès de l'opération dépend de la précision avec laquelle l'opérateur exécute les instructions. Une fois que l'opération est terminée, le couple opérateur-instructeur à soit endommagé soit réparer un peu le vaisseau.

Le jeu se poursuit avec de nouveaux tours, où de nouveaux couples opérateur-instructeur sont formés et de nouvelles opérations sont assignées. Les joueurs peuvent changer de rôle à chaque tour, leur permettant d'expérimenter à la fois en tant qu'opérateur et instructeur.

Le jeu se termine après un certain nombre de tours prédéfini ou si le vaisseau est détruit.

# Endpoints
## Créer une partie

Un joueur peut créer une partie _via_ l'endpoint `/api/game/create`.
Cela génére en _backend_ un identifiant de partie, que le joueur doit communiquer aux autres participants.

On reçoit :
```json
{
    "message": "565630"
}
``` 

## Prêt au début de partie

Un joueur indique (depuis l'écran d'attente de début de partie, une fois rejointe) qu'il est prêt à jouer _via_ l'endpoint `/api/game/ready/:idJoueur`.

Il reçoit un message de socket :
```json
{
    "type": "players",
    "data": {
        "players": [status des joueurs de la partie (prêt ou non)]
    }
}
```

## Couper l'instance de partie

Il est possible de "tuer" une partie avec `/api/game/kill/:idPartie`.
Notamment lorsqu'un hôte quitte sa partie créée ou en fin de partie.

# Communication des sockets

Un joueur est connecté à la socket dès l'écran principal.

## Messages des sockets

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

### Connexion à une partie existante

Un joueur se connecte à une partie existante à l'aide d'un identifiant de partie que l'hôte lui communique.

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

### Démarrer une partie

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

### Finir une opération

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

- ecran de partie en attente (une fois rejointe)
- ecran de jeu : composants clicables et utilisation des endpoints / sockets
> integrer les ws : https://reactnative.dev/docs/network#websocket-support
- ecran win / defaite puis retour au menu