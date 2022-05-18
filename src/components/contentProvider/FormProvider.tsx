import React, {FC, ReactElement, useCallback, useState} from 'react';
import {InputContext} from "./context";

 const FormProvider = ({children}: {children: ReactElement}) => {
    const [name, setName] = useState<string>('');
     const [phone, setPhone] = useState<string>('');
     const [email, setEmail] = useState<string>('');
     const [imageToBase, setImageToBase] = useState<string>('');

     const contextValue = {
         name,
         setName,
         phone,
         setPhone,
         email,
         setEmail,
         imageToBase,
         setImageToBase
     };
    return (
        <InputContext.Provider value={contextValue}>
            {children}
        </InputContext.Provider>
    );
};

 export default FormProvider;

