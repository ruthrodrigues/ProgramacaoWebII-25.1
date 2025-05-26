import * as React from "react";

export default (props) => {
    const { min, max } = props;

    const gerarNumero = () => parseInt(Math.random() * (max + 1 - min)) + min;

    let num1 = gerarNumero();
    let num2 = gerarNumero();

    while (num2 === num1) {
        num2 = gerarNumero();
    }

    return (
        <div>
            <h1>Números Aleatrios</h1>
            <p>Primeiro valor gerado = {num1}</p>
            <p>Segundo valor gerado = {num2}</p>
        </div>
    );
};