
//------------------------------------------------------------------------
//
// __| INTERFACE - ELEMENTS |__
//
//------------------------------------------------------------------------

interface element {
    type: "Switch" | "Button",
    id: Number,
    valueType: valueType, 
    value: value, 
}

const buttonElem = (
    id: Number,
    valueType: valueType, 
    value: value,

): element => ({
    type: "Button",
    id,
    valueType,
    value
});


const switchElem = (
    id: Number,
    valueType: valueType, 
    value: value,

): element => ({
    type: "Switch",
    id,
    valueType,
    value
});

type valueType = "string" | "number" | "color"


type value =  String | Number 

//------------------------------------------------------------------------
//
// __| INTERFACE - OPERATION |__
//
//------------------------------------------------------------------------

export interface Operation {
    elements: element [],
    description: String,
    result: OperationResult
}

const Operation = (
    elements: element [],
    description: String,
    result: OperationResult
): Operation => ({
    elements,
    description,
    result
});

////
//// -- OPERATION RESULT -- 
////
interface OperationResult {
    resultButton: resultButton,
    resultSwitch: resultSwitch,

}

const OperationResult = (
    resultButton: resultButton,
    resultSwitch: resultSwitch
): OperationResult => ({
    resultButton,
    resultSwitch
});

interface resultButton {
    order: "random" | "order",
    ids: Number []
}

const randomResultButton = (
    ids: Number []
):resultButton => ({
    order: "random",
    ids
});

const orderedResultButton = (
    ids: Number []
):resultButton => ({
    order: "order",
    ids
});

interface resultSwitch {
    ids: Number []
}

const resultSwitch = (
    ids: Number []
):resultSwitch => ({
    ids
});

//------------------------------------------------------------------------
//
// __| FX - BUILDING OPERATION |__
//
//------------------------------------------------------------------------

export const operations = [
() => operationBuilder("Activer le switch pair et appuyer deux fois sur les boutons rouge", 
    [ buttonElem(0, "color", "#FF0000"),
      buttonElem(1, "color", "#00FF00"),
      buttonElem(2, "color", "#0000FF"),
      buttonElem(3, "color", "#FF0000"),
      switchElem(4, "number", 4),
      switchElem(5, "number", 3)
    ], 
    OperationResult(randomResultButton([0, 0, 3, 3]), resultSwitch([4]))
    ), 

() => operationBuilder("Appuyer deux fois sur tout les boutons dont le resultat est pair", 
[   buttonElem(0, "string", "13 x 2"),
    buttonElem(1, "string", "2^9"),
    buttonElem(2, "string", "3^127"),
    buttonElem(3, "string", "13 x 1"),
    ], 
    OperationResult(randomResultButton([0, 0, 1, 1]), resultSwitch([]))
    ), 

() => operationBuilder("Appuyer 1 fois sur les bouttons de couleur primaire et deux fois sur les autres", 
[   buttonElem(0, "color", "#ffe436"),
    buttonElem(1, "color", "#008020"),
    buttonElem(2, "color", "#5b3c11"),
    buttonElem(3, "color", "#067790"),
    buttonElem(4, "color", "#f00020"),
    buttonElem(5, "color", "#aa00bb"),
    ], 
    OperationResult(randomResultButton([0, 3, 4, 1, 1, 2, 2, 5, 5]), resultSwitch([]))
    ), 
    
() => operationBuilder("Activer les switch correspondant à des boite de jeux vidéo inconnus !", 
[
    switchElem(0, "string", "Meca Form"),
    switchElem(1, "string", "Epic Games"),
    switchElem(2, "string", "Progestuel"),
    switchElem(3, "string", "Color Dream")
    
    ], 
    OperationResult(randomResultButton([]), resultSwitch([0, 2]))
    ), 

() => operationBuilder("Appuyer sur ces chiffres romain dans l'ordre !", 
[
    buttonElem(0, "string", "XVII"),
    buttonElem(1, "string", "XIV"),
    buttonElem(2, "string", "XV"),
    buttonElem(3, "string", "XIX"),
    
    ], 
    OperationResult(orderedResultButton([1, 2, 0, 3]), resultSwitch([]))
    ), 

() => operationBuilder("Activer les switchs dont les chiffre romain son pair", 
[
    switchElem(0, "string", "IV"),
    switchElem(1, "string", "XIX"),
    switchElem(2, "string", "XV"),
    switchElem(3, "string", "XXII"),
    switchElem(4, "string", "XXX"),
    switchElem(5, "string", "XIII")
    
    ], 
    OperationResult(randomResultButton([]), resultSwitch([0, 3, 4]))
    ), 

() => operationBuilder("Activer le switch correspondant à la couleur rouge écrit en hexadecimal", 
    [ 
        switchElem(0, "string", "#ff0000"),
        switchElem(1, "string", "#00ff00"),
        switchElem(2, "string", "#0000ff")
    ], 
    OperationResult(randomResultButton([]), resultSwitch([0]))
    ), 

() => operationBuilder("Ne cliquez pas sur les boutons dont les resultats sont égaux. Cliquez une fois sur les autres", 
    [ 
        buttonElem(0, "string", "0 x 4 + 1"),
        buttonElem(1, "string", "3 x 4"),
        buttonElem(2, "string", "60 / 5"),
        buttonElem(3, "string", "16 - (2^4)")
    ], 
    OperationResult(randomResultButton([0, 3]), resultSwitch([]))
    ), 

() => operationBuilder("St Exupery est l'auteur du livre \"Le Petit Prince\" activer le switch correspondant à l'une de ses autres création", 
    [ 
        switchElem(0, "string", "La terre du milieu"),
        switchElem(1, "string", "Terre des Hommes"),
        switchElem(2, "string", "Le monde à l'enver"),
        switchElem(3, "string", "Terre de liens")
    ], 
    OperationResult(randomResultButton([]), resultSwitch([1]))
    ), 

() => operationBuilder("Active le switch correpondant à la réponse de la grande question sur la vie, l'univers et le reste", 
    [ 
        switchElem(0, "string", "51"),
        switchElem(1, "string", "12"),
        switchElem(2, "string", "28"),
        switchElem(3, "string", "42"),
        switchElem(4, "string", "0"),
        switchElem(5, "string", "D")
    ], 
    OperationResult(randomResultButton([]), resultSwitch([3]))
    ), 

]

const operationBuilder = (desc:String, elems:element[], result: OperationResult ) => {
    return Operation(elems, desc, result)
} 
