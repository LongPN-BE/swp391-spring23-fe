export const userInputs = [
  {
    id: 1,
    label: "ID",
    type: "text",
    placeholder: "john_doe@gmail.com",
    pattern: "[A-Za-z]{3}",
    
  },  
  
  {
      id: 1,
      label: "Email",
      type: "mail",
      placeholder: "john_doe@gmail.com",
      pattern: "[A-Za-z]{3}",
      
    },
    {
      id: 2,
      label: "Firstname",
      type: "text",
      placeholder: "John Doe",
    },
    {
      id: 3,
      label: "Lastname",
      type: "text",
      placeholder: "",
    },
    {
      id: 4,
      label: "Phone",
      type: "text",
      placeholder: "0838-228-607",
      pattern: "[0-9]{4}-[0-9]{3}-[0-9]{3}",
      title:"Phone just number",
      
    },
    
  ];
  
  export const clubInput = [
    {
      id: "name",
      label: "Name",
      type: "text",
      placeholder: "Name of club",
    },
    {
      id: "location",
      label: "Location",
      type: "text",
      placeholder: "Localtion of club",
    }
  ];
  

  export const standInput = [
    {
      id: "name",
      label: "Name",
      type: "text",
      placeholder: "Stand name here",
    },
    {
      id: "quantitySeat",
      label: "Quantity Seat",
      type: "number",
      placeholder: "Number",
    },
  ];