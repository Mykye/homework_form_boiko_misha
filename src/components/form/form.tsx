import React, {ChangeEvent, useContext, useState} from 'react';
import {InputContext} from "../contentProvider/context";

const Form = () => {
    const {name,setName,email, setEmail,phone,setPhone,imageToBase,setImageToBase} = useContext<any>(InputContext);
    const [emailValidate, setEmailValidate] = useState(false);
    const [phoneValidate, setPhoneValidate] = useState(false);
    const [nameValidate, setNameValidate] = useState(false);
    const [preview, setPreview] = useState<any>(false);
    const [src, setSrc] = useState<string>('');
    const result = {
        fio:name,
        phone: phone,
        email: email,
        photo: imageToBase

}
    const onClick = (e:React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        console.log(result);
    }


    //============================================================
    const nameOnChange = (e:ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
        const validateName = (name:string) => {
            const namePattern = /[a-zA-Z]{3,10}.[a-zA-Z]{3,10}/
            return namePattern.test(String(name).toLowerCase());

        }
        setNameValidate(validateName(name));

    }

    const phoneOnChange = (e:ChangeEvent<HTMLInputElement>) => {
        setPhone(e.target.value);
        const validatePhone = (phone:string) => {
            const phonePattern = /^\+?[1-9][0-9]{7,14}$/;
            return phonePattern.test(String(phone).toLowerCase());
        }
        setPhoneValidate(validatePhone(phone));

    }


    const emailOnChange = (e:ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        const validateEmail = (email:string) => {
            const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return emailPattern.test(String(email).toLowerCase());
        }
        setEmailValidate(validateEmail(email));

    }

    const handleFileRead = async (event:any) => {
        const file = event.target.files[0];
        setSrc(event.target.files[0].src);
        const base64 = await convertBase64(file)
        setImageToBase(base64);
        if (imageToBase){
            setPreview(true);
        }
    }


    const convertBase64 = (file:any) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file)
            fileReader.onload = () => {
                resolve(fileReader.result);
            }
            fileReader.onerror = (error) => {
                reject(error);
            }
        })
    }


    return (
        <form>
            <h1>Form input</h1>
            <input
                className={'myInput'}
                placeholder='Name'
                type='text'
                onChange={nameOnChange}
                required={true}
            />
            <div>
                {nameValidate
                    ? <br></br>
                    : <div style={{color:'red',height:'20px',marginTop:'5px'}}>Invalid name</div>
                }
            </div>
            <input
                className={'myInput'}
                placeholder='Phone'
                type='text'
                onChange={phoneOnChange}
            />
            <div>
                {phoneValidate
                    ? <br></br>
                    :  <div style={{color:'red',height:'20px',marginTop:'5px'}}>Invalid phone</div>
                }
            </div>
            <input
                className={'myInput'}
                placeholder='Email'
                type='text'
                onChange={emailOnChange}
                onAbort={emailOnChange}
            />
            <div>
                {emailValidate
                    ? <br></br>
                    : <div style={{color:'red',height:'20px',marginTop:'5px'}}>Invalid email</div>
                }
            </div>
            {preview
                ? <div className={'myPreview'}>
                    <img src={src}></img><span className={'close'} onClick={() => {setPreview(false)}}>X</span>
                 </div>

                :<input
                    className={'myInput'}
                    type='file'
                    accept='.png, .jpg, .jpeg'
                    onChange={(e:any) => {handleFileRead(e); setSrc(URL.createObjectURL(e.target.files[0]))}}
                    style={{border:"none"}}
                />
            }




            <button className={'myBtn'} onClick={onClick} disabled={!phoneValidate || !nameValidate || !emailValidate}>Submit</button>
        </form>
    );
};

export default Form;