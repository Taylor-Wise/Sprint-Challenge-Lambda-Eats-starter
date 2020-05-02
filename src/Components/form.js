import React, {useState, useEffect} from "react";
import axios from "axios";
import * as yup from "yup";

  //form Schema
    const formSchema = yup.object().shape({
        name: yup.string().min(2).required("Name is a required field"),
        crustSize: yup.string().required("Must choose a size"),
        sauce: yup.string().required("Must choose a sauce"),
        pepperoni: yup.boolean().defined(),
        ham: yup.boolean().defined(),
        sausage: yup.boolean().defined(),
        chicken: yup.boolean().defined(),
        onions: yup.boolean().defined(),
        pineapple: yup.boolean().defined(),
        specInstr: yup.string().notRequired()
     });


const Form = () => {

// Initial state
    const initialState = {
        name: "",
        crustSize: "",
        sauce: "",
        pepperoni: false,
        ham: false,
        sausage: false,
        chicken: false,
        onions: false,
        pineapple: false,
        specInstr: ""
    };

  // State
  const [formState, setFormState] = useState(initialState);

  const [errors, setErrors] = useState(initialState);

  const [buttonDisabled, setButtonDisabled] = useState(true);

  const [post, setPost] = useState([]);


  const validate = e => {
      yup
      .reach(formSchema, e.target.name)
      .validate(e.target.name === "terms" ? e.target.checked: e.target.value)
      .then(valid => {
          setErrors({
              ...errors, [e.target.name]: ""
          });
      })
      .catch(err => {
          setErrors({
              ...errors, [e.target.name]: err.errors[0]
          });
      });
  };

  useEffect(() => {
      formSchema.isValid(formState).then(valid => {
          setButtonDisabled(!valid);
      });
  }, [formState]);


  const handleChange = e => {
      e.persist();
      const formData = {
          ...formState, [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value
      };
      validate(e);
      setFormState(formData);
  }

  const formSubmit = e => {
    e.preventDefault();
    axios
    .post("https://reqres.in/api/users", formState)
    .then(response => {
        setPost(response.data)
        console.log("Success", post);
        setFormState(initialState);
    })
    .catch(err => {
        console.log(err.response)
    })
  };



    return(
        <div className="container">
            <h2>Build Your own Pizza</h2>

            <form onSubmit={formSubmit}>
                <h3>Build Your Own Pizza</h3>
                
                <label className="sectionLabels" htmlFor="crustSize" >Pick your size <br/>Required </label> <br/>
                <select data-cy="size" id="crustSize"
                name="crustSize" onChange={handleChange}>
                
                <option value="">Select a crust size</option>

                <option value="12 inch">12 inch</option>

                <option value="16 inch">16 inch</option>

                <option value="8 inch kids">8 inch kids</option>
                </select>
               <br/>

                <div className="sauceChoice">
                <label
                className="sectionLabels">Choose your sauce <br/>
                Required</label> <br/>
                        <input
                        type="radio"
                        id="redSauce"
                        name="sauce"
                        value="red sauce"
                        onChange={handleChange}/>
                        <label htmlFor="redSauce">Red sauce</label><br/>

                        <input
                        type="radio"
                        id="garlicSauce"
                        name="sauce"
                        value="garlic sauce"
                        onChange={handleChange}/>
                        <label htmlFor="garlicSauce">Garlic Sauce</label><br/>

                        <input
                        type="radio"
                        id="bbqSauce"
                        name="sauce"
                        value="BBQ sauce"
                        onChange={handleChange}/>
                        <label htmlFor="bbqSauce">BBQ Sauce</label>
                
                </div>

                <div className="toppingChoice">
                    <label className="sectionLabels">Add Your Toppings</label>
                    <br/>
                    
                    <label htmlFor="pepperoni">
                    <input
                    id="pepperoni"
                    name="pepperoni"
                    type="checkbox"
                    checked={formState.pepperoni}
                    onChange={handleChange}/>
                    Pepperoni</label><br/>

                    <label htmlFor="sausage">
                    <input
                    id="sausage"
                    name="sausage"
                    type="checkbox"
                    checked={formState.sausage}
                    onChange={handleChange}/>
                    Sausage</label><br/>

                    <label htmlFor="ham">
                    <input
                    id="ham"
                    name="ham"
                    type="checkbox"
                    checked={formState.ham}
                    onChange={handleChange}/>
                    Canadian Bacon</label> <br/>

                    <label htmlFor="chicken">
                    <input
                    id="chicken"
                    name="chicken"
                    type="checkbox"
                    checked={formState.chicken}
                    onChange={handleChange}/>
                   Smoked Chicken </label><br/>

                    <label htmlFor="onions">
                    <input
                    id="onions"
                    name="onions"
                    type="checkbox"
                    checked={formState.onions}
                    onChange={handleChange}/>
                   Onions </label><br/>
                    
                   <label htmlFor="pineapple">
                    <input
                    id="pineapple"
                    name="pineapple"
                    type="checkbox"
                    checked={formState.pineapple}
                    onChange={handleChange}/>
                   Pineapple </label>
                </div>

                <div className="specialInstruct">
                    <label className="sectionLabels">Special Instructions</label><br/>
                    
                    <textarea
                    data-cy="specInstr"
                    name="specInstr"
                    placeholder="Anything else we should know?"
                    onChange={handleChange}
                    value={formState.specInstr}/>
                    </div>
                    
                    <label className="sectionLabels" htmlFor="name">Name<br/> </label>
                        <input
                        data-cy="name"
                        id="name"
                        type="text"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}/>   
                   <br/>

                <button data-cy="submitBtn" className="submitBtn"
                disabled={buttonDisabled} type="submit">Submit your order!</button>

            <pre>{JSON.stringify(post, null, 2)}</pre>

            </form>
        </div>
    )
}

export default Form;