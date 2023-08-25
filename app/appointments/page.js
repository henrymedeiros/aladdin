"use client";
import React from "react";
import { useState} from "react";
import CopyButton from "../components/CopyButton";
import InputTextField from "../components/InputTextField";


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
    <div className="col-span-10">
      <InputTextField label={'Enter Name'} placeholder={'Domain generated name'} value={firstStepData.name} onChange={handleInputChange}></InputTextField>
      <input type="text" name="name" placeholder="Enter name" value={firstStepData.name} onChange={handleInputChange}
        />
      <input type="text" name ="value" placeholder="Enter value" value={firstStepData.value} onChange={handleInputChange}/>
      <button onClick={() => generateComment(firstStepData)}>Generate comment</button>
      {firstStepComment !== '' && <textarea value={firstStepComment} readOnly></textarea>}
      <CopyButton text={firstStepComment}></CopyButton>
    </div>
  );
}

export default page;
