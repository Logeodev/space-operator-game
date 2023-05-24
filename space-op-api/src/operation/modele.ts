
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

interface Operation {
    elements: element [],
    descritpion: String,
    result: OperationResult
}

const Operation = (
    elements: element [],
    descritpion: String,
    result: OperationResult
): Operation => ({
    elements,
    descritpion,
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
    OperationResult(randomResultButton([0, 0, 3, 3]), resultSwitch([0]))
    ), 

() => operationBuilder("Appuyer sur tout les boutons rouge", 
[   buttonElem(0, "string", "RPZ"),
    buttonElem(1, "string", "RPZ"),
    buttonElem(2, "string", "RPZ"),
    buttonElem(3, "string", "RPZ"),
    ], 
    OperationResult(randomResultButton([0,1,2]), resultSwitch([0,1]))
    ), 

() => operationBuilder("Appuyer sur tout les boutons rouge", 
[   buttonElem(0, "string", "RPZ"),
    buttonElem(1, "string", "RPZ"),
    buttonElem(2, "string", "RPZ"),
    buttonElem(3, "string", "RPZ"),
    ], 
    OperationResult(randomResultButton([0,1,2]), resultSwitch([0,1]))
    ), 
    
() => operationBuilder("Appuyer sur tout les boutons rouge", 
[   buttonElem(0, "string", "RPZ"),
    buttonElem(1, "string", "RPZ"),
    buttonElem(2, "string", "RPZ"),
    buttonElem(3, "string", "RPZ"),
    ], 
    OperationResult(randomResultButton([0,1,2]), resultSwitch([0,1]))
    ), 

]

const operationBuilder = (desc:String, elems:element[], result: OperationResult ) => {
    return Operation(elems, desc, result)
} 
