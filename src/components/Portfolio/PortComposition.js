import React, { useEffect, useState, useRef } from "react";
import "./PortComposition.css";
import Navbar from "../Navbar/Navbar";
import HeaderService from "../../services/HeaderService";
import { useLocation } from "react-router-dom";

const PortComposition = () => {
  const location = useLocation();
  const transferObject = location.state;
  console.log(transferObject);

  let nameInput = useRef();
  let assetInput = useRef();

  const [masterData, setMasterData] = useState([]);
  const [assetData,setAssetData] = useState([]);
  const [nameOfCompany, setNameOfCompany] = useState();
  const [assetClass, setAssetClass] = useState();
  const [reqData, setReqData] = useState("");
  const [quantity, setQuantity] = useState();
  const [value, setValue] = useState();
  const [allocation, setAllocation] = useState();
  const [message, setMessage] = useState("");
  const [availableBalance, setAvailableBalance] = useState();
  const [exceedError,setExceedError]=useState(false);
  const [zeroError,setZeroError] = useState(false);
  const [emptyError, setEmptyError] = useState(false);
 
  const [compositionData, setCompositionData] = useState({
    data: [],
    loading: true,
  });

  const [savedData, setSavedData] = useState();
  const [remainingBalance, setRemainingBalance] = useState();

  //to display the usm
  useEffect(() => {
    HeaderService.fetchData()
      .then((response) => {
        setMasterData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(()=>{
    HeaderService.fetchAssetByTheme(transferObject.themeName)
    .then((response) => {
      setAssetData(response.data);
      console.log(assetData);
    })
    .catch((error) => {
      console.log(error);
    });
}, []);

  

  //to display securities added
  useEffect(() => {
    // console.log(transferObject.portfolioName);
    HeaderService.fetchAllSecuritiesByPortfolioName(
      transferObject.portfolioName
    )
      .then((response) => {
        let localComposotionData=response.data;
        setCompositionData({
          data: response.data,
          loading: false,
        });
        let temp=0;
      localComposotionData.portfoliocomposition.map((item) => {
      temp=temp+item.value;
    });
     setAvailableBalance(Math.round(((transferObject.initialInvestment-temp)*100)/100))
      })
      .catch((error) => {
        console.log(error);
      });
      

  }, [savedData]);
  console.log(compositionData);

  const handleAsset = (e) => {
    console.log(assetInput.current.value);
    setAssetClass(e.target.value);
    HeaderService.fetchByAsset(assetInput.current.value)
      .then((response) => {
        setMasterData(response.data);
        console.log(masterData);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
 
  const handleSearch = (e) => {
    console.log(nameInput.current.value);
    setNameOfCompany(e.target.value);
    
    

    HeaderService.fetchByNameOfCompany(nameInput.current.value)
      .then((response) => {
        
        setReqData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const calculateValue = (e) => {
    setQuantity(e.target.value);
    setValue(Math.round(e.target.value * reqData.lastPrice*100)/100);
    if((Math.round(e.target.value * reqData.lastPrice*100)/100)>=availableBalance){
      setExceedError(true)
    }
    if((Math.round(e.target.value * reqData.lastPrice*100)/100)===0){
      setZeroError(true)
    }
    setAllocation(Math.round(((((e.target.value * reqData.lastPrice)/transferObject.initialInvestment)*100)*100)/100));
    
    
  };

  const savePortfolioComposition = (e) => {
    
    if(exceedError==true){
      window.alert("you have exceed your invested amount, please decrease the quantity");
      setQuantity("")
      setExceedError(false)
      return <PortComposition></PortComposition>
    }
    if(zeroError==true){
      window.alert("please enter right quantity");
      setQuantity("")
      setZeroError(false)
      return <PortComposition></PortComposition>
    }
    // if(emptyError==true)
    // {
    //   window.alert("please select company");
    //   setNameOfCompany("")
    //   setEmptyError(false)
    //   return <PortComposition></PortComposition>
    // }
    let compositionObject = {
      securityName: reqData.nameOfCompany,
      equityCategory: reqData.equity,
      assetClass: reqData.assetClass,
      subAssetClass: reqData.subAssetClass,
      exchange: reqData.exchange,
      transactionType: "buy",
      price: reqData.lastPrice,
      quantity: quantity,
      value: value,
      allocation: allocation,
      portfoliodetail: {
        portfolioName: transferObject.portfolioName,
      },
    };
   
    HeaderService.createComposition(compositionObject)
      .then((response) => {
        console.log(response.data);
        // setMessage("security added succesfully");
        setSavedData(response.data);
        setNameOfCompany("");
        setReqData("");
        setValue("");
        setQuantity("");
      })
      .catch((error) => {
        console.log(error);
      });
      window.alert("Security added succesfully");
  };

  //console.log(masterData);

  return (
    <div>
      {/* <div>
        <Navbar /> 
      </div> */}
      <div className="c1">
        
        <div className="box"></div>
        
        <div className="container">
        <h4>Asset & Holdings Details</h4>
          <table className="table table-bordered container">
            <thead>
              <tr style={{ backgroundColor: "black", color: "white" }}>
                <th>Portfolio Name</th>
                <th>Theme Name</th>
                <th>Investment Amount</th>
                <th>Available Balance</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ textAlign: "center" }}>{transferObject.portfolioName}</td>
                <td style={{ textAlign: "center" }}> {transferObject.themeName}</td>
                <td style={{ textAlign: "right" }}>{transferObject.initialInvestment}</td>
                <td style={{ textAlign: "right" }}>{availableBalance}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="container">
          <div className="t-gap">
          <h4>Portfolio Composition</h4>
            <table className="table table-bordered table-striped container">
              <thead>
                <tr style={{ backgroundColor: "black", color: "white" }}>
                  <th>Security Name</th>
                  <th>Asset Class</th>
                  <th>Sub Asset Class</th>
                  <th>Equity Category</th>
                  <th>Transaction Type</th>
                  <th>Transaction Date</th>
                  <th>Security Price</th>
                  <th>Quantity</th>
                  <th>Value</th>
                  
                  <th>Allocation (%)</th>
                </tr>
              </thead>
              <tbody>
                {compositionData.loading
                  ? ""
                  : (
                    compositionData.data.portfoliocomposition.map(
                      (item, index) => {
                        return (
                          <tr key={item.portfolioCompostionId}>
                            <td>{item.securityName}</td>
                            <td>{item.assetClass}</td>
                            <td>{item.subAssetClass}</td>
                            <td>{item.equityCategory}</td>
                            <td style={{ textAlign: "center" }}>Buy</td>
                            <td style={{ textAlign: "right" }}>{item.transactionDate}</td>
                            <td style={{ textAlign: "right" }}>{item.price}</td>
                            <td style={{ textAlign: "center" }}>{item.quantity}</td>
                            <td style={{ textAlign: "right" }}>{item.value}</td>
                            <td style={{ textAlign: "right" }}>{item.allocation}</td>
                          </tr>
                        );
                      }
                    ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="container">
        <h4>Add Securities from here...</h4>
          <table>          
          <tr style={{ backgroundColor: "black", color: "white" }}>
            <th>Asset class</th>
            <th>Security Name</th>
            <th>SubAsset class</th>
            <th>Equity Category</th>
            <th>Security Price</th>
            <th>Quantity</th>
            <th>Value</th>
            
          </tr>
          <tr>
          <td>
            <div className="drop">
              <select
              value={assetClass}
              placeholder="search by asset"
              ref={assetInput}
              onChange={handleAsset}
              required>
              <option value="">Select an Asset</option>
              {/* <option value="Equity">Equity</option>
              <option value="Mutual Funds">Mutual Funds</option>
              <option value="Commodity">Commodity</option> */}
              {assetData.map((item) => {
                     return (
                      <option value={item.assetName}>
                        {item.assetName}
                      </option>
                    );
                    })}
              </select>
              </div>
              {/* <div className="drop">
                    <select
                      name="Themes"
                      
                      onChange={(e) => {
                        setThemes(e.target.value);
                      }}
                      value={props.selected}
                      
                    ><option value="">Select the theme</option>
                    {themeData.map((item) => {
                     return (
                      <option value={item.themeName}>
                        {item.themeName}
                      </option>
                    );
                    })}</select>
                  </div> */}
            </td>
            <td>
              <input
                value={nameOfCompany}
                list="stocks"
                placeholder="search for the company"
                ref={nameInput}
                onChange={handleSearch}
                
              ></input>
              <datalist id="stocks" >
                <option value="">Select the Company</option>
                {masterData.map((item) => {
                  return (
                    <option value={item.nameOfCompany}>
                      {item.nameOfCompany}
                    </option>
                  );
                })}
              </datalist>
              </td>
             {/* <td>{reqData.assetClass}</td>  */}
           
            <td >{reqData.subAssetClass}</td>
            <td>{reqData.equity}</td>
            <td>{reqData.lastPrice}</td>
            <td>
              {reqData.length >= 0 ? (
                ""
              ) : (
                <input
                  type="number"
                  value={quantity}
                  onChange={calculateValue}
                ></input>
              )}
            </td>
            <td>{value}</td>
            
          </tr>
        </table>
        
        
        <div className="c2">
        <button className="l1" type="submit" onClick={savePortfolioComposition}>Add Security</button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default PortComposition;
