import React from 'react';
import './App.css';
import FormProvider from "./components/contentProvider/FormProvider";
import Form from "./components/form/form";

function App() {

  return (
    <div className="App">
            <FormProvider>
                <Form />
            </FormProvider>
    </div>
  );
}

export default App;
