const utilsErrorCodes = {
    0: "",
    "-101": "Bulk utils download call must have an array of UtilsShader objects",
    "-102": "ShaderData array have to contain UtilsShader instance",
    "-103": "",
    "-104": "Contracts bytes should convert in arraybuffer instance",
};


export default class UtilsError extends Error {
    #utilsErrorName = "utils-error";
    #code;

    constructor(code, message) {
        super();
        
        this.#utilsErrorName;
        
        if(!code) throw new Error("You have to specify code!");
        
        this.#code = code;

        utilsErrorCodes[this.#code] && !message ?
            this.message = `Utils Error code ${this.#code} with message: ${utilsErrorCodes[this.#code]}` :
            this.message = `Utils Error ${!this.#code ? "" : "code " + this.#code} message: ${message}`

    }

    getErrorCode() {
        return this.#code;
    }

}