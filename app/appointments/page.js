"use client";
import React from "react";
import { useState} from "react";
import CopyButton from "../components/CopyButton";
function page() {
  const [firstStepComment, setFirstStepComment] = useState("");
  const [firstStepData, setFirstStepData] = useState({
    name: '',
    value: '',
   
  });

  const handleInputChange = event => {
    const { name, value } = event.target;
    setFirstStepData(prevFirstStepData => ({
      ...prevFirstStepData,
      [name]: value
    }));
  };

  function generateComment(data){
    setFirstStepComment(`Tipo: CNAME\nNome:${data.name}\nValor:${data.value}\n\nOBS: O valor deve ser adicionado com o "." ponto final.`);
  }


  return (
    <>
      <input type="text" name="name" placeholder="Enter name" value={firstStepData.name} onChange={handleInputChange}
        />
      <input type="text" name ="value" placeholder="Enter value" value={firstStepData.value} onChange={handleInputChange}/>
      <button onClick={() => generateComment(firstStepData)}>Generate comment</button>
      <textarea name="output" id="output" cols="30" rows="10" value={firstStepComment}></textarea>
      <CopyButton text={firstStepComment}></CopyButton>
    </>
  );
}

export default page;
