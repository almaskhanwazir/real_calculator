const staticData = {
  allCalculators : [
    {
        id:"1",
        categoryName:"Finance",
        name: "Compound Interest Calculator",
        inputs: [
          { name: "principle", type: "number", label: "Principle", value: "" },
          { name: "rate", type: "number", label: "Rate of interest", value: "" },
          { name: "time", type: "number", label: "Time period", value: "" },
          {
            name: "compoundInterval",
            type: "number",
            label: "Compounding interval (in months)",
            value: "",
          },
        ],
        formula:
          "principle * Math.pow(1 + (rate / (compoundInterval * 100)), (compoundInterval * time)) - principle",
        resultName: "Compound Interest",
        isGraph: true
      },
  ]
};

export default staticData;
