import React, { useState } from "react";

interface TextBoxProps {
  onTextChange: (newText: string) => void;
  onTextChange1: (newText: string) => void;
}

const TextBoxComponent: React.FC<TextBoxProps> = ({ onTextChange,  onTextChange1}) => {
  const [text, setText] = useState("");  

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newText = event.target.value;
    setText(newText);  
    onTextChange(newText);  
  };

  const [text1, setText1] = useState("");  
  const handleChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newText = event.target.value;
    setText1(newText);  
    onTextChange1(newText);  
  };

  return ( 

        <div className="input-content">
        <ul>
          <li>
              <label>First Label</label>
              <input type="text" value={text} onChange={handleChange} /> 
          </li>  
        <li>
              <label>Second Label</label>
              <input type="text" value={text1} onChange={handleChange1} /> 
          </li>  
        </ul> 
        </div>  

  );
};

export default TextBoxComponent;
